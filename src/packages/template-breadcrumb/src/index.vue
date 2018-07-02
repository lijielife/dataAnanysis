<template>
    <nb-breadcrumb style="height: 50px;line-height: 50px;">
        <nb-breadcrumb-item 
            name="首页"  
            style="cursor:pointer"
            class="view"
            @click.native="breadClick({name: '首页', type: 'view', uri: '/'})"
        >
        </nb-breadcrumb-item>
        <template v-if="breadPath && breadPath.length">
            <nb-breadcrumb-item  
                v-for="item in breadPath" 
                :key="item.uri" 
                :name="item.name"
                @click.native="breadClick(item)" 
                style="cursor:pointer"
                :class="{view: item.type === 'view', menu: item.type === 'menu'}"
            >
            </nb-breadcrumb-item>
        </template>
    </nb-breadcrumb>
</template>

<script>
    import { Breadcrumb, BreadcrumbItem } from '@u51/miox-vant';

    export default {
        components: {
            'nb-breadcrumb': Breadcrumb,
            'nb-breadcrumb-item': BreadcrumbItem,
        },
        data() {
            return {

            };
        },
        props: {
            breadPath: { // 面包屑路径数据
                default: [],
            },
        },
        computed: {
    
        },
        methods: {
            breadClick(item) {
                if (item.type === 'view') {
                    this.$push(item.uri);
                }
            },
        },
    };
</script>
<style src="./index.scss" lang="sass" scoped></style>