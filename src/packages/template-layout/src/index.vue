<template>
    <div
        class="template_layout"
        v-if="layoutType === 1 || layoutType === 2"
        :class="{ type_one: layoutType === 1 , type_two: layoutType === 2}">
        <nb-layout>
            <nb-layout>
                <nb-sider
                    class="left_menu_wrap"
                    :collapsible="collapsible"
                    :width="sideMenuWidth"
                    :collapsedWidth="55"
                    v-model="collapsed">
                    <nb-header class="layout__side-header left_side">
                        <div class="company_logo">
                            <img :src="logoUrl" alt="公司logo"></div>
                            <h1>{{systemName}}</h1>
                        </nb-header>
                        <slot name="menu">这里是导航菜单</slot>
                    </nb-sider>

                    <nb-content class="right_side">
                        <nb-header>
                            <nb-row :gutter="12">
                                <nb-col :span="12">
                                    <nb-icon type="bars" @click="change"></nb-icon>
                                    <slot name="breadcrumb">这里是面包屑</slot>
                                </nb-col>
                                <nb-col :span="12">
                                    <slot name="userInfo">这里是用户信息</slot>
                                </nb-col>
                            </nb-row>
                        </nb-header>
                        <div>
                            <!--<nb-row> <slot name="tabs">这里是标签页</slot> </nb-row>-->
                        </div>
                        <slot name="pageContent">这里是页面内容</slot>
                    </nb-content>
                </nb-layout>
            </nb-layout>
        </div>
        <div class="template_layout" v-else-if="layoutType === 3">
            1111
        </div>
    </template>

    <script>
        import { Layout, Icon, Button } from '@u51/miox-vant';
        import eventHub, { stretchLayout } from '../../../lib/eventhub';

        export default {
            components: {
                'nb-layout': Layout,
                'nb-header': Layout.Header,
                'nb-footer': Layout.Footer,
                'nb-content': Layout.Content,
                'nb-sider': Layout.Sider,
                'nb-icon': Icon,
                'nb-button': Button,
            },
            data() {
                return { collapsed: false, collapsible: false };
            },
            props: {
                layoutType: { // 布局类型
                    type: Number,
                    default: 1,
                },
                logoUrl: { // 品牌logo
                    type: String,
                    default: 'https://51nbimg.u51.com/c2548d68e3e344fc9b9363fc20cbf1cb.png',
                },
                systemName: { // 系统名称
                    type: String,
                    default: '51NB后台系统',
                },
                sideMenuWidth: { // 左侧菜单宽度
                    type: Number,
                    default: 240,
                },
            },
            methods: {
                change() {
                    this.collapsed = !this.collapsed;
                    this.$emit('memuStatusChange', !this.collapsed);
                    this.$emit('closeAllMenu', false);
                    setTimeout(() => {
                        eventHub.$emit(stretchLayout);
                    }, 1000);
                },
            },
            mouted() {
                console.log(Layout);
            },
        };
    </script>
    <style src="./index.scss" lang="sass"></style>