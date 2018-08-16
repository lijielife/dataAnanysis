<template>
    <section class="data-container">
        <div class="panel-body" v-show="tplus1">
            <div class="alert alert-info">
                <svg class="iconlight" aria-hidden="true" style="display: block;">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cuowulight">
                        <svg id="icon-cuowulight" viewBox="0 0 16 16" width="100%" height="100%">
                            <path
                                d="M15.000,9.000 L13.899,9.000 C13.954,8.673 14.000,8.342 14.000,8.000 C14.000,7.657 13.954,7.327 13.899,7.000 L15.000,7.000 C15.552,7.000 16.000,7.448 16.000,8.000 C16.000,8.552 15.552,9.000 15.000,9.000 ZM12.882,4.532 C12.492,3.985 12.015,3.507 11.468,3.118 L12.243,2.343 C12.633,1.952 13.266,1.952 13.657,2.343 C14.047,2.734 14.047,3.367 13.657,3.757 L12.882,4.532 ZM8.000,12.000 C5.791,12.000 4.000,10.209 4.000,8.000 C4.000,5.791 5.791,4.000 8.000,4.000 C10.209,4.000 12.000,5.791 12.000,8.000 C12.000,10.209 10.209,12.000 8.000,12.000 ZM7.000,2.101 L7.000,1.000 C7.000,0.448 7.448,-0.000 8.000,-0.000 C8.552,-0.000 9.000,0.448 9.000,1.000 L9.000,2.101 C8.673,2.046 8.343,2.000 8.000,2.000 C7.657,2.000 7.327,2.046 7.000,2.101 ZM3.118,4.532 L2.343,3.757 C1.952,3.367 1.952,2.734 2.343,2.343 C2.734,1.952 3.367,1.952 3.757,2.343 L4.532,3.118 C3.985,3.508 3.508,3.985 3.118,4.532 ZM2.000,8.000 C2.000,8.342 2.046,8.673 2.101,9.000 L1.000,9.000 C0.448,9.000 -0.000,8.552 -0.000,8.000 C-0.000,7.448 0.448,7.000 1.000,7.000 L2.101,7.000 C2.046,7.327 2.000,7.657 2.000,8.000 ZM6.500,13.000 L9.500,13.000 C9.776,13.000 10.000,13.224 10.000,13.500 C10.000,13.776 9.776,14.000 9.500,14.000 L6.500,14.000 C6.224,14.000 6.000,13.776 6.000,13.500 C6.000,13.224 6.224,13.000 6.500,13.000 ZM7.500,15.000 L8.500,15.000 C8.776,15.000 9.000,15.224 9.000,15.500 C9.000,15.776 8.776,16.000 8.500,16.000 L7.500,16.000 C7.224,16.000 7.000,15.776 7.000,15.500 C7.000,15.224 7.224,15.000 7.500,15.000 Z"
                                class="cls-1"></path>
                        </svg>
                    </use>
                </svg>
                <p>资源位投放数据有T+1延迟，一般在当天的10点落库前一天的数据。</p>
            </div>
        </div>
        <div class="dashboard-toolbar">
            <div class="pull-left">

                <nb-datepicker
                    v-model="timeranger"
                    range="range"
                    size="large"
                    clearable="clearable"></nb-datepicker>
                <div class="iconBtn">
                    <nb-icon type="sync" @click="refresh"></nb-icon>
                </div>
            </div>
            <!-- <span contenteditable="false" class="dashboard-name"
            data-originname="运营数据概览">运营数据概览</span> <div class="pull-right"> <div
            class="iconBtn"> <nb-icon type="sync" @click="refresh"></nb-icon> </div> </div>
            -->
        </div>
        <div v-if="mianTitleAndId.length">
            <data-analysis
                :mianTitleAndId="v"
                v-for=" (v,k) in mianTitleAndId"
                :key="k"
                :timeranger="copytimeranger"></data-analysis>

        </div>

        <div
            v-else="v-else"
            style="font-size:20px;height:500px;width:100%;justify-content:center;display:flex;align-items:center;">
            暂无数据
        </div>

    </section>
