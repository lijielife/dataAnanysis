<template>
    <div class="user-info">
        <nav class="stroke">
            <ul>
                <li>
                    <a href="#">
                        <nb-icon type="question-circle-o"></nb-icon>&nbsp;帮助文档
                    </a>
                </li>
                <li>
                    
                    <a href="#">
                         <nb-icon type="message"></nb-icon>&nbsp;问题反馈</a>
                </li>
            </ul>
        </nav>
        <!-- <div id="user-info__area">
            <nb-dropdown placement="bottom-right" :getPopupContainer="container">
                <div class="user__info">
                    <p class="user__item user__avatar" :style="style"></p>
                    <p class="user__item user__name">{{userName}}</p>
                </div>
                <nb-menu slot="dropdown-menu" @input="_dropdownClick">
                    <nb-menu-item name="info">
                        <icon type="user"></icon>用户信息</nb-menu-item>
                    <nb-menu-item name="logout">
                        <icon type="logout"></icon>退出登录</nb-menu-item>
                </nb-menu>
            </nb-dropdown>
        </div> -->

        <!-- <div class="user-info__tool"> <div @click="handleFullScreen"
        v-if="showFullScreenBtn" class="full-screen-btn-con"> <nb-tooltip
        :content="isFullScreen ? '退出全屏' : '全屏'" placement="bottom"> <i :class="{
        'ion-arrow-expand': !isFullScreen, 'ion-arrow-shrink': isFullScreen}"></i>
        </nb-tooltip> </div> </div> -->
    </div>
</template>
<script>
    import { Component, life, watch, filter } from 'miox-vue2x-classify';
    import BaseMixin from './base/index';

    @Component({
        props: {
            userInfo: {
                type: Object,
                default: {
                    work_no: 'NB1352',
                    name: '后台组',
                },
            },
            showFullScreenBtn: {
                type: Boolean,
                default: true,
            },
        },
        components: {},
        mixins: [BaseMixin],
        computed: {
            isFullScreen() {
                return this.$store.state.isFullScreen;
            },
        },
        methods: {
            // 下拉框点击事件
            _dropdownClick: (type) => {
                switch (type) {
                case 'logout':
                    // 登出
                    const that = this;
                    axios
                        .get('/ssoagentlogin/logoutAndGetLoginUrl')
                        .then(data => window.location.href = data.message);
                    break;
                case 'info':
                    alert('用户信息暂未开发，敬请期待～');
                    break;
                default:
                    break;
                }
            },
            handleFullScreen() {
                this
                    .$store
                    .commit('handleFullScreen');
            },
        },
    })
    export default class Avatar {
        get style() {
            return {
                backgroundImage: this.avatarSrc
                    ? `url(${this.avatarSrc})`
                    : undefined,
                backgroundSize: 'cover',
            };
        }
        get avatarSrc() {
            return `http://work.51.nb/avatar/${this.userInfo.work_no}.png`;
        }
        get userName() {
            return this.userInfo.name;
        }
        get container() {
            return () => document.getElementById('user-info__area');
        }
    }
</script>
<style src="./index.scss" lang="sass"></style>