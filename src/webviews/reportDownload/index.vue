<template>
    <div style="position:relative;width:100%;overflow:hidden">
        <div class="panel-body">
            <div class="alert alert-info">
                <nb-badge status="processing" text="汇总数据有1H延迟。"></nb-badge>
            </div>
        </div>
        <div style="display:flex;justify-content:flex-end;align-items:center" v-if="hasAccess">
            <nb-icon
                @click="downreport"
                type="cloud-download"
                style="cursor:pointer;color:#00BBFF;width:40px;height:30px;font-size:28px;margin-right:30px"></nb-icon>
        </div>
        <div style="position:relative;width:100%;overflow:hidden;margin-bottom:60px" v-if="hasAccess">
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
                    <!-- <tr class="assessDetail">
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

                        <td>奖品使用人数</td>
                        <td v-for="(v,k) in tabledata.datas[3]" :key="k">
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
                        v-for="(v,k) in (taskrowspan * 2)"
                        :key="k">
                        <td :rowspan="(taskrowspan * 2)" v-if="k === 0">
                            任务完成
                        </td>
                        <td
                            rowspan="2"
                            style="text-align:center;white-space: nowrap;"
                            v-if="k % 2 === 0">
                            {{tabledata.tasks[k / 2].key}}

                        </td>
                        <td>{{ (k%2) === 0 ? '完成人数' : '完成次数'}}
                        </td>
                        <td
                            v-for="(v,k) in tabledata.tasks[parseInt(k / 2)][ (k%2) === 0 ? 'uv_finishTask' : 'pv_finishTask']">
                            {{v}}
                        </td>
                    </tr> -->
                    <tr
                        class="assessDetail"
                        v-if="tabledata.h5Datas.length"
                        v-for="(v,k) in (h5Datasrowspan * 3)"
                        :key="k">
                        <td :rowspan="(h5Datasrowspan * 3)" v-if="k === 0">
                            H5埋点
                        </td>
                        <td
                            rowspan="3"
                            style="text-align:center;white-space: nowrap;"
                            v-if="k % 3 === 0">
                            {{tabledata.h5Datas[k / 3].key}}
                        </td>
                        <td>{{ (k%3) === 0 ? '每日uv' : ((k%3) === 1 ? '新增uv' : 'pv')}}
                        </td>
                        <td
                            v-for="(v,k) in tabledata.h5Datas[parseInt(k / 3)][(k%3) === 0 ? 'duv' : ((k%3) === 1 ? 'uv' : 'pv')]"
                            :key="k">
                            {{v}}
                        </td>
                    </tr>
                    <tr
                        class="assessDetail"
                        v-if="tabledata.resource.length"
                        v-for="(v,k) in (resourcerowspan * 4)"
                        :key="k">
                        <td :rowspan="(resourcerowspan * 4)" v-if="k === 0">
                           资源位投放
                        </td>
                        <td
                            rowspan="4"
                            style="text-align:center;white-space: nowrap;"
                            v-if="k % 4 === 0">
                            {{tabledata.resource[k / 4].key}}
                        </td>
                        <td>{{ (k%4) === 0 ? '曝光pv' : ((k%4) === 1 ? '每日曝光uv' : (k%4) === 2 ? '点击pv' : '每日点击uv')}}
                        </td>
                        <td
                            v-for="(v,k) in tabledata.resource[parseInt(k / 4)][(k%4) === 0 ? 'pv_resource' : ((k%4) === 1 ? 'duv_resource' : ((k%4) === 2 ? 'pv_resource_click' : 'duv_resource_click'))]"
                            :key="k">
                            {{v}}
                        </td>
                    </tr>
                    <tr
                        class="assessDetail"
                        v-if="tabledata.serverEvents.length"
                        v-for="(v,k) in (serverEventsrowspan * 3)"
                        :key="k">
                        <td :rowspan="(serverEventsrowspan * 3)" v-if="k === 0">
                            服务器埋点
                        </td>
                        <td
                            rowspan="3"
                            style="text-align:center;white-space: nowrap;"
                            v-if="k % 3 === 0">
                            {{tabledata.serverEvents[k / 3].key}}
                        </td>
                        <td>{{ (k%3) === 0 ? '每日uv' : ((k%3) === 1 ? '新增uv' : 'pv')}}
                        </td>
                        <td
                            v-for="(v,k) in tabledata.serverEvents[parseInt(k / 3)][(k%3) === 0 ? 'duv' : ((k%3) === 1 ? 'uv' : 'pv')]"
                            :key="k">
                            {{v}}
                        </td>
                    </tr>
                      <tr
                        class="assessDetail"
                        v-if="tabledata.moneyEvents.length"
                        v-for="(v,kk) in (moneyEventsrowspan * 1)"
                        :key="kk">
                        <td :rowspan="(moneyEventsrowspan * 1)" v-if="kk === 0">
                            效益概览
                        </td>
                        <td
                            rowspan="1"
                            style="text-align:center;white-space: nowrap;"
                            >
                            {{tabledata.moneyEvents[kk].key}}
                        </td>
                        <td>金额类(单位:元)</td>
                        <td
                            v-for="(v,k) in tabledata.moneyEvents[kk]['pv']"
                            :key="k">
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
        <div class="el-alert info-403 el-alert--warning" v-else><i class="el-alert__icon el-icon-warning is-big"></i><div class="el-alert__content"><span class="el-alert__title is-bold">没有权限访问此菜单或服务，请通过以下地址申请。</span><p>需要权限添加请联系：程云(chengyun@u51.com)</p><i class="el-alert__closebtn el-icon-close" style="display: none;"></i></div></div>
        <!-- 加载loading模块 -->
        <div id="ajax-loader" style="display: none;">
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <p>正在加载中</p>
        </div>
        <div id="mask"></div>
        <!-- 加载loading模块 -->
    </div>

