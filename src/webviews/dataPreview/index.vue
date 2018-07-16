<template>
    <section class="data-container">
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
        <data-analysis
            :mianTitleAndId="v"
            v-for=" (v,k) in mianTitleAndId"
            :key="k"
            :timeranger="timeranger"></data-analysis>

    </section>
</template>
<script>

    import dataAnalysis from '../../packages/template-line-chart/index.vue';

    import eventHub, { resizeCanvs, refresh, stretchLayout } from '../../lib/eventhub';
    import { debounce } from '../../utils/helpers';

    require('echarts/lib/chart/line');

    export default {

        components: {
            'data-analysis': dataAnalysis,
        },
        data() {
            return {
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
                            defaulSelectKey: '_$$null',
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
                            defaulSelectKey: '_$$null',
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
                            defaulSelectKey: '_$$null',
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
                            defaulSelectKey: '_$$null',
                        },
                        downloadType: 0,
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
                                piePath: `${window.$$commonPath}/api/v1/manager/effect/common/pie?activityId=${window.$$_ActivityId}&itemKey=pv_finishtask&quota=pv_finishtask`,
                            }, {
                                pieid: 'data-access-chart-behave-2-2',
                                piePath: `${window.$$commonPath}/api/v1/manager/effect/common/pie?activityId=${window.$$_ActivityId}&itemKey=pv_join&quota=pv_join`,
                            },
                        ],
                        haspie: false,
                        hastable: true,
                        pieid: 'joinpieid',
                        select: {
                            tip: '用户群',
                            defaultSelectLabel: '全部',
                            defaulSelectKey: '_$$null',
                        },
                        downloadType: 0,
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
                            defaulSelectKey: '_$$null',
                        },
                        downloadType: 0,
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
                            defaulSelectKey: '_$$null',
                        },
                        downloadType: 0,
                    },
                },
                otherBaseData: {
                    finishtask: false,
                    funnel: false,
                },
                mianTitleAndId: [],
                timeranger: [],
            };
        },
        created() {
            eventHub.$on(stretchLayout, () => {
                this.todosize();
            });
            this.whichLineChartNeedsShow();
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
            createDefaultRrangeOfTime() {
                const now = Date.now();
                const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);

                this.timeranger = [sevenDaysAgo, now];
            },

            whichLineChartNeedsShow() {
                let quota = 'basic';
                if (/be-data-overview/.test(location.hash)) {
                    quota = 'basic';
                } else if (/benefit-analysis/.test(location.hash)) {
                    quota = 'benefit';
                }

                axios
                    .get(
                        `${window.$$commonPath}/api/v1/manager/effect/user/showpanel/curve?activityId=${window.$$_ActivityId}&quota=${quota}`,
                        {
                            // baseURL: window.$$domain,
                            headers: {
                                Authorization: window.$$Authorization,
                            },
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
                                        defaulSelectKey: '_$$null',
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
            },
        },
    };
</script>
<style lang="scss">
    .data-container {
        position: relative;
        overflow: hidden;
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