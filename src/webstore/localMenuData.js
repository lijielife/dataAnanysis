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
];
export default sideMenuData;
