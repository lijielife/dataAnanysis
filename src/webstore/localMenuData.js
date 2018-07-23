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
        describe: '数据概览',
        icon: 'area-chart',
        res_type: 'view',
        children: [
            // {
            //     describe: '页面埋点数据',
            //     icon: 'appstore-o',
            //     uri: '/fe-data-overview',
            //     res_type: 'view',
            // },
            {
                describe: '服务端埋点数据',
                icon: 'appstore-o',
                uri: '/be-data-overview',
                res_type: 'view',
            },
            {
                describe: '效益概览',
                icon: 'bank',
                res_type: 'view',
                uri: '/benefit-analysis',
            },
            // {
            //     describe: '汇总数据报告',
            //     icon: 'file-excel',
            //     res_type: 'view',
            //     uri: '/report-download',
            // },
        ],
    },
    {
        describe: '漏斗分析',
        icon: 'filter',
        res_type: 'view',
        uri: '/funnel-analyze',
    },
    // {
    //     describe: '人群分析',
    //     icon: 'usergroup-add',
    //     res_type: 'view',
    //     uri: '/user-info3',
    // },
    // {
    //     describe: '首页',
    //     icon: 'bank',
    //     res_type: 'menu',
    //     children: [
    //         {
    //             describe: '导航',
    //             icon: 'appstore-o',
    //             uri: '/first-home',
    //             res_type: 'view',
    //         },
    //     ],
    // },
];
export default sideMenuData;
