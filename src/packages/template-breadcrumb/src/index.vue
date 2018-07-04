<template>
    <div class="header">
        <nb-tooltip content="bottom 文字提示" placement="bottom">
            <div class="activity-title">猜世界杯赢百万现金红包</div>
        </nb-tooltip>

        <nb-tag color="blue">
            切换活动</nb-tag>
    </div>
</template>

<script>
    import { Breadcrumb, BreadcrumbItem } from '@u51/miox-vant';

    export default {
        components: {
            'nb-breadcrumb': Breadcrumb,
            'nb-breadcrumb-item': BreadcrumbItem,
        },
        data() {
            return {};
        },
        props: {
            breadPath: { // 面包屑路径数据
                default: [],
            },
        },
        computed: {},
        methods: {
            breadClick(item) {
                if (item.type === 'view') {
                    this.$push(item.uri);
                }
            },
        },
    };
</script>
<style src="./index.scss" lang="sass" scoped="scoped"></style>