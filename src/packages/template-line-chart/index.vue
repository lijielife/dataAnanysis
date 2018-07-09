<template>
    <section class="data-preview">
        <div class="widget-topbar" style="cursor: auto;">
            <div class="widget-title">
                <div class="title" style="border-bottom:1px solid black;">
                    <a>{{mianTitleAndId.title}}</a>
                </div>
                <div class="overview" v-if="overview">
                    <div class="section1">
                        <div class="today">
                            {{ overview.today.value}}
                            <span class="unit">{{ overview.unit.value }}</span>
                        </div>
                        <div class="compYesterday">
                            <p>{{overview.compYesterday.desc}}
                                <span :class="[overview.compRise.value ? 'up' :'down' ]">
                                    {{ overview.compYesterday.value}}
                                </span>

                            </p>
                        </div>
                    </div>
                    <div class="section2">
                        <div class="descl">
                            <p>
                                <span>{{overview.yesterday.desc}}:</span>{{ overview.yesterday.value}}</p>

                        </div>
                        <div class="descr">
                            <p>
                                <span>{{overview.yesterdayNow.desc}}:</span>
                                {{ overview.yesterdayNow.value}}</p>
                            <p>
                                <span>{{overview.total.desc}}:</span>
                                {{ overview.total.value}}
                            </p>
                        </div>

                    </div>

                </div>
            </div>
            <div class="pull-right widget-setting">
                <div class="customer-menu"></div>
            </div>
        </div>
        <section class="data-desc"></section>
        <div
            class="bgw"
            :id="mianTitleAndId.MountedId"
            :style="{width: '100%', height: '300px'}"></div>

    </section>