</template>
<script>

    import dataAnalysis from '../../packages/template-line-chart/index.vue';

    import eventHub, {resizeCanvs, refresh, stretchLayout} from '../../lib/eventhub';
    import {debounce} from '../../utils/helpers';

    require('echarts/lib/chart/line');

    export default {

        components: {
            'data-analysis': dataAnalysis
        },
        data() {
            return {
                tplus1:false,
                mianTitleAndIdBaseData: {
                    prizeuse: {
                        name: 'prizeuse',
                        title: '奖品使用分析',
                        subtitle: '奖品使用数据:',
                        MountedId: 'data-access-chart-prize-use',
                        path: `${window.$$commonPath}/api/v1/manager/effect/common/curve?activityId=${window.$$_ActivityId}&itemKeys=duv_prizeuse,uv_prizeuse,pv_prizeuse`,
                        piePath: `${window.$$commonPath}/api/v1/manager/effect/common/pie?activityId=${window.$$_ActivityId}&quota=pv_prizeuse&itemKey=pv_prizeuse`,
                        haspie: true,
                        pieid: 'prizeusepieid',
                        hastable: false,
                        isTPlusone: false,
                        select: {
                            tip: '用户群',
                            defaultSelectLabel: '全部',
                            defaulSelectKey: '_$$null'
                        },
                        downloadType: 0, // 0表示不下载

                    },
                    drawprize: {
                        name: 'drawprize',
                        title: '奖品发放分析',
                        subtitle: '发放奖品数据:',
                        MountedId: 'data-access-chart-prize-draw',
                        path: `${window.$$commonPath}/api/v1/manager/effect/common/curve?activityId=${window.$$_ActivityId}&itemKeys=duv_drawprize,uv_drawprize,pv_drawprize`,
                        piePath: `${window.$$commonPath}/api/v1/manager/effect/common/pie?activityId=${window.$$_ActivityId}&quota=pv_drawprize&itemKey=pv_drawprize`,
                        haspie: true,
                        pieid: 'drawprizepieid',
                        hastable: false,
                        isTPlusone: false,
                        select: {
                            tip: '用户群',
                            defaultSelectLabel: '全部',
                            defaulSelectKey: '_$$null'
                        },
                        downloadType: 0, // 0表示不下载

                    },

                    resource: {
                        name: 'resource',
                        title: '曝光及投放渠道分析',
                        subtitle: '曝光量:',
                        MountedId: 'data-access-chart-channel-anays',
                        path: `${window.$$commonPath}/api/v1/manager/effect/common/curve?activityId=${window.$$_ActivityId}&itemKeys=duv_resource`,
                        piePath: `${window.$$commonPath}/api/v1/manager/effect/common/pie?activityId=${window.$$_ActivityId}&quota=channel&itemKey=duv_channel`,
                        haspie: true,
                        pieid: 'resourcepieid',
                        hastable: true,
                        isTPlusone: true,
                        select: {
                            tip: '用户群',
                            defaultSelectLabel: '全部',
                            defaulSelectKey: '_$$null'
                        },
                        downloadType: 0, // 0表示不下载
                    },
                    visitor: {
                        name: 'visitor',
                        title: '流量分析',
                        subtitle: '流量访问数据:',
                        MountedId: 'data-access-chart-liuliang',
                        path: `${window.$$commonPath}/api/v1/manager/effect/common/curve?activityId=${window.$$_ActivityId}&itemKeys=uv_visitor,pv_visitor,duv_visitor`,
                        piePath: `${window.$$commonPath}/api/v1/manager/effect/common/pie?activityId=${window.$$_ActivityId}&quota=channel&itemKey=duv_channel`,
                        haspie: false,
                        pieid: 'visitorpieid',
                        isTPlusone: false,
                        hastable: false,
                        select: {
                            tip: '用户群',
                            defaultSelectLabel: '全部',
                            defaulSelectKey: '_$$null'
                        },
                        downloadType: 0
                    },
                    join: {
                        name: 'join',
                        title: '行为分析',
                        subtitle: '活动参与数据:',
                        MountedId: 'data-access-chart-behave-1-1',
                        path: `${window.$$commonPath}/api/v1/manager/effect/common/curve?activityId=${window.$$_ActivityId}&itemKeys=uv_join,pv_join,uv_finishtask,pv_finishtask,duv_join,duv_finishtask`,
                        piePath: [
                            {
                                pieid: 'data-access-chart-behave-2-1',
                                piePath: `${window.$$commonPath}/api/v1/manager/effect/common/pie?activityId=${window.$$_ActivityId}&itemKey=pv_finishtask&quota=pv_finishtask`
                            }, {
                                pieid: 'data-access-chart-behave-2-2',
                                piePath: `${window.$$commonPath}/api/v1/manager/effect/common/pie?activityId=${window.$$_ActivityId}&itemKey=pv_join&quota=pv_join`
                            }
                        ],
                        haspie: false,
                        hastable: true,
                        pieid: 'joinpieid',
                        select: {
                            tip: '用户群',
                            defaultSelectLabel: '全部',
                            defaulSelectKey: '_$$null'
                        },
                        downloadType: 0
                    },
                    drawcost: {
                        name: 'drawcost',
                        title: '活动发放成本',
                        subtitle: '活动发放成本数据:',
                        MountedId: 'activity-cost-chart-behave-1-1',
                        path: `${window.$$commonPath}/api/v1/manager/effect/common/curve?activityId=${window.$$_ActivityId}&itemKeys=pv_drawcost`,
                        piePath: `${window.$$commonPath}/api/v1/manager/effect/common/pie?activityId=${window.$$_ActivityId}&quota=pv_drawcost&itemKey=pv_drawcost`,
                        haspie: true,
                        pieid: 'pv_drawcostpieid',
                        hastable: false,
                        select: {
                            tip: '用户群',
                            defaultSelectLabel: '全部',
                            defaulSelectKey: '_$$null'
                        },
                        downloadType: 0
                    },
                    usecost: {
                        name: 'usecost',
                        title: '实际使用成本',
                        subtitle: '实际使用成本数据:',
                        MountedId: 'actual-cost-chart-behave-1-1',
                        path: `${window.$$commonPath}/api/v1/manager/effect/common/curve?activityId=${window.$$_ActivityId}&itemKeys=pv_usecost`,
                        piePath: `${window.$$commonPath}/api/v1/manager/effect/common/pie?activityId=${window.$$_ActivityId}&quota=pv_usecost&itemKey=pv_usecost`,
                        haspie: true,
                        pieid: 'pv_usecostpieid',
                        hastable: false,
                        select: {
                            tip: '用户群',
                            defaultSelectLabel: '全部',
                            defaulSelectKey: '_$$null'
                        },
                        downloadType: 0
                    }
                },
                otherBaseData: {
                    finishtask: false,
                    funnel: false
                },
                mianTitleAndId: [],
                timeranger: [],
                copytimeranger: []
            };
        },
        created() {
            eventHub.$on(stretchLayout, () => {
                this.todosize();
            });
            this.whichLineChartNeedsShow();
        },

        watch: {
            timeranger(next) {
                if (next.length) {
                    this.copytimeranger = this
                        .timeranger
                        .slice();
                }
            }
        },

        methods: {
            filter(arr) {
                const temparr = [];
                for (let i = 0; i < arr.length; i++) {
                    if (this.mianTitleAndIdBaseData.hasOwnProperty(arr[i])) {
                        temparr.push(this.mianTitleAndIdBaseData[arr[i]]);
                    } else {
                        this.otherBaseData[arr[i]] = true;
                    }
                }
                if (temparr.length > 0) {
                    this.mianTitleAndId = temparr.slice();
                }
            },
            async createDefaultRrangeOfTime() {
                const res = await axios.get(
                    `${window.$$commonPath}/api/v1/manager/effect/activity/getQueryDate?activityId=${window.$$_ActivityId}`,
                    {
                        // baseURL: window.$$domain,
                        headers: {
                            Authorization: window.$$Authorization
                        }
                    }
                );

                if (res.code === 0) {
                    this.timeranger = [res.data.start, res.data.end];
                    const oneday = 24 * 60 * 60 * 1000;
                    //t+1往前倒退一天
                    if (this.tplus1 && Math.abs(Date.now() - res.data.end) < (oneday)) {
                        this.timeranger[1] -= oneday;
                    }
                }
                // const now = Date.now(); const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
                // this.timeranger = [sevenDaysAgo, now];
            },

            whichLineChartNeedsShow() {
                let quota = 'basic';
                this.tplus1 = false;
                if (/be-data-overview/.test(location.hash)) {
                    quota = 'basic';
                } else if (/benefit-analysis/.test(location.hash)) {
                    quota = 'benefit';
                } else if (/fe-data-overview/.test(location.hash)) {
                    quota = 'trackSource';
                } else if (/cg-data-overview/.test(location.hash)) {
                    quota = 'front';
                    this.tplus1 = true;
                }
                axios
                    .get(
                        `${window.$$commonPath}/api/v1/manager/effect/user/showpanel/curve?activityId=${window.$$_ActivityId}&quota=${quota}`,
                        {
                            // baseURL: window.$$domain,
                            headers: {
                                Authorization: window.$$Authorization
                            }
                        },
                    )
                    .then((res) => {
                        if (res.code === 0) {
                            for (let i = 0; i < res.data.length; i++) {
                                res
                                    .data[i]
                                    .path = `${window
                                    .$$commonPath}/api/v1/manager/effect/common/curve?activityId=${window
                                    .$$_ActivityId}&itemKeys=${res
                                    .data[i]
                                    .itemKeys}`;
                                res
                                    .data[i]
                                    .select = {
                                        tip: '用户群',
                                        defaultSelectLabel: '全部',
                                        defaulSelectKey: '_$$null'
                                    };
                            }
                            this.mianTitleAndId = res.data;
                        }

                        this.createDefaultRrangeOfTime();
                        this.hasavfunc = debounce(this.todosize, 60);
                        window.onresize = () => {
                            this.hasavfunc();
                        };
                    });
            },
            refresh() {
                eventHub.$emit(refresh);
            },
            rehasavfunc() {
                if (this.hasavfunc) {
                    this.hasavfunc();
                } else {
                    this.hasavfunc = debounce(this.todosize, 60);
                    this.hasavfunc();
                }
            },
            todosize() {
                if (!this.container) {
                    this.container = document.getElementsByClassName('page-container')[0];
                }
                for (let i = 0; i < this.mianTitleAndId.length; i++) {
                    const id = this
                        .mianTitleAndId[i]
                        .mountedId;
                    const mychartContainer = document.getElementById(id);
                    const currentw = window
                        .getComputedStyle(this.container)
                        .width;
                    const wannerw = +currentw.slice(0, currentw.length - 2) * 0.40;
                    mychartContainer.style.width = `${wannerw}px`;
                    eventHub.$emit(resizeCanvs);
                }
            }
        },

        mounted() {
            const pickertops = document.querySelectorAll('.ant-calendar-top');
            const len = pickertops.length;

            pickertops[len - 1].addEventListener('click', (e) => {
                if (e.target.nodeName === 'A') {
                    setTimeout(() => {
                        const temptime = document
                            .querySelectorAll('.ant-calendar-range-picker')[len - 1]
                            .value;
                        const temptimeArr = temptime.split(' ~ ');
                        const newtimeArr = [
                            `${temptimeArr[0]} 00:00:00`,
                            `${temptimeArr[1]} 23:59:59`
                        ];
                        document
                            .querySelectorAll('.ant-calendar-picker-container')[len - 1]
                            .style
                            .display = 'none';
                        this.copytimeranger = [
                            new Date(`${newtimeArr[0]}`).getTime(),
                            new Date(`${newtimeArr[1]}`).getTime()
                        ];
                    }, 300);
                }
            }, false);
        }
    };
