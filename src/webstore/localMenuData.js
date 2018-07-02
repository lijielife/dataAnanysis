/**
 * @file: 导航栏菜单数据
 * @author: 尹博文
 * @createAt: 2017/10/30
 * @description: 如果你的导航菜单是由前端写死的，那你在这个文件中设置菜单数据，并在westore/index.js中将menuFromLocalOrRemote设置为’local‘
 *      name: 导航菜单显示名字
 *      redirect: 跳转路由
 *      children: 是否包含子菜单
 *      group: 同一级菜单是否需要分类
 *      icon: 图标，没有该字段则不显示
 */

const sideMenuData = [
    {
        describe: '用户中心',
        icon: 'bank',
        res_type: 'view',
        uri: '/user-info',
    },
    {
        describe: '首页',
        icon: 'bank',
        res_type: 'menu',
        children: [
            {
                describe: '导航',
                icon: 'appstore-o',
                uri: '/first-home',
                res_type: 'view',
            },
        ],
    },
    {
        describe: '银行服务管理',
        icon: 'bank',
        res_type: 'menu',
        children: [
            {
                describe: '服务',
                icon: 'appstore-o',
                uri: '/service-view',
                res_type: 'view',
            },
            {
                describe: '管理',
                icon: 'appstore-o',
                uri: '/service-view',
                res_type: 'menu',
                children: [
                    {
                        describe: '管理1',
                        icon: 'appstore-o',
                        uri: '/manage-view',
                        res_type: 'view',
                    },
                    {
                        describe: '菜单',
                        icon: 'appstore-o',
                        uri: '/manage-view2',
                        res_type: 'menu',
                        children: [
                            {
                                describe: '子菜单1',
                                icon: 'appstore-o',
                                uri: '/child-view',
                                res_type: 'view',
                            },
                            {
                                describe: '子菜单2',
                                icon: 'appstore-o',
                                uri: '/child-view2',
                                res_type: 'view',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        describe: '运营管理',
        icon: 'api',
        res_type: 'menu',
        children: [
            {
                describe: '入口配置管理',
                icon: 'appstore-o',
                uri: '/operate-view',
                res_type: 'view',
            },
        ],
    },
    {
        describe: '信用卡还款',
        icon: 'credit-card',
        res_type: 'menu',
        children: [
            {
                describe: '储蓄卡还款流水',
                icon: 'appstore-o',
                uri: '/testPageOne',
                res_type: 'view',
            },
            {
                describe: '水电煤缴费流水',
                icon: 'appstore-o',
                uri: '/testPageTwo',
                res_type: 'view',
            },
        ],
    },
    {
        describe: '网关管理',
        icon: 'credit-card',
        res_type: 'menu',
        children: [
            {
                describe: '全局配置',
                icon: 'appstore-o',
                uri: '/global-config',
                res_type: 'view',
            },
            {
                describe: '路由配置',
                icon: 'appstore-o',
                uri: '/router-config',
                res_type: 'view',
            },
        ],
    },
];
export default sideMenuData;