</template>
<script>

    import 'echarts/theme/shine';
    import eventHub, {resizeCanvs, refresh} from '../../lib/eventhub';
    import {formatDateTime, cloneObj} from '../../utils/helpers';

    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/toolbox');
    require('echarts/lib/component/legend');
    require('echarts/lib/component/markLine');

    export default {
        watch: {
            timeranger(next) {
                this.rangeDate = next.slice();
                if (this.mianTitleAndId.isTPlusone) {
                    const nowTime = new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime();
                    this.rangeDate[1] = nowTime;
                    this.rangeDate[0] = this.rangeDate[1] - (7 * 24 * 60 * 60 * 1000);
                }
                this.toshow();
            }
        },
        props: [
            'timeranger', 'mianTitleAndId'
        ],
        data() {
            return {
                questionHint: '',
                stretch: 1,
                rangeDate: [],
                options: {},
                legendKey: [],
                legendVal: [],
                categarires: 0,
                formatDatas: {},
                suppleformatDatas: {},
                unityformatDatas: {},
                summary: [],
                myChart: null,
                groupIds: [
                    {
                        key: this.mianTitleAndId.select.defaulSelectKey,
                        value: this.mianTitleAndId.select.defaultSelectLabel
                    }
                ],
                hint: '',
                content: '',
                fuzzQuery: '',
                select: this.mianTitleAndId.select.defaulSelectKey,
                downUrl: '',
                subQuota: {},
                overview: false
            };
        },

        mounted() {
            this.rangeDate = this
                .timeranger
                .slice();
            if (this.mianTitleAndId.isTPlusone) {
                const nowTime = new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime();
                this.rangeDate[1] = nowTime;
                this.rangeDate[0] = this.rangeDate[1] - (7 * 24 * 60 * 60 * 1000);
            }
            this.toshow();
            eventHub.$on(resizeCanvs, () => {
                if (this.bastoptions) {
                    this
                        .myChart
                        .resize();
                }
            });
            eventHub.$on(refresh, () => {
                this.toshow();
            });
        },

        /**
         *
         *  模块流程说明
         *  填充数据
         *
         *
         */

        methods: {
            toeval(val) {
                return eval(val);
            },
            getOverview() {
                const baseURL = `${window.$$commonPath}/api/v1/manager/effect/summary/simple?activityId=${window.$$_ActivityId}&category=${this.mianTitleAndId.name}`;
                axios
                    .get(baseURL, {
                        // baseURL: window.$$domain,
                        headers: {
                            Authorization: window.$$Authorization
                        }
                    })
                    .then((res) => {
                        if (res.code === 0) {
                            this.overview = res.data.indicators;
                        }
                    });
            },

            async toshow() {
                this.hasshow = 1;
                await this.getDateStream(this.rangeDate); // 先把数据拿到
                this.dwd();
                this.drawAccessDataLines();
            },
            downFile() {
                const link = document.createElement('a');
                link.href = this.downUrl;
                link.click();
                window
                    .URL
                    .revokeObjectURL(link.href);
            },

            todoDownload() {
                const rangeDate = this.rangeDate;
                if (!rangeDate.length) {
                    alert('请先选择时间范围');
                    return;
                }
                const activityId = window.$$_ActivityId;

                const newrangeDate = `&start=${formatDateTime(rangeDate[0], 6)}&end=${formatDateTime(
                    rangeDate[1],
                    6,
                )}`;
                const downloadType = this.mianTitleAndId.downloadType;
                this.downUrl = `${location.protocol}//${location.host}${window.$$commonPath}/api/v1/download?activityId=${activityId}${newrangeDate}&downloadType=${downloadType}`;
                this.downFile();
            },

            async getDateStream(startAndend) {
                this.getOverview();
                const id = this.mianTitleAndId.MountedId;

                if (!this.myChart) {
                    this.myChart = window
                        .echarts
                        .init(document.getElementById(id), 'shine');
                }

                this
                    .myChart
                    .showLoading();

                let baseURL = this.mianTitleAndId.path;
                let start = '';
                let end = '';
                if (Array.isArray(startAndend)) {
                    if (this.rangeDate === undefined) {
                        this.rangeDate = [];
                    }
                    this.rangeDate[0] = new Date(startAndend[0]);
                    this.rangeDate[1] = new Date(startAndend[1]);
                    start = formatDateTime(startAndend[0], 6);
                    end = formatDateTime(startAndend[1], 6);
                    const startAndendStr = `&start=${start}&end=${end}`;
                    baseURL += `${startAndendStr}`;
                } else {
                    baseURL += `${startAndend}`;
                }
                const respdata = await axios.get(baseURL, {
                    // baseURL: window.$$domain,
                    headers: {
                        Authorization: window.$$Authorization
                    }
                });

                // 如果正确返回
                if (respdata.code === 0) {
                    /**
                 *  @func 绑定id，方便生成echart的容器
                 *  @warning  createid这里必须在这里调用
                 *            不然get／set 的钩子不能注册到 id上
                 *            除非自己调用$set
                 */
                    this.initial(respdata);

                    // this.dwd(); this.drawAccessDataLines();
                }
                this
                    .myChart
                    .hideLoading();
            },

            async changetimer() {
                const rangeDate = this.rangeDate;

                const newrangeDate = `&start=${formatDateTime(rangeDate[0], 6)}&end=${formatDateTime(
                    rangeDate[1],
                    6,
                )}`;
                await this.getDateStream(newrangeDate);
                this.dwd();
                this.drawAccessDataLines();
            },

            // 初始化数据 即,将返回的数据，分类存储
            initial(respdata) {
                this.options = respdata.data;
                this.questionHint = this.options.questionHint;
                this.type = this.options.type; // 0表示按照小时、1小时按照天。小时同一天的要累加
                this.groups = this.options.groups;
                this.quota = this.options.quota;
                this.summary = this.options.summary;
                this.data = this.options.data;
                this.subQuota = this.options.subQuota;
                this.xAxis = [];
                this.hint = this.options.hints;
                this.visible = Array.isArray(this.hint) && this.hint.length;
                this.content = this.visible
                    ? this.hint[0]
                    : '暂无信息提示';
            },

            // deal with data
            dwd() {
                this.createLineOption();
            },

            // 画出图形
            drawAccessDataLines() {
                // 基于准备好的dom，初始化echarts实例
                const id = this.mianTitleAndId.MountedId;
                const triggerAction = (action, selected) => {
                    const legend = [];

                    for (const name in selected) {
                        if (selected.hasOwnProperty(name)) {
                            legend.push({name});
                        }
                    }

                    this
                        .myChart
                        .dispatchAction({type: action, batch: legend});
                };

                const savePreSelected = (selected) => {
                    if (!this.isFirst) {
                        this.isFirst = true;
                    }
                    for (const name in selected) {
                        if (!selected.hasOwnProperty(name)) {
                            continue;
                        }

                        this.preSelect[name] = selected[name];
                    }
                };

                const isFirstUnSelect = (selected) => {
                    if (!this.isFirst) {
                        this.isFirst = true;

                        this.preSelect = cloneObj(selected);

                        for (const name in selected) {
                            if (!selected.hasOwnProperty(name)) {
                                continue;
                            }

                            this.preSelect[name] = !selected[name];
                        }
                        return true;
                    } else if (!this.metaKey) {
                        let totalTrue = 0;
                        const newObj = {};
                        for (const name in selected) {
                            if (!selected.hasOwnProperty(name)) {
                                continue;
                            }

                            if (selected[name] === true) {
                                totalTrue++;
                            }
                        }

                        if (totalTrue === 2) {
                            for (const name in selected) {
                                if (!selected.hasOwnProperty(name)) {
                                    continue;
                                }
                                if (this.preSelect[name] === true) {
                                    newObj[name] = true;
                                    this.preSelect[name] = false;
                                } else if (this.preSelect[name] !== selected[name]) {
                                    this.preSelect[name] = selected[name];
                                }
                            }
                            this.selected = newObj;
                        } else if (totalTrue === 0) {
                            for (const name in selected) {
                                if (!selected.hasOwnProperty(name)) {
                                    continue;
                                }

                                selected[name] = false;
                                this.preSelect[name] = !selected[name];
                            }

                            this.isFirst = false;
                        }
                        return true;
                    } else if (this.metaKey) {
                        const newObj = {};
                        for (const name in selected) {
                            if (!selected.hasOwnProperty(name)) {
                                continue;
                            }

                            if (this.preSelect[name] === selected[name]) {
                                if (this.preSelect[name] === true) {
                                    newObj[name] = true;
                                }
                                this.preSelect[name] = false;
                            } else if (this.preSelect[name] !== selected[name] && selected[name] === false) {
                                newObj[name] = true;
                                this.preSelect[name] = true;
                            } else if (this.preSelect[name] !== selected[name] && selected[name] === true) {
                                this.preSelect[name] = true;
                            }
                        }
                        this.selected = newObj;

                        this.metaKey = false;
                        return true;
                    }
                    return false;
                };

                if (!this.myChart) {
                    this.myChart = window
                        .echarts
                        .init(document.getElementById(id), 'shine');
                    this
                        .myChart
                        .on('legendselectchanged', (obj) => {
                            this.selected = obj.selected;
                            // 使用 legendToggleSelect Action 会重新触发 legendselectchanged Event，导致本函数重复运行 使得 无
                            // selected 对象
                            if (this.selected !== undefined) {
                                if (!window.event.metaKey && isFirstUnSelect(this.selected)) {
                                    triggerAction('legendToggleSelect', this.selected);
                                } else {
                                    if (!this.preSelect) {
                                        this.preSelect = {};
                                    }
                                    this.metaKey = true;
                                    savePreSelected(this.selected);
                                }
                            }
                        });
                }

                // 绘制图表
                this.draw(this.bastoptions);
            },

            // 拿到legend
            toGetQuota(quoyaArr) {
                this.legendVal = [];
                this.legendKey = [];
                if (Array.isArray(quoyaArr)) {
                    quoyaArr.forEach((v) => {
                        const temp = {
                            name: v.value,
                            icon: 'rect',
                            key: v.key
                        };
                        this
                            .legendKey
                            .push(v.key);
                        this
                            .legendVal
                            .push(temp);
                    });
                }
            },
            // 构建格式化的数据坐标对象
            toCreateFormatObj() {
                const keys = this.legendKey;
                const len = keys.length;
                const groups = this.groups;
                const groupsLen = groups.length;
                for (let i = 0; i < len; i++) {
                    this.formatDatas[keys[i]] = {};
                    this.suppleformatDatas[keys[i]] = {};
                    this.unityformatDatas[keys[i]] = {};
                    for (let j = 0; j < groupsLen; j++) {
                        this.formatDatas[keys[i]][groups[j].key] = [];
                        this.suppleformatDatas[keys[i]][groups[j].key] = [];
                        this.unityformatDatas[keys[i]][groups[j].key] = [];
                    }
                }
                this.toCreateFormatSubObj();
            },

            // 构建子itemkey数据格式()
            toCreateFormatSubObj() {
                this.formatSubDatas = {};
                const subQuota = this.subQuota;
                for (const key in subQuota) {
                    if (subQuota[key].length > 0) {
                        const len = subQuota[key].length;
                        const subitemkeys = subQuota[key];
                        this.formatSubDatas[key] = {
                            hasSubQuota: true
                        };
                        for (let i = 0; i < len; i++) {
                            this.formatSubDatas[key][subitemkeys[i]] = 0;
                        }
                    }
                }
            },

            toGetLegendData() {
                const data = this.data;
                const allDatasArrLen = data.length;
                this.xAxis.length = 0;
                const xAxis = [];
                for (let i = 0; i < allDatasArrLen; i++) {
                    const item = data[i];
                    const itemKey = item.itemKey;
                    const groupId = item.groupId;
                    this
                        .formatDatas[itemKey][groupId]
                        .push(item);
                    xAxis.push(item.xvalue);
                }
                xAxis.sort((x, y) => x - y);
                this.xAxis = [...new Set(xAxis)].slice();
            },

            // 拿到相应legend的数据
            toGetLegendDatas() {
                const allDatasArr = this.data;
                if (Array.isArray(allDatasArr) && allDatasArr.length) {
                    if (allDatasArr[0].itemKey === this.legendKey[0]) {
                        this.toGetLegendData();
                    } else {
                        alert('数据顺序有误，请检查后在运行程序');
                    }
                }
            },

            toGetGroups() {
                const groups = this.options.groups;
                this.groupIds.length = 0;
                const defaultSelectLabel = this.mianTitleAndId.select.defaultSelectLabel;
                const defaulSelectKey = this.mianTitleAndId.select.defaulSelectKey;

                // 默认用'_$$null'表示 ‘全部’
                this
                    .groupIds
                    .push({key: defaulSelectKey, value: defaultSelectLabel});
                if (Array.isArray(groups)) {
                    groups.forEach((v) => {
                        this
                            .groupIds
                            .push(v);
                    });
                }
                this.groups = this
                    .groupIds
                    .slice();
            },

            toCreateSeries() {
                // 只是根据分类类型分类的数据。 与toGroupingByIdArr的区分在于toGroupingByIdArr还做了groupid的区分
                this.series = [];
                // 几种key？
                const itemkeyCategarires = this.legendKey.length;

                const currentKey = this.select;
                const defaulSelectKey = this.mianTitleAndId.select.defaulSelectKey;

                // 只要不是默认选项，就是用户选择itemkey

                if (currentKey !== defaulSelectKey) {
                    for (let i = 0; i < itemkeyCategarires; i++) {
                        const legendKey = this.legendKey[i];
                        const data = this.unityformatDatas[legendKey][currentKey];
                        const newData = [];
                        for (let vv = 0; vv < data.length; vv++) {
                            const item = {
                                value: 0,
                                other: {}
                            };
                            item.value = data[vv].value / 100;

                            for (const otherk in data[vv].other) {
                                if (data[vv].other.hasOwnProperty(otherk)) {
                                    item[otherk] = data[vv].other[otherk] / 100;
                                }
                            }
                            newData.push(item);
                        }

                        const baseItem = {
                            type: 'line',
                            name: this
                                .legendVal[i]
                                .name,
                            data: newData
                        };

                        this
                            .series
                            .unshift(baseItem);
                    }
                } else {
                    for (let j = 0; j < itemkeyCategarires; j++) {
                        const legendKey = this.legendKey[j];

                        const predata = this.unityformatDatas[legendKey][defaulSelectKey];

                        const baseItem = {
                            type: 'line',
                            name: this
                                .legendVal[j]
                                .name,
                            data: predata
                        };

                        this
                            .series
                            .unshift(baseItem);
                    }
                }
            },

            toCreatebastoptions(tempseries) {
                const xAxis = this.unityformatDatas.xAxis; // 默认的使用初始化好的
                const series = tempseries || this.series;

                const legendVal = this.legendVal;

                this.bastoptions = {
                    backgroundColor: '#fff',
                    tooltip: {
                        trigger: 'axis',
                        formatter: (a) => {
                            const len = a.length;
                            let str = `${a[0].name}<br>`;
                            for (let i = 0; i < len; i++) {
                                str += `${a[i]
                                    .marker} ${a[i]
                                    .seriesName} ${a[i]
                                    .data
                                    .value}<br>`;
                                if (a[i].data.other) {
                                    for (const xx in a[i].data.other) {
                                        if (a[i].data.other.hasOwnProperty(xx) && a[i].data.other[xx]) {
                                            str += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${a[i]
                                                .marker} ${xx} ${a[i]
                                                .data
                                                .other[xx]}<br>`;
                                        }
                                    }
                                }
                            }
                            return str;
                        },
                        axisPointer: {
                            type: 'none'
                        },

                        borderColor: 'rgb(51, 152, 219)',
                        borderWidth: 1,
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        textStyle: {
                            color: '#666',
                            fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                            fontSize: '12px/18px'
                        },
                        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
                    },
                    legend: {
                        data: legendVal,
                        show: true,
                        bottom: 0,
                        orient: 'horizontal',
                        type: 'scroll'
                    },
                    grid: {
                        top: '6%',
                        left: '1%',
                        right: '2%',
                        bottom: '12%',
                        containLabel: true
                    },

                    xAxis: {
                        type: 'category',
                        data: xAxis,
                        axisLabel: {
                            textStyle: {
                                color: '#8492A6'
                            }
                        },
                        offset: 4,
                        boundaryGap: ['20%', '20%']
                    },
                    yAxis: {
                        axisLabel: {
                            textStyle: {
                                color: '#8492A6'
                            }
                        },
                        type: 'value',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'dotted'
                            }
                        }
                    },
                    series
                };

                return this.bastoptions;
            },
            selected(item) {
                const value = item.value;
                this.toCreateSeries(value);
                const bastoptions = this.toCreatebastoptions();
                // 绘制图表
                this.draw(bastoptions);
            },

            draw(tempdata) {
                this
                    .myChart
                    .setOption(tempdata, true);
            },

            createLineOption() {
                /**
                 *--------------------------------------
                 *
                 * 这个方法结束后:
                 *            this.groupIds=[{key:'_$null',value:'全部'},.....]
                 *
                 *
                 *--------------------------------------
                 */

                /**
                 *--------------------------------------
                 *
                 *  按照itemkey初始化
                 *
                 *                   this.legendKey = [...];
                 *                   用来显示切换button
                 *                   this.legendVal = [{..},...];
                 *
                 *--------------------------------------
                */
                this.toGetQuota(this.quota);
                /**
             *--------------------------------------
             *
             * 初始化 this.formatDatas[itemKey]，为toGetLegendDatas方法做前置准备
             *            this.formatDatas[itemKey][groupid] = [];
             *
             *--------------------------------------
            */
                this.toCreateFormatObj();
                /**
                 *--------------------------------------
                 *
                 * 解析出概览数据,这个方法结束后:
                 * now
                 *            this.formatDatas[itemKey][groupid] =[...] 是根据itemKey填的数据
                 *            this.Axis = [....]  是根据毫秒去重后的
                 *
                 *
                 *
                 *--------------------------------------
                 */
                this.toGetLegendDatas();

                /**
                *  全部横坐标补全
                *   this.suppleformatDatas
                *
                */
                this.supplementData();

                /**
                 *
                 *   给option加上全部这一项
                 */
                // this.toGetGroups();
                /**
                 *
                 *  先格式化x轴，
                 *
                 */
                this.toCreatexAxis2();
                this.unityformatDataF();
                this.uniqxAxis();
                this.toCalTotal();
                // 此时的横坐标已经格式化过了 添加用户选择框的options
                this.toGetGroups();

                this.toCreateSeries();
                // 导出echarts基本数据配置
                this.bastoptions = this.toCreatebastoptions();
                return this.bastoptions;
            },
            uniqxAxis() {
                this.unityformatDatas.xAxis = [...new Set(this.suppleformatDatas.xAxis)];
            },

            // 补全数据，
            supplementData() {
                const legendKeyLen = this.legendKey.length;
                const xAxis = this
                    .xAxis
                    .slice();
                while (xAxis.length > 0) {
                    for (let j = 0; j < legendKeyLen; j++) {
                        const key = this.legendKey[j];
                        const keyitem = this.formatDatas[key];
                        for (let i = 0; i < this.groups.length; i++) {
                            const groupid = this
                                .groups[i]
                                .key;

                            if (keyitem[groupid].length && keyitem[groupid][0].xvalue === xAxis[0]) {
                                // 处理subitem的情况，即，相同的xvalue，itemkey，groupid，但yvalue不同。
                                const itemKey = keyitem[groupid][0].itemKey;
                                const dupxvalue = keyitem[groupid][0].xvalue;
                                const other = {};

                                const temp = {
                                    xvalue: dupxvalue,
                                    yvalue: keyitem[groupid][0].yvalue * 100,
                                    itemKey: keyitem[groupid][0].itemKey,
                                    groupId: keyitem[groupid][0].groupId,
                                    subItem: keyitem[groupid][0].subItem
                                };

                                if (this.subQuota[itemKey] && this.subQuota[itemKey].length) {
                                    const itemKeyLen = this
                                        .subQuota[itemKey]
                                        .length;
                                    for (let k = 0; k < itemKeyLen; k++) {
                                        other[this.subQuota[itemKey][k]] = 0;
                                    }

                                    temp.other = other;
                                    temp.other[keyitem[groupid][0].subItem] = keyitem[groupid][0].yvalue * 100;
                                }

                                keyitem[groupid].shift();

                                while (keyitem[groupid].length && keyitem[groupid][0].xvalue === dupxvalue) {
                                    temp.yvalue += keyitem[groupid][0].yvalue * 100;
                                    if (temp.other) {
                                        temp.other[keyitem[groupid][0].subItem] += keyitem[groupid][0].yvalue * 100;
                                    }
                                    // temp.other[keyitem[groupid][0].subItem] += keyitem[groupid][0].yvalue;
                                    // 这一步可能不必要，因为相同的groupid、keyitem下，xvalue不同，一定是subQuota不同

                                    keyitem[groupid].shift();
                                }

                                this
                                    .suppleformatDatas[key][groupid]
                                    .push(temp);

                                // 没有这个时间的值，就默认给个0
                            } else {
                                this
                                    .suppleformatDatas[key][groupid]
                                    .push(
                                        {groupId: groupid, itemKey: key, xvalue: xAxis[0], yvalue: 0, subItem: undefined}
                                    );
                            }
                        }
                    }
                    xAxis.shift();
                }
            },

            toCreatexAxis2() {
                const xAxisArr = this
                    .xAxis
                    .slice();

                const xAxisArrLen = xAxisArr.length;
                if (!xAxisArrLen) {
                    alert('服务器返回数据有误，请检查x轴数据');
                    return;
                }

                this.uniqxAxisArr = xAxisArr;
                this.uniqxAxisArrLen = this.uniqxAxisArr.length;

                /**
                 *
                 *  假如type=1，那么无论哪种情况都是按照天显示
                 *  type=0，显示跟查询时间有关，一天内按照小时显示，超过一天按照天归并显示
                 *
                 *  注意跨天的24小时内的问题，跨天了直接按照天显示
                 *
                 */

                if (this.type === 1) {
                    this.suppleformatDatas.xAxis = this
                        .uniqxAxisArr
                        .map(v => formatDateTime(v, 2));
                } else if (this.type === 0) {
                    const maxTempstamp = xAxisArr[xAxisArrLen - 1];
                    const minTempstamp = xAxisArr[0];
                    const subTempstamp = maxTempstamp - minTempstamp;
                    const isMoreThan1Day = Math.floor(((((subTempstamp / 1000) / 60) / 60) / 24));
                    const maxFormatTempstamp = formatDateTime(maxTempstamp, 2);
                    const minFormatTempstamp = formatDateTime(minTempstamp, 2);

                    if (isMoreThan1Day || maxFormatTempstamp !== minFormatTempstamp) {
                        this.type = 1;
                        this.toCreatexAxis2(xAxisArr);
                        this.type = 0;
                        return;
                    }

                    this.suppleformatDatas.xAxis = this
                        .uniqxAxisArr
                        .map(v => formatDateTime(v, 3));
                }
            },
            unityformatDataF() {
                const xAxis = this
                    .suppleformatDatas
                    .xAxis
                    .slice();
                let befval = xAxis.shift();
                let time = 1;

                while (xAxis.length) {
                    if (xAxis[0] === befval) {
                        time++;
                        xAxis.shift();
                    } else {
                        this.unityformatDataC(time);
                        befval = xAxis[0];
                        time = 1;
                        xAxis.shift();
                    }
                }
                this.unityformatDataC(time);
            },
            unityformatDataC(num) {
                const legendKeyLen = this.legendKey.length;
                const defaulSelectKey = this.mianTitleAndId.select.defaulSelectKey;
                for (let j = 0; j < legendKeyLen; j++) {
                    const key = this.legendKey[j];
                    const keyitem = this.suppleformatDatas[key];
                    this.unityformatDatas[key][defaulSelectKey] = [];
                    for (let i = 0; i < this.groups.length; i++) {
                        const groupid = this
                            .groups[i]
                            .key;
                        let total = 0;
                        const obj = {
                            value: 0
                        };

                        if (num > 1) {
                            const other = {};
                            const subitemarr = this.subQuota[key];

                            const keylen = Array.isArray(subitemarr)
                                ? subitemarr.length
                                : 0;
                            for (let w = 0; w < keylen; w++) {
                                other[subitemarr[w]] = 0;
                            }
                            for (let k = 0; k < num; k++) {
                                const item = keyitem[groupid].shift();

                                if (item.hasOwnProperty('other')) {
                                    for (let w = 0; w < keylen; w++) {
                                        // 有错
                                        other[subitemarr[w]] += item.other[subitemarr[w]];
                                    }
                                }

                                total += item.yvalue;
                            }

                            obj.value = total;
                            obj.other = other;
                            // for (const otherk in obj.other) {     if (obj.other.hasOwnProperty(otherk)) {
                            // obj.other[otherk];     } }
                        } else {
                            obj.value = keyitem[groupid][0].yvalue;
                            keyitem[groupid].shift();
                        }

                        this
                            .unityformatDatas[key][groupid]
                            .push(obj);
                    }
                }
            },
            toCalTotal() {
                const defaulSelectKey = this.mianTitleAndId.select.defaulSelectKey;
                const legendKeyLen = this.legendKey.length;
                const xAxisLen = this.unityformatDatas.xAxis.length;
                for (let j = 0; j < legendKeyLen; j++) {
                    const key = this.legendKey[j];
                    for (let k = 0; k < xAxisLen; k++) {
                        const keyitem = this.unityformatDatas[key];
                        let total = 0;
                        const obj = {
                            value: 0
                        };
                        const other = {};
                        let needtotalother = false;

                        const hassub = this.subQuota[key];

                        if (Array.isArray(hassub) && hassub.length) {
                            needtotalother = true;
                            for (let w = 0; w < hassub.length; w++) {
                                other[hassub[w]] = 0;
                            }
                        }

                        for (let i = 0; i < this.groups.length; i++) {
                            const groupid = this
                                .groups[i]
                                .key;
                            if (needtotalother && keyitem[groupid][k].other) {
                                for (let w = 0; w < hassub.length; w++) {
                                    other[hassub[w]] += keyitem[groupid][k].other[hassub[w]];
                                }
                            }

                            total += keyitem[groupid][k].value;
                        }

                        for (const otherk in other) {
                            if (other.hasOwnProperty(otherk)) {
                                other[otherk] /= 100;
                            }
                        }

                        if (needtotalother) {
                            obj.other = other;
                        }

                        obj.value = total / 100;
                        this
                            .unityformatDatas[key][defaulSelectKey]
                            .push(obj);
                    }
                }
            }
        }
    };
</script>
<style lang="scss">
    .data-preview {
        background: #FFF;
        box-shadow: 0 2px 11px 0 rgba(190,202,218,.17);
        border: 2px #FFF solid;
        border-radius: 3px;
        padding: 14px 20px;
        width: 46%;
        float: left;
        margin-left: 20px;
        margin-bottom: 20px;
    }
    .data-preview:hover {
        border: 2px solid #3AD1C5;
    }
    .widget-topbar {
        cursor: move;
        width: 100%;
    }
    .sa-echarts-tooltip-triangle.top {
        left: calc(50% - 2.5px);
        top: -5px;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #3398DB;
    }
    .overview {
        display: flex;
        padding: 4px;
        justify-content: space-between;
        align-items: center;
        font-family: 'Roboto','Helvetica Neue',Helvetica,Arial,sans-serif;
        .section1 {
            display: flex;
            align-content: center;
            flex-direction: column;
            justify-content: center;
            .today {
                text-align: left;
                font-size: 40px;
                font-weight: 600;
                height: 30px;
                line-height: 30px;
                font-family: 'Tangerine', serif;
                display: flex;
                align-items: center;
                margin-right: 20px;
                color: #475669;
                padding: 0;
                margin: 0;
                position: relative;
                .unit {
                    font-size: 12px;
                    vertical-align: bottom;
                    position: absolute;
                    bottom: -6px;
                    left: 20px;
                }
            }
            .compYesterday {
                font-size: 12px;
                position: relative;
                .up {
                    color: #2DCA93;
                    position: relative;
                    padding-left: 10px;
                    &::before {
                        position: absolute;
                        content: "";
                        width: 0;
                        height: 0;
                        border-top: 4px solid transparent;
                        border-right: 4px solid transparent;
                        border-bottom: 8px solid #2DCA93;
                        border-left: 4px solid transparent;
                        left: -2px;
                    }

                }
                .down {
                    color: #FC6772;
                    position: absolute;
                    top: -4px;
                    left: -7px;
                    &::before {
                        position: absolute;
                        content: "";
                        width: 0;
                        height: 0;
                        border-top: 8px solid #FC6772;
                        border-right: 4px solid transparent;
                        border-bottom: 4px solid transparent;
                        border-left: 4px solid transparent;
                        left: -2px;
                    }
                }
            }
        }
        .section2 {
            display: flex;
            flex-direction: row;
            height: 40px;
            padding: 2px;
            box-sizing: border-box;
            .descl,
            .descr {
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                padding-right: 4px;
                p {
                    span {
                        min-width: 66px;
                        clear: left;
                        float: left;
                        text-align: right;
                        padding-right: 2px;
                    }
                }
            }
            .descl {
                border-right: 1px solid #8492A6;
            }

        }
    }
</style>