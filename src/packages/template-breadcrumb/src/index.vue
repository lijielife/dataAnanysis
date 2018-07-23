<template>
    <div class="header">
        <nb-tooltip :content="content" placement="bottom-start">
            <div class="activity-title">{{headerDatas.name}}</div>
            <template slot="content">
                <p>
                    负责人:&nbsp;{{headerDatas.modifyUser}}</p>
                <p>
                    活动时间:&nbsp;{{ toformatDateTime(headerDatas.startTime) }}~{{ toformatDateTime(headerDatas.endTime) }}
                </p>
            </template>
        </nb-tooltip>

        <nb-tag
            color="blue"
            style="cursor:pointer"
            @click.native="open4showChangeActivityModel">
            切换活动</nb-tag>
        <nb-modal
            @cancel="closeModal"
            :visible="showChangeActivityModel"
            title="切换活动"
            style="cursor:pointer"
            :modalWidth="modalWidth"
            :confirm-loading="loading4showChangeActivityModel"
            modal-style="top:10px;">
            <div
                style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
                <nb-input placeholder="输入活动名称" size="large" v-model="name">
                    <nb-icon type="search" slot="prefix"></nb-icon>
                </nb-input>
                <nb-button
                    :loading="loading4showChangeActivityModel"
                    @click="toserch"
                    type="primary">搜索</nb-button>
            </div>
            <nb-table
                @click.native="select2go($event)"
                :data="asyncTable"
                border="border"
                :scroll="{ y: 300 }"
                :columns="columns"
                show-scrollbar="show-scrollbar"></nb-table>
            <div slot="footer"></div>
        </nb-modal>
    </div>
</template>

<script>
    import { Breadcrumb, BreadcrumbItem, modal } from '@u51/miox-vant';

    import { formatDateTime } from '../../../utils/helpers';

    export default {
        components: {
            'nb-breadcrumb': Breadcrumb,
            'nb-breadcrumb-item': BreadcrumbItem,
        },
        data() {
            return {
                headerDatas: {},
                content: '',
                showChangeActivityModel: false,
                loading4showChangeActivityModel: false,
                asyncTable: [],
                name: '',
                columns: [],
                modalWidth: 780,
            };
        },

        props: {
            breadPath: { // 面包屑路径数据
                default: [],
            },
        },
        created() {
            this.initial();
        },
        mounted() {
            this.toserch();
        },

        computed: {},
        methods: {
            closeModal() {
                this.showChangeActivityModel = false;
            },
            select2go(e) {
                if (e.target.tagName === 'TD') {
                    const activityId = e
                        .target
                        .parentNode
                        .getElementsByTagName('td')[0]
                        .innerText;

                    this.replaceParamVal('activityId', activityId);
                }
            },
            replaceParamVal(paramName, replaceWith) {
                const re = new RegExp(`(${paramName}=)([^&#]*)`, 'gi');
                const oUrl = window.location.href;
                const nUrl = oUrl.replace(re, `${paramName}=${replaceWith}`);
                window.location = nUrl;
            },

            toserch() {
                const baseURL = `${window.$$commonPath}/api/v1/manager/effect/activity/list`;
                const name = this.name;
                this.loading4showChangeActivityModel = true;
                axios
                    .get(baseURL, {
                        // baseURL: window.$$domain,
                        headers: {
                            Authorization: window.$$Authorization,
                        },
                        params: {
                            name,
                        },
                    })
                    .then((res) => {
                        this.loading4showChangeActivityModel = false;
                        if (res.code === 0) {
                            this.columns = res.data.heads;
                            const tabledatas = [];
                            for (let i = 0; i < res.data.data.length; i++) {
                                const line = res
                                    .data
                                    .data[i]
                                    .line;
                                const item = {};
                                for (let j = 0; j < line.length; j++) {
                                    item[line[j].key] = line[j].value;
                                }
                                tabledatas.push(item);
                            }
                            this.asyncTable = tabledatas;
                        }
                    })
                    .catch(() => {
                        modal.warning(
                            { title: '接口暂时不可用，请反馈给开发', content: '<p>前端交互开发:管宇星、胡恩超</p><p>服务端开发：张万华、程云、徐亚军、邓家乐、高翔、郑召玺、娄玉龙</p>' },
                        );
                    });
            },
            open4showChangeActivityModel() {
                this.showChangeActivityModel = true;
            },
            toformatDateTime(timestamp) {
                const res = formatDateTime(timestamp, 100);

                return res;
            },
            initial() {
                const headInfoURL = `${window.$$commonPath}/api/v1/manager/effect/activity/id?id=${window.$$_ActivityId}`;
                /**
              * @augments
              *  头图信息
              */
                window
                    .axios
                    .get(headInfoURL, {
                        // baseURL: window.$$domain,
                        headers: {
                            Authorization: window.$$Authorization,
                        },
                    })
                    .then((resp) => {
                        if (resp.code === 0) {
                            this.headerDatas = resp.data;
                            window.tabelTime = [this.headerDatas.startTime, this.headerDatas.endTime];
                            this.content = `负责人:${this.headerDatas.modifyUser} |`;
                        }
                    });
            },
            breadClick(item) {
                if (item.type === 'view') {
                    this.$push(item.uri);
                }
            },
        },
    };
</script>
<style src="./index.scss" lang="sass" scoped="scoped"></style>