/**
 * @file: index.js
 * @author: 尹博文
 * @createAt: 2017/10/30
 * @description: 定义各种state
 */

import Vuex from 'vuex';
import Vue from 'vue';
import localMenuData from './localMenuData';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        menuFromLocalOrRemote: 'local', // local：使用本地写死的菜单； remote：使用IAM返回的菜单
        userInfo: {}, // 用户信息
        menus: [], // 菜单数据
        breadcrumb: [], // 面包屑数据
        isFullScreen: false, // 是否全屏
        isHideInlieSubmenu: false, // 解决收起菜单时子菜单悬浮闪现的问题
        tabList: [
            {
                type: 'view',
                name: '主页',
                uri: '/',
            },
        ], // tab页面标签
        isMenuOpen: true, // 菜单是否展开
        menuSelectKey: '入口配置管理', // 被选中的菜单
        globalSpinning: false,
    },
    getters: {
        getMenus: state => state.menus,
        getBreadcrumb: state => state.breadcrumb,
        getMenuStatus: state => state.isMenuOpen,
        getMenuSelectKey: state => state.menuSelectKey,
        getUserInfo: state => state.userInfo,
        getTabList: state => state.tabList,
        getHideInlieSubmenuStatus: state => state.isHideInlieSubmenu,
    },
    mutations: {
        /*
        * @desc: 设置userInfo
        */
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        /*
        * @desc: 设置导航菜单Menu
        */
        setMenus(state, menuData) {
            state.menus = menuData;
        },
        /*
        * @desc: 设置导航菜单展开状态：  true：展开   false：收起
        */
        setMenuStatus(state, boolean) {
            state.isMenuOpen = boolean;
        },
        /*
        * @desc: 设置是否隐藏悬浮的子菜单
        */
        setHideInlieSubmenuStatus(state, boolean) {
            state.isHideInlieSubmenu = boolean;
        },
        /*
        * @desc: 设置导航菜单选中项
        */
        setMenuSelectKey(state, key) {
            state.menuSelectKey = key;
        },
        /*
        * @desc: 设置面包屑数据
        */
        setBreadcrumb(state, key) {
            const bread = [];
            state.breadcrumb = generateBreadPath(state.menus, key, bread);
        },
        /*
        * @desc: 设置标签页数据
        */
        setTabList(state, key) {
            const bread = [];
            const breadList = generateBreadPath(state.menus, key, bread);
            const tab = breadList[breadList.length - 1];
            state.tabList = state.tabList.filter(item => item.name !== tab.name);
            if (!state.tabList.find(item => item.name === tab.name)) {
                state.tabList = [
                    ...state.tabList,
                    tab,
                ];
            }
        },
        /*
        * @desc: 删除标签页数据
        */
        delTab(state, key) {
            if (key !== '/')state.tabList = state.tabList.filter(item => item.uri !== key);
        },
        /*
        /*
        * @desc: 删除所有标签页数据
        */
        delALLTab(state) {
            state.tabList = [
                {
                    type: 'view',
                    name: '主页',
                    uri: '/',
                },
            ];
        },
        /*
        * @desc: 处理全屏相关
        */
        handleFullScreen(state) {
            const main = document.body;
            if (state.isFullScreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (main.requestFullscreen) {
                    main.requestFullscreen();
                } else if (main.mozRequestFullScreen) {
                    main.mozRequestFullScreen();
                } else if (main.webkitRequestFullScreen) {
                    main.webkitRequestFullScreen();
                } else if (main.msRequestFullscreen) {
                    main.msRequestFullscreen();
                }
            }
        },
        /*
        * @desc: 设置全屏状态
        */
        changeFullScreenState(state) {
            state.isFullScreen = !state.isFullScreen;
        },
    },
    actions: {
        /*
        * @desc: 异步获取userInfo
        */
        async getUserInfo({ commit }) {
            // 获取用户信息
            const res = await axios.get('/ssoagentlogin/getcurrentUserInfo', {});
            commit('setUserInfo', res);
        },
        async getMenus({ commit, state }) {
            let menuData = [];
            if (state.menuFromLocalOrRemote === 'local') {
                menuData = localMenuData;
            } else {
                const res = await axios.get('/ssoagentlogin/getMenuesByAccount', {});
                menuData = generateMenuTree(res.resourceInfos);
            }
            commit('setMenus', menuData);
            commit('setBreadcrumb', state.menuSelectKey);
        },
    },
    modules: {

    },
});

// 格式化IAM返回的菜单数据，使其与渲染菜单的数据结构保持一致
function generateMenuTree(res) {
    const result = res.filter(item => item.parent_code === '0');
    for (let i = 0; i < res.length; i++) {
        // 没有父节点
        const info = res[i];
        if (info.parent_code !== '0') {
            const parentCode = info.parent_code;
            const parent = filterByParentCode(result, parentCode);
            if (parent.children) {
                parent.children.push({
                    ...info,
                });
            } else {
                parent.children = [{ ...info }];
            }
        }
    }
    return result;
}

function filterByParentCode(arr, parentCode) {
    if (!arr.length) return false;
    let result;
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item.code === parentCode) {
            result = item;
            break;
        }
        if (Array.isArray(item.children) && item.children.length) {
            result = filterByParentCode(item.children, parentCode);
            if (result) {
                return result;
            }
        }
    }
    return result;
}

function generateBreadPath(menus, key, result) {
    for (let i = 0; i < menus.length; i++) {
        const cur = menus[i];
        // 找到
        if (cur.uri && cur.uri === key) {
            return [...result, {
                type: cur.res_type,
                name: cur.describe,
                uri: cur.uri,
            }];
        }
        // 没有children
        if (!cur.children || !cur.children.length) continue;
        // 有children
        if (cur.children.length) {
            result.push({
                type: cur.res_type,
                name: cur.describe,
                uri: cur.uri,
            });
            const tmp = generateBreadPath(cur.children, key, result);
            if (tmp) {
                return tmp;
            }
            result.pop();
        }
    }
    return false;
}

export default store;
