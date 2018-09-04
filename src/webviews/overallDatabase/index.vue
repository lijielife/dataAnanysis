<template>
    <div>
        <div
            class="tabs-container ibox-content clearfix"
            style="padding:0;position: relative;">
            <div class="times">
                <h3>{{dptitle}}
                    <a class="reflash" style="margin-left: 10px;" @click="reflash">
                        <svg class="iconn" aria-hidden="true">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-s1"></use>
                        </svg>
                        <span style="margin-left: -2px;">立即刷新</span>
                    </a>

                    <div class="col-xs-3 nopadding date" style="width:auto;float:right">
                        <nb-select
                            v-model="select"
                            style="margin-right:10px;"
                            notInjectToBody="notInjectToBody">
                            <nb-option :value="option[index]" v-for="(item,index) in option" :key="index">{{option[index]}}
                            </nb-option>
                        </nb-select>
                    </div>
                </h3>
            </div>
            <ul class="nav nav-tabs" id="dsbdnums">
                <li class="ds-head ds-tag" :title="v.name" v-for="(v,k) in items" :key="k" @click="changeline($event,v.itemKeys)">
                    <svg class="icon" aria-hidden="true">
                        <use
                            name="deltag"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            xlink:href="#icon-cuowuXX">
                            <svg id="icon-s1" viewBox="0 0 16 16" width="100%" height="100%">
                                <!--<path d="M1.072,7.176c0-3.376,2.76-6.112,6.164-6.112-->
                                <!--c3.405,0,6.164,2.736,6.164,6.112s-2.759,6.112-6.164,6.112C3.832,13.288,1.072,10.552,1.072,7.176L1.072,7.176z
                                M11.782,12.758-->
                                <!--L15.053,16L16,15.06l-3.257-3.23c1.077-1.253,1.729-2.878,1.729-4.653C14.472,3.213,11.232,0,7.236,0S0,3.213,0,7.176-->
                                <!--s3.239,7.175,7.236,7.175C8.958,14.351,10.54,13.754,11.782,12.758L11.782,12.758z"></path>-->
                                <path
                                    d="M11.901,7.016 C11.954,7.338 12.000,7.663 12.000,8.000 C12.000,11.314 9.314,14.000 6.000,14.000 C2.686,14.000 -0.000,11.314 -0.000,8.000 C-0.000,4.689 2.682,2.006 5.991,2.001 L5.991,0.003 L9.990,3.000 L5.991,5.997 L5.991,4.001 C3.786,4.006 2.000,5.794 2.000,8.000 C2.000,10.209 3.791,12.000 6.000,12.000 C8.209,12.000 10.000,10.209 10.000,8.000 C10.000,7.775 9.969,7.559 9.934,7.344 L11.901,7.016 Z"
                                    class="cls-1"></path>
                            </svg>
                        </use>
                    </svg>
                    <a data-toggle="tab" href="#tab-0" aria-expanded="false">
                        <div class="ds-title">{{v.name}}</div>
                        <div>
                            <span class="ds-num1" :id="v.tpid">0</span>
                            <span class="ds-num1 ds-tp"></span>
                        </div>
                        <div class="ds-num2">
                            <span>{{v.monthTotal}}:</span>
                            <span :id="v.leijiid">0</span>
                            <span class="ds-tp"></span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <div style="width:100%;padding:10px;height:333px;position:relative;left:-20px">

            <data-analysis
                style="width:100%;"
                :mianTitleAndId="mianTitleAndId"
                :timeranger="copytimeranger"></data-analysis>
        </div>

        <div
            class="tabs-container ibox-content clearfix"
            style="padding:0;position: relative;">
            <div class="times">
                <h3>活动列表
                    <div class="col-xs-3 nopadding date" style="width:auto;float:right"></div>
                </h3>
            </div>
            <nb-table
                :data="table.data"
                border="border"
                :scroll="{ y: 500 }"
                :columns="table.heads"
                show-scrollbar="show-scrollbar"></nb-table>
        </div>

    </div>

