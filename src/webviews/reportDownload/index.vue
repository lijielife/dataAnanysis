<template>
    <div style="position:relative;width:100%;overflow:hidden">
        <div style="display:flex;justify-content:flex-end;align-items:center">
            <nb-icon
                @click="downreport"
                type="cloud-download"
                style="cursor:pointer;color:#00BBFF;width:40px;height:30px;font-size:28px;margin-right:30px"></nb-icon>
        </div>
        <div style="width:100%;overflow-x:auto;position:relative" v-show="showtable">
            <table class="mytable">
                <tr>
                    <th></th>
                    <th></th>
                    <th style="width:160px;">
                        <div class="out">
                            <b>指标</b>
                            <em>日期</em>
                        </div>
                    </th>
                    <th v-for="(v,k) in tabledata.colHeads">
                        {{ (v.value) }}
                    </th>
                </tr>
                <tr class="assessDetail">
                    <td rowspan="10">
                        活动基础数据
                    </td>
                    <td rowspan="4">
                        UV
                    </td>
                    <td>访客人数</td>
                    <td v-for="(v,k) in tabledata.datas[0]">
                        {{v}}
                    </td>
                </tr>
                <tr class="assessDetail">
                    <td>参与人数</td>
                    <td v-for="(v,k) in tabledata.datas[1]">
                        {{v}}
                    </td>
                </tr>
                <tr class="assessDetail">

                    <td>领取奖品人数</td>
                    <td v-for="(v,k) in tabledata.datas[2]">
                        {{v}}
                    </td>
                </tr>
                <tr class="assessDetail">

                    <td>奖品奖品人数</td>
                    <td v-for="(v,k) in tabledata.datas[3]">
                        {{v}}
                    </td>
                </tr>
                <tr class="assessDetail">
                    <td rowspan="6">
                        PV
                    </td>
                    <td>访客次数</td>
                    <td v-for="(v,k) in tabledata.datas[4]">
                        {{v}}
                    </td>
                </tr>
                <tr class="assessDetail">
                    <td>参与次数</td>
                    <td v-for="(v,k) in tabledata.datas[5]">
                        {{v}}
                    </td>
                </tr>
                <tr class="assessDetail">
                    <td>领取奖品次数</td>
                    <td v-for="(v,k) in tabledata.datas[6]">
                        {{v}}
                    </td>
                </tr>
                <tr class="assessDetail">
                    <td>奖品使用次数</td>
                    <td v-for="(v,k) in tabledata.datas[7]">
                        {{v}}
                    </td>
                </tr>
                <tr class="assessDetail">
                    <td>活动发放成本</td>
                    <td v-for="(v,k) in tabledata.datas[8]">
                        {{v}}
                    </td>
                </tr>
                <tr class="assessDetail">
                    <td>实际使用成本</td>
                    <td v-for="(v,k) in tabledata.datas[9]">
                        {{v}}
                    </td>
                </tr>
                <tr
                    class="assessDetail"
                    v-if="tabledata.tasks.length"
                    v-for="(v,k) in (taskrowspan * 2)">
                    <td :rowspan="(taskrowspan * 2)" v-if="k === 0">
                        任务完成
                    </td>
                    <td rowspan="2" style="text-align:left;white-space: nowrap;" v-if="k % 2 === 0">
                        {{tabledata.tasks[k / 2].key}}

                    </td>
                    <td>{{ (k%2) === 0 ? '完成人数' : '完成次数'}}
                    </td>
                    <td
                        v-for="(v,k) in tabledata.tasks[parseInt(k / 2)][ (k%2) === 0 ? 'uv_finishTask' : 'pv_finishTask']">
                        {{v}}
                    </td>
                </tr>

            </table>
        </div>
        <div class="ant-table-scroll-tip">
            <div class="ant-table-scroll-tip-horizontal ant-flex">
                <i class="anticon anticon-right  "></i>
            </div>
        </div>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                tabledata: {
                    datas: [],
                    tasks: [],
                },
                taskrowspan: 1,
                showtable: false,
            };
        },
        methods: {
            downreport() {
                if (process.env.NODE_ENV === 'dev') {
                    window.open(
                        `http://numfour.ops-activityeffect.51.env/ops-activityeffect/api/v1/downloadTranscript?activityId=${window.$$_ActivityId}`,
                    );
                } else {
                    window.open(
                        `${window.location.origin}/ops-activityeffect/api/v1/downloadTranscript?activityId=${window.$$_ActivityId}`,
                    );
                }
            },
        },

        async mounted() {
            // document.getElementById('ajax-loader').style.display = 'block';
            // document.getElementById('mask').style.display = 'block';

            const baseURL = `http://transcript.ops-activityeffect.51.env${window.$$commonPath}/api/v1/manager/effect/action/transcriptTable?activityId=${window.$$_ActivityId}`;

            const respdata = await axios.get(baseURL, {
                // baseURL: window.$$domain,
                headers: {
                    Authorization: window.$$Authorization,
                },
            });
            this.showtable = true;

            if (respdata.code === 0) {
                this.tabledata = respdata.data;
                this.taskrowspan = this.tabledata.tasks.length;
                this.$forceUpdate();
            }
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
</style>