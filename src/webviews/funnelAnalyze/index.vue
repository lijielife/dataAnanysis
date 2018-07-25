<template>
    <section class="funnel-analyze-container">
        <div class="panel-body">
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
                <p>按业务需求灵活自定义设置有序无序行为漏斗，可按时间维度、用户属性、用户群多维度拆解漏斗，掌握影响转化的关键因素和每一步的流失细节。</p>
            </div>
        </div>
        <section
            class="wrapper wrapper-content animated fadeInRight ecommerce"
            style="overflow-x: auto;position: relative;">
            <div class="row" style="min-width: 1000px;">
                <div class="toolsbar">
                    <div class="toolsbar-left">
                        漏斗类型:
                        <nb-select v-model="select"  @change="createFunnel" filterable placeholder="请选择漏斗类型">
                                <nb-option
                                    v-for="item in funnellists"
                                    :key="item.autoId"
                                    :label="item.name"
                                    :value="item.autoId"></nb-option>

                        </nb-select>
                        <nb-button
                            icon="plus"
                            style="margin-left:10px;margin-right:10px;"
                            @click="showCreatFunnelModel">创建漏斗</nb-button>
                    </div>
                    <div class="toolsbar-right">
                        <nb-datepicker
                            style="margin-left:10px;margin-right:10px;"
                            v-model="timeranger"
                            range="range"
                            size="large"
                            place="rb"
                            clearable="clearable"></nb-datepicker>
                        <div class="iconBtn" style="margin-left:10px;margin-right:10px;">
                            <nb-icon type="sync" @click="refresh"></nb-icon>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="funnel-charts">
            <div class="funnel-chart">
                <div class="title" v-show="typeof select !== '' && timeranger.length ">转化流程</div>
                <div class="bgw" id="testid" style="width:600px;height:600px"></div>
            </div>
        </section>

        <nb-modal
            class="createFunnel"
            :visible="creatFunnel"
            @ok="saveModal"
            @cancel="closeModal"
            title="新增自定义漏斗"
            :confirm-loading="createFunnelLoading"
            okText="保存"
            modal-style="top:10px;">
            <nb-form direction="horizontal" class="valadate__login-form">
                <nb-form-item style="display:flex" label="漏斗名称" prop="text">
                    <nb-input style="width:200px" v-model="funnelname"></nb-input>
                </nb-form-item>
                <nb-form-item
                    style="display:flex;width:90%;align-items:flex-start;"
                    label="漏斗步骤"
                    prop="text">
                    <div class="item" v-for="(v,k) in steps" :key="k" v-if="v.show">
                        <nb-select
                            v-model="v.value"
                            style="margin-left:2px;margin-right:10px;width:200px">
                            <nb-option-group
                                v-for="group in taglists"
                                :key="group.label"
                                :label="group.label">
                             
                                <nb-option
                                    v-for="item in group.options"
                                    :key="item.value.key"
                                    :label="item.label"
                                    :value="item.value"></nb-option>
                            </nb-option-group>
                        </nb-select>
                        <nb-button
                            icon="minus"
                            v-show="showTags>1"
                            @click="delectStep(k)"
                            shape="circle"
                            style="color:"></nb-button>
                    </div>

                </nb-form-item>

                <nb-form-item style="display:flex;justify-content:center" label="" prop="text">
                    <nb-button type="primary" @click="addStep">添加</nb-button>
                </nb-form-item>

            </nb-form>
        </nb-modal>

    </section>