</template>
<script>
    const CountUp = function (target, startVal, endVal, decimals, duration, options) {

        var self = this;
        self.version = function () {
            return '1.9.3';
        };

        // default options
        self.options = {
            useEasing: true, // toggle easing
            useGrouping: true, // 1,000,000 vs 1000000
            separator: ',', // character to use as a separator
            decimal: '.', // character to use as a decimal
            easingFn: easeOutExpo, // optional custom easing function, default is Robert Penner's easeOutExpo
            formattingFn: formatNumber, // optional custom formatting function, default is formatNumber above
            prefix: '', // optional text before the result
            suffix: '', // optional text after the result
            numerals: [] // optionally pass an array of custom numerals for 0-9
        };

        // extend default options with passed options object
        if (options && typeof options === 'object') {
            for (var key in self.options) {
                if (options.hasOwnProperty(key) && options[key] !== null) {
                    self.options[key] = options[key];
                }
            }
        }

        if (self.options.separator === '') {
            self.options.useGrouping = false;
        } else {
            // ensure the separator is a string (formatNumber assumes this)
            self.options.separator = '' + self.options.separator;
        }

        // make sure requestAnimationFrame and cancelAnimationFrame are defined polyfill
        // for browsers without native support by Opera engineer Erik Möller
        var lastTime = 0;
        var vendors = ['webkit', 'moz', 'ms', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }

        function formatNumber(num) {
            var neg = (num < 0),
                x,
                x1,
                x2,
                x3,
                i,
                len;
            num = Math
                .abs(num)
                .toFixed(self.decimals);
            num += '';
            x = num.split('.');
            x1 = x[0];
            x2 = x.length > 1
                ? self.options.decimal + x[1]
                : '';
            if (self.options.useGrouping) {
                x3 = '';
                for (i = 0, len = x1.length; i < len; ++i) {
                    if (i !== 0 && ((i % 3) === 0)) {
                        x3 = self.options.separator + x3;
                    }
                    x3 = x1[len - i - 1] + x3;
                }
                x1 = x3;
            }
            // optional numeral substitution
            if (self.options.numerals.length) {
                x1 = x1.replace(/[0-9]/g, function (w) {
                    return self
                        .options
                        .numerals[+w];
                })
                x2 = x2.replace(/[0-9]/g, function (w) {
                    return self
                        .options
                        .numerals[+w];
                })
            }
            return (
                neg
                    ? '-'
                    : ''
            ) + self.options.prefix + x1 + x2 + self.options.suffix;
        }
        // Robert Penner's easeOutExpo
        function easeOutExpo(t, b, c, d) {
            return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
        }
        function ensureNumber(n) {
            return (typeof n === 'number' && !isNaN(n));
        }

        self.initialize = function () {
            if (self.initialized) 
                return true;
            
            self.error = '';
            self.d = (typeof target === 'string')
                ? document.getElementById(target)
                : target;
            if (!self.d) {
                self.error = '[CountUp] target is null or undefined'
                return false;
            }
            self.startVal = Number(startVal);
            self.endVal = Number(endVal);
            // error checks
            if (ensureNumber(self.startVal) && ensureNumber(self.endVal)) {
                self.decimals = Math.max(0, decimals || 0);
                self.dec = Math.pow(10, self.decimals);
                self.duration = Number(duration) * 1000 || 2000;
                self.countDown = (self.startVal > self.endVal);
                self.frameVal = self.startVal;
                self.initialized = true;
                return true;
            } else {
                self.error = '[CountUp] startVal (' + startVal + ') or endVal (' + endVal + ') ' +
                        'is not a number';
                return false;
            }
        };

        // Print value to target
        self.printValue = function (value) {
            var result = self
                .options
                .formattingFn(value);

            if (self.d.tagName === 'INPUT') {
                this.d.value = result;
            } else if (self.d.tagName === 'text' || self.d.tagName === 'tspan') {
                this.d.textContent = result;
            } else {
                this.d.innerHTML = result;
            }
        };

        self.count = function (timestamp) {

            if (!self.startTime) {
                self.startTime = timestamp;
            }

            self.timestamp = timestamp;
            var progress = timestamp - self.startTime;

            self.remaining = self.duration - progress;

            // to ease or not to ease
            if (self.options.useEasing) {
                if (self.countDown) {
                    self.frameVal = self.startVal - self
                        .options
                        .easingFn(progress, 0, self.startVal - self.endVal, self.duration);
                } else {
                    self.frameVal = self
                        .options
                        .easingFn(progress, self.startVal, self.endVal - self.startVal, self.duration);
                }
            } else {
                if (self.countDown) {
                    self.frameVal = self.startVal - (
                        (self.startVal - self.endVal) * (progress / self.duration)
                    );
                } else {
                    self.frameVal = self.startVal + (self.endVal - self.startVal) * (
                        progress / self.duration
                    );
                }
            }

            // don't go past endVal since progress can exceed duration in the last frame
            if (self.countDown) {
                self.frameVal = (self.frameVal < self.endVal)
                    ? self.endVal
                    : self.frameVal;
            } else {
                self.frameVal = (self.frameVal > self.endVal)
                    ? self.endVal
                    : self.frameVal;
            }

            // decimal
            self.frameVal = Math.round(self.frameVal * self.dec) / self.dec;

            // format and print value
            self.printValue(self.frameVal);

            // whether to continue
            if (progress < self.duration) {
                self.rAF = requestAnimationFrame(self.count);
            } else {
                if (self.callback) 
                    self.callback();
                }
            };
        // start your animation
        self.start = function (callback) {
            if (!self.initialize()) 
                return;
            self.callback = callback;
            self.rAF = requestAnimationFrame(self.count);
        };
        // toggles pause/resume animation
        self.pauseResume = function () {
            if (!self.paused) {
                self.paused = true;
                cancelAnimationFrame(self.rAF);
            } else {
                self.paused = false;
                delete self.startTime;
                self.duration = self.remaining;
                self.startVal = self.frameVal;
                requestAnimationFrame(self.count);
            }
        };
        // reset to startVal so animation can be run again
        self.reset = function () {
            self.paused = false;
            delete self.startTime;
            self.initialized = false;
            if (self.initialize()) {
                cancelAnimationFrame(self.rAF);
                self.printValue(self.startVal);
            }
        };
        // pass a new endVal and start animation
        self.update = function (newEndVal) {
            if (!self.initialize()) 
                return;
            newEndVal = Number(newEndVal);
            if (!ensureNumber(newEndVal)) {
                self.error = '[CountUp] update() - new endVal is not a number: ' +
                        newEndVal;
                return;
            }
            self.error = '';
            if (newEndVal === self.frameVal) 
                return;
            cancelAnimationFrame(self.rAF);
            self.paused = false;
            delete self.startTime;
            self.startVal = self.frameVal;
            self.endVal = newEndVal;
            self.countDown = (self.startVal > self.endVal);
            self.rAF = requestAnimationFrame(self.count);
        };

        // format startVal on initialization
        if (self.initialize()) 
            self.printValue(self.startVal);
        };
    import dataAnalysis from '../../packages/template-line-chart/index.vue';
   import { formatDateTime } from '../../utils/helpers';
    export default {
        components: {
            'data-analysis': dataAnalysis
        },
        watch: {
            items() {
                this.animation4num();
            },
            select(next) {
                const zb = this
                    .option
                    .indexOf(next);
                this.overalldapan(this.optionzb[zb]);
            },
            mianTitleAndId(){
                console.log('变了')
            },
        },
        created() {
           
            this.overalldapan();
        },
        methods: {
            changeline:function(e,itemKeys){
                var nmianTitleAndId = {
                    ...this.mianTitleAndId,
                };
               
                if(itemKeys){
                    this.mianTitleAndId = {
                        ...nmianTitleAndId,
                        "path":this.mianTitleAndId.basepath + 'itemKeys=' + itemKeys + "&plate=" + this.plate,
                        "itemKeys": itemKeys,
                    }
                }
              
            },
            count: function (target, startVal, endVal, decimals, duration, options) {
                new CountUp(target, startVal, endVal, decimals, duration, options);
            },
            overalldapan: function (plate = 'entire') {
                this.plate = plate;
                axios
                    .get(
                        `${window.$$commonPath}/api/v1/manager/effect/summary/dapan?plate=${plate}`,
                        {
                            // baseURL: window.$$domain,
                            headers: {
                                Authorization: window.$$Authorization
                            }
                        }
                    )
                    .then((res) => {
                        if (res.code == 0) {
                            for (let i = 0; i < res.data.items.length; i++) {

                                res
                                    .data
                                    .items[i]
                                    .tpid = 'tp' + i;
                                res
                                    .data
                                    .items[i]
                                    .leijiid = 'leiji' + i;
                            }
                            this.dptitle = res.data.title;
                            this.items = res
                                .data
                                .items
                                .slice();
                            this.table.heads = res.data.table.heads;
                            var tabledatas = [];
                            for (let i = 0; i < res.data.table.data.length; i++) {
                                const line = res
                                    .data
                                    .table
                                    .data[i]
                                    .line;
                                const item = {};
                                for (let j = 0; j < line.length; j++) {
                                    item[line[j].key] = line[j].value;
                                }
                                tabledatas.push(item);
                            }
                            this.table.data = tabledatas;
                            this.copytimeranger = [res.data.start, res.data.end];
                            this.mianTitleAndId.path = this.mianTitleAndId.basepath + 'itemKeys=' + res.data.items[0].itemKeys + "&plate=" + plate;
                            this.mianTitleAndId.itemKeys = res.data.items[0].itemKeys;
                        }

                    })
                    .catch((err) => {})
                },

            animation4num: function () {
                setTimeout(() => {
                    for (let i = 0; i < this.items.length; i++) {
                        new CountUp(this.items[i].tpid, 0, this.items[i].today).start();
                        new CountUp(this.items[i].leijiid, 0, this.items[i].monthVal).start();;
                    }
                });

            },
            reflash() {
                this.overalldapan(this.optionzb[this.select]);
            }
        },
        data() {
            return {
                mianTitleAndId: {
                    mountedId: 'dpcqx',
                    downloadType: 0,
                    haspie: false,
                    hastable: false,
                    itemKeys: 'pv_newreg',
                    select: {
                        tip: '用户群',
                        defaultSelectLabel: '全部',
                        defaulSelectKey: '_$$null'
                    },
                   
                    needgetOverview: true,
                    path: `${window.$$commonPath}/api/v1/manager/effect/summary/curve?`,
                    basepath: `${window.$$commonPath}/api/v1/manager/effect/summary/curve?`,
                    itemKeys:'',
                },
                select: '活动整体数据',
                items: [],
                dptitle: '',
                copytimeranger: [],
                table: {
                    data: [],
                    heads: []
                },
                option: [
                    '活动整体数据 ', '管家活动数据', '金融活动数据', "联名卡活动数据", "理财活动数据"
                ],
                optionzb: ["entire", "gj", "jr", "lmk", "lc"]
            }
        },
    
    }
