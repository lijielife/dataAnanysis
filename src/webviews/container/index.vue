<template>
    <system-layout 
        :layout-type="2"
        system-name="51运营数据" 
        @memuStatusChange="menuStatusChange" 
        :class="{ closed_menu: !isMenuOpen, opened_menu: isMenuOpen, hiden_sub_menu: isHideInlieSubmenu }"
    >
        <system-userInfo 
            slot="userInfo"
            :userInfo="userInfo"
        ></system-userInfo>
        <nb-layout class="page-container" ref="container" slot="pageContent">
            
        </nb-layout>
        <!--<system-tabs
            slot="tabs"
            :tabList="tabList"
            @delTab="delTab"
            @delAllTab="delAllTab"
        ></system-tabs>-->
        <system-menu 
            ref="systemMenu"
            slot="menu" 
            :menus="menus" 
            :mode="isMenuOpen ? 'inline' : 'vertical'"
            :selectKey="menuSelectKey"
            @menuChange="syetemMenuChange"
        >
        </system-menu>
        <system-breadcrumb 
            slot="breadcrumb" 
            :breadPath="breadPath" 
        >
        </system-breadcrumb>
    </system-layout>
</template>

<script>
import '@u51/miox-vant/packages/style/index.less';
import { Component, life } from 'miox-vue2x-classify';
import { mapActions, mapGetters } from 'vuex';
import Engine from 'miox-vue2x';
import store from '../../webstore/index';
import templateLayout from '../../packages/template-layout';
import templateMenu from '../../packages/template-menu';
import templateUserInfo from '../../packages/template-userInfo';
import templateBreadcrumb from '../../packages/template-breadcrumb';
import templateTabs from '../../packages/template-tabs';
import './index.less';

@Component({
    store,
    components: {
        'system-layout': templateLayout,
        'system-menu': templateMenu,
        'system-userInfo': templateUserInfo,
        'system-breadcrumb': templateBreadcrumb,
        'system-tabs': templateTabs,
    },
    methods: {
        ...mapActions([
            'getUserInfo',
            'getMenus',
        ]),
        menuStatusChange(menuCollapsed) {
            if (menuCollapsed === false) {
                // debugger;
                this.$refs.systemMenu.$refs.menu.toggleAllSubmenu(false);
            }
            this.$store.commit('setMenuStatus', menuCollapsed);

            // 处理悬浮菜单闪现的问题
            this.$store.commit('setHideInlieSubmenuStatus', true);
            setTimeout(() => {
                this.$store.commit('setHideInlieSubmenuStatus', false);
            }, 500);
        },
        async delTab(key) {
            this.$store.commit('delTab', key);
        },
        async delAllTab() {
            this.$store.commit('delALLTab');
        },
    },
    computed: {
        ...mapGetters({
            menus: 'getMenus',
            isMenuOpen: 'getMenuStatus',
            menuSelectKey: 'getMenuSelectKey',
            userInfo: 'getUserInfo',
            breadPath: 'getBreadcrumb',
            tabList: 'getTabList',
            isHideInlieSubmenu: 'getHideInlieSubmenuStatus',
        }),
    },
})
export default class Wrap extends Engine.WebView {
    @life mounted() {
        // 异步获取用户信息和菜单信息
        this.getMenus();
        this.getUserInfo();

        // 监听全屏事件
        document.addEventListener('fullscreenchange', () => {
            this.$store.commit('changeFullScreenState');
        });
        document.addEventListener('mozfullscreenchange', () => {
            this.$store.commit('changeFullScreenState');
        });
        document.addEventListener('webkitfullscreenchange', () => {
            this.$store.commit('changeFullScreenState');
        });
        document.addEventListener('msfullscreenchange', () => {
            this.$store.commit('changeFullScreenState');
        });
    }
    get mioxContainerElement() {
        return this.$refs.container.$el;
    }
    redirect(url) {
        this.$push(url);
    }
    syetemMenuChange(val) {
        this.$store.commit('setMenuSelectKey', val);
        this.$store.commit('setBreadcrumb', val);
        this.$store.commit('setTabList', val);
    }
}
</script>