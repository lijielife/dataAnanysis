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
            :visible="showChangeActivityModel"
            title="切换活动"
            :confirm-loading="loading4showChangeActivityModel"
            modal-style="top:10px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
                <nb-input placeholder="输入活动名称" size="large">
                    <nb-icon type="search" slot="prefix"></nb-icon>
                </nb-input>
                <nb-button
                    :loading="loading4showChangeActivityModel"
                    @click="toserch"
                    type="primary">搜索</nb-button>
            </div>
            <nb-table
                :data="asyncTable"
                border="border"
                :scroll="{ y: 300,x:484 }"
                :columns="columns"
                show-scrollbar="show-scrollbar"></nb-table>
                <div slot="footer">

                </div>

        </nb-modal>
    </div>
</template>

<script>
    import { Breadcrumb, BreadcrumbItem } from '@u51/miox-vant';
    import { formatDateTime } from '../../../utils/helpers';

    export default {
        components: {
            'nb-breadcrumb': Breadcrumb,
            'nb-breadcrumb-item': BreadcrumbItem,
        },
        data() {
            return { headerDatas: {},
                content: '',
                showChangeActivityModel: false,
                loading4showChangeActivityModel: false,
                asyncTable: [],
                columns: [
                    {
                        label: '活动ID',
                        prop: 'id',
                        width: 40,
                    },
                    {
                        label: '活动名称',
                        prop: 'name',
                        width: 40,
                    },
                    {
                        label: '活动时间',
                        prop: 'time',
                        width: 40,
                    },
                    {
                        label: '创建人',
                        prop: 'owner',
                        width: 100,
                    },
                ] };
        },

        props: {
            breadPath: { // 面包屑路径数据
                default: [],
            },
        },
        created() {
            this.initial();
        },
        computed: {},
        methods: {
            toserch() {

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