</script>

<style>

    .ibox-content {
        overflow: hidden;
    }
    .ibox-content {
        clear: both;
    }
    .ibox-content {
        background-color: #ffffff;
        color: inherit;
        padding: 20px 20px 10px;
        box-shadow: 2px 2px 4px #e5e5e5;
        border: 1px solid #e5e5e5;
        /* background-color: #ffffff; */
        /* color: inherit; */
        /* padding: 0 0 10px; */
        /* box-shadow: none; */
        /* border: 0; */
    }
    .times {
        padding-left: 20px;
    }
    .times h3 {
        margin: 12.5px 0;
        font-size: 14px;
        line-height: 30px;
    }
    .times .iconn {
        /* color: #63a5ff; */
        fill: currentColor;
        color: #447ed9;
        font-size: 12px;
        width: 14px;
        height: 14px;
        /* padding-top: 2px; */
        vertical-align: -0.2em;
    }
    svg:not(:root) {
        overflow: hidden;
    }
    .tabs-container .nav-tabs {
        border-bottom: 0;
    }
    .nav-tabs {
        border-bottom: 1px solid #ddd;
    }
    .nav {
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
    }
    ol,
    ul {
        margin-top: 0;
        margin-bottom: 10px;
    }
    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    dir,
    menu,
    ul {
        display: block;
        list-style-type: disc;
        -webkit-margin-before: 1em;
        -webkit-margin-after: 1em;
        -webkit-margin-start: 0;
        -webkit-margin-end: 0;
        -webkit-padding-start: 40px;
    }
    .btn-group-vertical > .btn-group:after,
    .btn-group-vertical > .btn-group:before,
    .btn-toolbar:after,
    .btn-toolbar:before,
    .clearfix:after,
    .clearfix:before,
    .container-fluid:after,
    .container-fluid:before,
    .container:after,
    .container:before,
    .dl-horizontal dd:after,
    .dl-horizontal dd:before,
    .form-horizontal .form-group:after,
    .form-horizontal .form-group:before,
    .modal-footer:after,
    .modal-footer:before,
    .nav:after,
    .nav:before,
    .navbar-collapse:after,
    .navbar-collapse:before,
    .navbar-header:after,
    .navbar-header:before,
    .navbar:after,
    .navbar:before,
    .pager:after,
    .pager:before,
    .panel-body:after,
    .panel-body:before,
    .row:after,
    .row:before {
        display: table;
        content: " ";
    }
    #dsbdnums li.ds-head {
        margin-bottom: 1%;
    }
    #dsbdnums li {
        transform: none;
    }
    .tabs-container .nav-tabs > li {
        float: left !important;
    }
    .nav.nav-tabs li {
        background: none;
        border: none;
    }
    .tabs-container .nav-tabs > li {
        float: left;
        /* margin-bottom: -1px; */
    }
    .pace-done #page-wrapper,
    .pace-done .footer,
    .pace-done .nav-header,
    .pace-done .navbar-static-side,
    .pace-done li.active {
        -webkit-transition: all 0.4s;
        -moz-transition: all 0.4s;
        -o-transition: all 0.4s;
        transition: all 0.4s;
        /* z-index: 11111; */
    }
    .nav-tabs > li {
        float: left;
        margin-bottom: -1px;
    }
    .nav > li {
        position: relative;
        display: block;
    }
    .ds-head {
        text-align: center;
        width: 13.15%;
        font-weight: normal;
        margin-left: 1%;
        min-width: 135px;
    }
    a,
    button,
    div,
    li,
    span {
        transition: all 0.15s;
    }
    li {
        display: list-item;
        text-align: -webkit-match-parent;
    }
    .tabs-container .nav-tabs#dsbdnums > li.active > .icon {
        display: block;
    }
    .ds-head .icon {
        position: absolute;
        right: 6px;
        width: 10px;
        height: 10px;
        top: 6px;
        color: #ccc;
        display: none;
        z-index: 1;
        cursor: pointer;
    }
    svg:not(:root) {
        overflow: hidden;
    }
    .icon {
        width: 24px;
        height: 24px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        color: #666;
        margin: 0 auto;
        text-align: center;
        display: block;
    }
    .tabs-container .nav-tabs#dsbdnums > li:not(.sdsd):hover > a {
        background-color: #fff;
        /* border-top: 0; */
        border: 1px solid #0cba1b;
        border-radius: 0;
    }
    #dsbdnums.nav > li > a {
        color: #666;
        /* padding: 14px 20px 14px 30px; */
        /* padding: 5px 20px 5px 30px; */
        outline: none;
        height: 135px;
        padding: 20px 5px 0;
        border: 1px solid #e5e5e5;
        border-radius: 0;
    }
    .nav-tabs > li > a {
        border-bottom: 0;
        border-right: 1px solid #e7eaec;
        /* border-right: 1px solid #e7eaec; */
        margin-right: 0;
    }
    .nav > li > a {
        position: relative;
        display: block;
        padding: 20px 15px;
    }
    .nav-tabs > li > a {
        color: #A7B1C2;
        font-weight: 600;
        padding: 14px 20px 10px 25px;
    }
    .nav > li > a {
        color: #666;
        /* padding: 14px 20px 14px 30px; */
        /* padding: 5px 20px 5px 30px; */
        outline: none;
        height: 90px;
    }
    .nav-tabs > li > a {
        margin-right: 2px;
        line-height: 1.42857143;
        border: 1px solid transparent;
        border-radius: 4px 4px 0 0;
    }
    .nav > li > a {
        position: relative;
        display: block;
        padding: 10px 15px;
    }
    a,
    button,
    div,
    li,
    span {
        transition: all 0.15s;
    }
    a {
        cursor: pointer;
        color: #428bca;
        text-decoration: none;
        background: 0 0;
    }
    .ds-title {
        white-space: nowrap;
        overflow: hidden;
        padding-bottom: 20px;
        text-overflow: ellipsis;
    }
    .ds-title {
        /* font-size: 16px; */
        /* color: #323232; */
        font-size: 14px;
        color: #333;
        font-weight: 700;
    }
    a,
    button,
    div,
    li,
    span {
        transition: all 0.15s;
    }
    .ds-num2 {
        font-size: 12px;
        color: #666;
        padding-bottom: 20px;
        font-weight: 100;
        padding-top: 10px;
        white-space: nowrap;
        overflow: hidden;
    }
    a,
    button,
    div,
    li,
    span {
        transition: all 0.15s;
    }
    .ds-num1 {
        font-size: 30px;
        color: #447ed9;
        font-weight: 700;
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
    }
</style>