</template>
<script>
    import 'echarts/theme/shine';
    import { mapActions, mapGetters } from 'vuex';
    import { modal, message } from '@u51/miox-vant';
    import { formatDateTime } from '../../utils/helpers';

    import store from '../../webstore/index';

    require('echarts/lib/chart/bar');

    export default {
        computed: {
            ...mapGetters({ userInfo: 'getUserInfo' }),
        },
        watch: {
            timeranger() {
                if (this.select) {
                    this.createFunnel(this.select);
                }
            },
        },
        store,
        methods: {
            paintFunnel() {
                echarts
                    .init(document.getElementById('testid'))
                    .setOption(this.option);
            },
            createFunnel(c) {
                if (!this.timeranger.length) {
                    message.warning('请选择时间范围');
                    return;
                }
                const quota = 'uv';
                const funnelId = c;
                const start = formatDateTime(this.timeranger[0], 6);
                const end = formatDateTime(this.timeranger[1], 6);
                const activityId = window.$$_ActivityId;

                // GET /ops-activityeffect/api/v1/manager/effect/funnel/paint
                const url = `http://192.168.21.226:8082/ops-activityeffect/api/v1/manager/effect/funnel/paint?quota=${quota}&funnelId=${funnelId}&start=${start}&end=${end}&activityId=${activityId}`;
                const a = modal.spin();
                axios({
                    url,
                    headers: {
                        Authorization: window.$$Authorization,
                    },
                }).then((res) => {
                    a.close();
                    if (res.code === 0) {
                        const datal = [];
                        const datar = [];
                        const title = [];

                        // 对0的特殊处理  0 === 0.0001
                        for (let i = 0; i < res.data.length; i++) {
                            title.push((res.data[i].name));
                            datal.push((res.data[i].value === 0 ? 0.0001 : res.data[i].value));
                            datar.push(-(res.data[i].value === 0 ? 0.0001 : res.data[i].value));
                        }
                        this.option.series[0].data = datal;
                        this.option.series[1].data = datar;
                        this.option.yAxis[0].data = title;
                        this.paintFunnel();
                    }
                });
            },
            ...mapActions(['getUserInfo', 'getMenus']),
            selectFunnel() {},
            refresh() {},
            showCreatFunnelModel() {
                this.creatFunnel = true;
            },
            delectStep(key) {
                this.steps[key] = {
                    show: false,
                    value: 0,
                };
                this.showTags--;
                this.$forceUpdate();
            },
            addStep() {
                this
                    .steps
                    .push({ show: true, value: '' });
                this.showTags++;
            },
            saveModal() {
                const body = {
                    activityId: window.$$_ActivityId,
                    createUser: this.userInfo.account,
                    items: [
                        // {     desc: 'string',     key: 'string',     value: {}, },
                    ],
                    name: this.funnelname,
                };
                for (let i = 0; i < this.steps.length; i++) {
                    if (this.steps[i].show) {
                        body
                            .items
                            .push({
                                ...this
                                    .steps[i]
                                    .value,
                            });
                    }
                }
    
                // POST /ops-activityeffect/api/v1/manager/effect/funnel/add
                const a = modal.spin();
                axios({
                    method: 'post',
                    data: body,
                    url: 'http://192.168.21.226:8082/ops-activityeffect/api/v1/manager/effect/funnel/add',
                    headers: {
                        Authorization: window.$$Authorization,
                    },
                }).then((res) => {
                    a.close();
                    console.log(res);
                });
            },
            closeModal() {
                this.creatFunnel = false;
            },
        },
        data() {
            return {
                showTags: 1,
                taglists: [],
                funnellists: [],
                steps: [
                    {
                        show: true,
                        value: '',
                    },
                ],
                selectOption: {
                    option: [],
                },

                funnelname: '',
                createFunnelLoading: false,
                creatFunnel: false,
                timeranger: [],
                funnelTypes: [],
                select: '',
                option: {
                    tooltip: {
                        show: false,
                    },
                    color: [
                        '#62d1de', '#54d6b6', '#a6db69',
                    ],
                    grid: {
                        left: '3%',
                        right: '10%',
                        containLabel: true,
                    },
                    xAxis: [
                        {
                            show: false,
                            type: 'value',
                        },
                    ],
                    yAxis: [
                        {
                            nameLocation: 'end', // ---轴名称相对位置
                            nameTextStyle: {
                                fontFamily: 'Tahoma',
                                fontWeight: 'bolder',
                                align: 'left',
                                fontSize: 18,
                                borderColor: '#449933',
                                borderRadius: 4,
                                nameGap: 40,
                                color: '#987654',
                            },
                            axisLabel: {
                                margin: 100,
                            },
                            type: 'category',
                            axisTick: {
                                show: false,
                            },
                            data: [
                                '周一',
                                '周二',
                                '周三',
                                '周四',
                                '周五',
                                '周六',
                                '周日',
                            ],
                        },
                    ],
                    series: [
                        {
                            barWidth: 40,
                            barMinHeight: 10,
    
                            barMaxWidth: 200,
                            name: '收入',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    color: '#333',
                                    position: 'right',
                                    formatter: (params) => {
                                        if (params.dataIndex === this.option.series[0].data.length - 1) {
                                            return '100%';
                                        }
                                        if (this.option.series[0].data[params.dataIndex + 1] === 0.001) {
                                            return '无意义';
                                        }
                                        return `${(((params.value === 0.001 ? 0 : params.value) / this.option.series[0].data[this.option.series[0].data.length - 1]) * 100).toFixed(0)}%`;
                                    },
                                },
                            },
                            data: [
                                100000,
                                302,
                                341,
                                374,
                                390,
                                450,
                                420,
                            ],
                        }, {
                            barWidth: 40,
                            barMaxWidth: 200,
                            barMinHeight: 10,
                            name: '支出',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    color: '#333',
                                    show: true,
                                    position: 'left',
                                    formatter: params => `${-(+params.value === -0.0001 ? 0 : params.value)}`,
                                },
                            },
                            data: [
                                -100000,
                                -302,
                                -341,
                                -374,
                                -390,
                                -450,
                                -420,
                            ],
                        },
                    ],
                },
            };
        },
        mounted() {
            // document.getElementById('ajax-loader').style.display = 'block';
            // document.getElementById('mask').style.display = 'block';
    
            // const baseURL =
            // `${window.$$commonPath}/api/v1/manager/effect/funnel/itemKey/list?activityId=${window.$$_ActivityId}`;
            // 获取漏斗标签列表
            const baseURLTags = `http://192.168.21.226:8082/ops-activityeffect/api/v1/manager/effect/funnel/itemKey/list?activityId=${window.$$_ActivityId}`;
            axios
                .get(baseURLTags, {
                    // baseURL: window.$$domain,
                    headers: {
                        Authorization: window.$$Authorization,
                    },
                })
                .then((respdata) => {
                    respdata = {
                        code: 0,
                        data: [
                            {
                                key: 'VIEW_001',
                                desc: 'A按钮曝光事件埋点',
                                value: 0,
                            }, {
                                key: 'EC002',
                                desc: 'B按钮点击事件埋点',
                                value: 0,
                            }, {
                                key: 'resource',
                                desc: '新增曝光数(UV)',
                                value: 1,
                            }, {
                                key: 'visitor',
                                desc: '新增访客数(UV)',
                                value: 1,
                            }, {
                                key: 'join',
                                desc: '新增参与人数(UV)',
                                value: 1,
                            }, {
                                key: 'finishtask',
                                desc: '新增完成任务人数(UV)',
                                value: 1,
                            }, {
                                key: 'predrawprize',
                                desc: '预领奖人数(UV)',
                                value: 1,
                            }, {
                                key: 'drawprize',
                                desc: '新增领奖人数(UV)',
                                value: 1,
                            }, {
                                key: 'drawcost',
                                desc: '新增活动发放成本(UV)',
                                value: 1,
                            }, {
                                key: 'usecost',
                                desc: '新增实际使用成本(UV)',
                                value: 1,
                            }, {
                                key: 'prizeuse',
                                desc: '新增奖品使用人数(UV)',
                                value: 1,
                            },
                        ],
                        success: true,
                    };
                    if (respdata.code === 0) {
                        const labelObj = {
                            0: {
                                label: '源数据',
                                options: [],
                            },
                            1: {
                                label: '聚合类数据',
                                options: [],
                            },
                        };
                        const resd = respdata.data;
                        for (let i = 0; i < resd.length; i++) {
                            labelObj[resd[i].value]
                                .options
                                .push({ value: {
                                    value: resd[i].value,
                                    key: resd[i].key,
                                },
                                label: resd[i].desc });
                        }
                        this.taglists = labelObj;
                    }
                });
    
            //  获取漏斗列表
            const baseURLFunnelTypes = `http://192.168.21.226:8082/ops-activityeffect/api/v1/manager/effect/funnel/list?activityId=${window.$$_ActivityId}`;
            axios
                .get(baseURLFunnelTypes, {
                    // baseURL: window.$$domain,
                    headers: {
                        Authorization: window.$$Authorization,
                    },
                })
                .then((respdata) => {
                    if (respdata.code === 0) {
                        this.funnellists = respdata.data;
                    }
                });
        },
    };
