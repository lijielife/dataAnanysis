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
                        <label>
                            显示漏斗:</label>
                        <nb-select
                            v-model="select"
                            style="margin-left:10px;margin-right:10px;min-width:100px"
                            @change="selectFunnel">
                            <nb-option :value="index" v-for="(item,index) in funnelTypes" :key="index">{{item}}
                            </nb-option>
                        </nb-select>
                        <nb-button icon="plus" style="margin-left:10px;margin-right:10px;">创建漏斗</nb-button>
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
                <div class="title"></div>
                <div class="bgw" id="testid" style="width:600px;height:600px"></div>
            </div>
              <div class="funnel-chart">
                <div class="title"></div>
                <div class="bgw" id="testid2" style="width:600px;height:600px"></div>
            </div>
        </section>
    </section>
</template>
<script>
    import 'echarts/theme/shine';

    require('echarts/lib/chart/bar');

    export default {
        methods: {
            selectFunnel() {},
            refresh() {},
        },
        data() {
            return {
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
                            name: '转化流程',
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
                                        console.log(params);
                                        return `${params.value}%`;
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
                            name: '支出',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    color: '#333',
                                    show: true,
                                    position: 'left',
                                    formatter: (params) => {
                                        console.log(params);
                                        return `${-(+params.value)}`;
                                    },
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
            document.getElementById('ajax-loader').style.display = 'block';
            document.getElementById('mask').style.display = 'block';
            echarts.init(document.getElementById('testid')).setOption(this.option);
            echarts.init(document.getElementById('testid2')).setOption(this.option);
        },
    };
</script>
<style lang="scss" scoped="scoped">
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
        overflow: auto;
        height: 600px;
        justify-content: center;
        padding: 10px;
        cursor: pointer;
    }
    .funnel-chart{
        margin-right: 20px;
        border: 1px solid #99A9BF;
    }
</style>