</script>
<style lang="scss">
    .data-container {
        position: relative;
        overflow: hidden;
    .panel-body {
        margin-top: 1px;
        background: #fff;
        border: 1px solid #e7eaec;
        border-radius: 2px;
        position: relative;
    }
    .alert-info {
        color: #31708f;
        background-color: #f5f8fb;
        border: 0;
        margin-bottom: 0;
    }
    .alert {
        padding: 15px;
        border: 1px solid transparent;
        border-radius: 4px;
    }
     a,
    button,
    div,
    li,
    span {
        transition: all 0.15s;
    }
    svg:not(:root) {
        overflow: hidden;
    }
    .iconlight {
        fill: currentColor;
        width: 16px;
        height: 16px;
        color: #F5C726;
        /* line-height: 32px; */
        /* display: block; */
        vertical-align: middle;
        float: left;
        display: block;
        margin-right: 10px;
        margin-top: 1px;
    }
    .animated {
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        z-index: 100;
    }
    .fadeInRight {
        -webkit-animation-name: fadeInRight;
        animation-name: fadeInRight;
    }
    @keyframes fadeInRight {
        0% {
            opacity: 0;
            -webkit-transform: translateX(40px);
            -ms-transform: translateX(40px);
            transform: translateX(40px);
        }

        100% {
            opacity: 1;
            -webkit-transform: translateX(0);
            -ms-transform: translateX(0);
            transform: translateX(0);
        }

    }
        .dashboard-toolbar {
            position: relative;
            z-index: 10;
            padding: 20px 23px 10px;
            box-sizing: border-box;
            overflow: hidden;
            text-align: center;
            font-size: 20px;
            // .pull-right {
            //     float: right!important;
            //     padding-right: 20px;
            //     display: flex;
            //     min-width: 300px;
            //     justify-content: space-around;

            // }
            .pull-left {
                float: left!important;
                display: flex;
                margin-top: -3px;
                .iconBtn {
                    cursor: pointer;
                    border: 1px solid #E9F0F7;
                    box-shadow: none;
                    background: #fff;
                    color: #99A9BF;
                    outline: 0;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    min-width: 38px;
                    font-size: 14px;
                    margin-left: 20px;
                }
                .iconBtn:hover {
                    color: #559FF0;
                }
            }
        }
    }
</style>