</script>
<style lang="scss" scoped="scoped">
    .ant-table-scroll-tip-horizontal {
        top: 0;
        right: 0;
        height: 100%;
        position: absolute;
        background-color: rgba(88,88,88,.1);
        pointer-events: none;
        padding: 2px;
        z-index: 2;
        text-align: left;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        .anticon {
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            display: inline-block;
            font-style: normal;
            vertical-align: baseline;
            text-align: center;
            text-transform: none;
            line-height: 1;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;

        }
        .anticon-right:before {
            content: "\E61F";
        }
        .anticon:before {
            display: block;
            font-family: anticon!important;
        }
        *,
        :after,
        :before {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }

    }
    .mytable {
        border-collapse: collapse;
        border: 1px #e3e3e3 solid;
        min-width: 100%;
        margin: 0 auto;
        td,
        th {
            border: 1px solid #e3e3e3;
            text-align: center;
            font-size: 18px;
            line-height: 50px;
            height: 50px;
            background: #C6C7C6;
            padding: 0;
            min-width: 100px;
            font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
        }
        th:nth-child(1),
        th:nth-child(2) {
            background: #ffffff;
        }

        td {
            height: 30px !important;
            line-height: 30px !important;
            font-size: 14px;
        }
        /*模拟对角线*/
        .out {
            border-top: 50px #e3e3e3 solid;
            /*上边框宽度等于表格第一行行高*/
            border-left: 160px #ffffff solid;
            /*左边框宽度等于表格第一行第一格宽度*/
            position: relative;
            /*让里面的两个子容器绝对定位*/
        }

        b {
            font-style: normal;
            display: block;
            position: absolute;
            top: -2.3em;
            left: -150px;
            width: 50px;
        }

        em {
            font-style: normal;
            display: block;
            position: absolute;
            top: -60px;
            left: -54px;
            width: 50px;
        }

        .assessDetail td {
            background-color: #FFF;
        }
    }

    .funnel-analyze-container {
        padding-bottom: 100px;

    }
    .item {
        margin-bottom: 10px;
    }
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
        color: #6f7d96;
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
    .toolsbar {
        border-bottom-width: 0;
        padding-left: 30px;
        padding-right: 30px;
        border-bottom: 1px solid #EBEBEB;
        display: flex !important;
        align-items: center;
        height: 40px;
        justify-content: space-between;
    }
    .toolsbar .toolsbar-left {
        display: flex;
        align-items: center;
    }
    .toolsbar .toolsbar-right {
        display: flex;
        align-items: center;
    }
    .row {
        padding: 0 !important;
    }
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
    .funnel-charts {
        display: flex;
        width: 100%;
        height: 600px;
        justify-content: center;
        padding: 10px;
        cursor: pointer;
    }
    .funnel-chart {
        margin-right: 20px;

        position: relative;
        .title {
            position: absolute;
            top: 20px;
            left: 20px;
            font-size: 18px;
            height: 400px;
        }
    }
</style>