</template>
<script>
    import {Notification} from '@u51/miox-vant';
    export default {
        data() {
            return {
                tabledata: {
                    datas: [],
                    tasks: [],
                    resource: [],
                    h5Datas: [],
                    serverEvents:[],
                    moneyEvents:[],
                },
                taskrowspan: 1,
                resourcerowspan: 1,
                h5Datasrowspan: 1,
                serverEventsrowspan:1,
                moneyEventsrowspan:1,
                showtable: false,
                hasAccess:true
            };
        },
        methods: {
            downreport() {
                if (this.candownloadxls) {
                    if (process.env.NODE_ENV === 'dev') {
                        window.open(
                            `http://numfour.ops-activityeffect.51.env/ops-activityeffect/api/v1/downloadTranscript?activityId=${window.$$_ActivityId}`,
                        );
                    } else {
                        window.open(
                            `${window.location.origin}/ops-activityeffect/api/v1/downloadTranscript?activityId=${window.$$_ActivityId}`,
                        );
                    }

                } else {
                    Notification.error({
                        message: '消息提示', description: '成绩单服务器暂不可用～', duration: 4, // 显示时长  单位s
                    });

                }

            }
        },

        async mounted() {
            const baseURL = `${window.$$commonPath}/api/v1/manager/effect/action/transcriptTable?activityId=${window.$$_ActivityId}`;
            // <!-- 加载loading模块 -->
            document
                .querySelector('#ajax-loader')
                .style
                .display = 'block';
            document
                .querySelector('#mask')
                .style
                .display = 'block';
            // <!-- 加载loading模块 -->

            const respdata = await axios
                .get(baseURL, {
                    // baseURL: window.$$domain,
                    headers: {
                        Authorization: window.$$Authorization
                    }
                })
                .catch((err) => {
                    this.hasAccess = false;
                    console.log("err====》", err);
                });
            document
                .querySelector('#ajax-loader')
                .style
                .display = 'none';
            document
                .querySelector('#mask')
                .style
                .display = 'none';

            this.showtable = true;
         

            if (respdata.code === 0) {
                this.candownloadxls = true;
                this.tabledata = respdata.data;
                try {
                    this.taskrowspan = this.tabledata.tasks.length;
                } catch (error) {
                    //
                }
                try {
                    this.resourcerowspan = this.tabledata.resource.length;
                } catch (error) {
                    //
                }
                try {
                    this.h5Datasrowspan = this.tabledata.h5Datas.length;
                } catch (error) {
                    //
                }
                    try {
                    this.serverEventsrowspan = this.tabledata.serverEvents.length;
                } catch (error) {
                    //
                }
                     try {
                    this.moneyEventsrowspan = this.tabledata.moneyEvents.length;
                } catch (error) {
                    //
                }
                
              
                this.$forceUpdate();
            } else {
                this.candownloadxls = false;
                Notification.error({
                    message: '消息提示', description: respdata.message, duration: 4, // 显示时长  单位s
                });
            }
        }
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
    /**加载组件 */
    #ajax-loader {
        z-index: 9999;
        display: none;
        position: fixed;
        margin: auto;
        left: 0;
        right: 0;
        top: 40%;
        width: 120px;
        height: 10px;
        padding: 68px 20px 55px 17px;
        border: 1px solid #6FD3B3;
        border-radius: 4px;
        background: rgba(255,255,255,.9);
    }
    @media (max-width:1050px) {
        #ajax-loader {
            left: 42px;
        }
    }
    #ajax-loader p {
        font-size: 13px;
        text-align: center;
        color: #2DCA93;
        line-height: 40px;
    }
    #ajax-loader ul {
        margin: 0;
        list-style: none;
        width: 90px;
        height: 65px;
        position: relative;
        padding: 0;
        height: 10px;
        margin: 0 auto;
    }
    #ajax-loader ul li {
        position: absolute;
        width: 4px;
        border-radius: 2px;
        height: 0;
        background-color: #2DCA93;
        bottom: 0;
    }
    @keyframes sequence1 {
        0% {
            height: 10px;
        }
        50% {
            height: 50px;
        }
        100% {
            height: 10px;
        }
    }
    @keyframes sequence2 {
        0% {
            height: 20px;
        }
        50% {
            height: 65px;
        }
        100% {
            height: 20px;
        }
    }
    #ajax-loader li:nth-child(1) {
        left: 2px;
        animation: sequence1 1s ease infinite 0.1s;
    }
    #ajax-loader li:nth-child(2) {
        animation-name: sequence2;
    }
    #ajax-loader li:nth-child(2) {
        left: 17px;
        animation: sequence1 1s ease infinite 0.2s;
    }
    #ajax-loader li:nth-child(4) {
        animation-name: sequence2;
    }
    #ajax-loader li:nth-child(3) {
        left: 32px;
        animation: sequence1 1s ease infinite 0.3s;
    }
    #ajax-loader li:nth-child(6) {
        animation-name: sequence2;
    }
    #ajax-loader li:nth-child(4) {
        left: 47px;
        animation: sequence1 1s ease infinite 0.4s;
    }
    #ajax-loader li:nth-child(8) {
        animation-name: sequence2;
    }
    #ajax-loader li:nth-child(5) {
        left: 62px;
        animation: sequence1 1s ease infinite 0.5s;
    }
    #ajax-loader li:nth-child(10) {
        animation-name: sequence2;
    }
    #ajax-loader li:nth-child(6) {
        left: 77px;
        animation: sequence1 1s ease infinite 0.6s;
    }
    #ajax-loader li:nth-child(12) {
        animation-name: sequence2;
    }
    #mask {
        display: none;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(144,144,144,.6);
    }

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
    .info-403 {
    margin-top: 40px;
    background-color: rgba(247,186,41,.15);
    color: #f7ba2a;
}
.el-alert {
    width: 100%;
    padding: 8px 16px;
    margin: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    position: relative;
    background-color: #fff;
    overflow: hidden;
     color: #f7ba2a;
    opacity: 1;
    display: table;
    -webkit-transition: opacity .2s;
    transition: opacity .2s;
}
body {
    font-size: 1.4rem;
    margin: 0;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
}
.info-403 .el-alert__icon {
    color: #f7ba2a;
    font-size: 30px;
}
.el-alert__icon.is-big {
    font-size: 28px;
    width: 28px;
}
.el-alert__icon {
    font-size: 16px;
    width: 16px;
    display: table-cell;
    color: #f7ba2a;
    vertical-align: middle;
}
[class*=" el-icon-"], [class^=el-icon-] {
    font-family: element-icons!important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.el-icon-warning:before {
    content: "\E623";
}
.el-alert__content {
    display: table-cell;
    padding: 0 8px;
}
.el-alert__closebtn {
    font-size: 12px;
    color: #f7ba2a;
    opacity: 1;
    top: 12px;
    right: 15px;
    position: absolute;
    cursor: pointer;
}
</style>