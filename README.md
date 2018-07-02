# 后台模板使用指南
已经全局注册了axios，每个业务页面无需再引入axios。

## 整体布局（template-layout）
> 整体布局组件提供整个系统的页面总体布局，template-layout中提供一下具名插槽用于插入菜单、用户信息、面包屑等模块。template-layout目前有如下Props：
### Props
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| layoutType | 布局主题类型 | Number | 1 |
| logoUrl | 系统图标（左上角展示） | String | 51信用卡APP图标链接 |
| systemName | 系统名称（左上角展示） | String | 51NB后台系统 |
| sideMenuWidth | 左侧菜单的宽度 | Number | 240 |

##### 主题预览
- 主题1（默认主题，layoutType传1或不传）

![alt text](https://pic.51zhangdan.com/u51/storage/05/04455e86-ae09-1be8-1127-ebcf3a832595.png)
- 主题2（默认主题，layoutType传2）
> 主题1和主题2主要是左侧导航菜单的风格不一样

![alt text](https://pic.51zhangdan.com/u51/storage/f5/fffe14fc-5818-d501-e018-797e787f5465.jpeg)


### 事件
| 名称 | 参数 | 说明 |
|-----|------|-----|
|memuStatusChange|menuCollapsed|当菜单收起或者展开时触发|





## 导航菜单（template-menu）

### 菜单数据来源
> 菜单数据有两种情况，一种是前端写死的菜单，另一种是使用IAM返回的权限菜单。
##### 1.使用前端写死的菜单
使用前端写死的菜单需要在`.src/webstore/localMenuData.js`这个文件中将state的menuFromLocalOrRemote字段设置为"local"，并且在`.src/webstore/localMenuData.js`这个文件中准备好菜单数据。菜单数据结构如下：
```javascript
const sideMenuData = [
    {
        describe: '菜单一', // 描述(菜单中显示的中文名称)
        icon: 'bank', // 菜单的ICON图标
        res_type: 'menu',  // 类型：menu表示菜单，view表示是页面
        children: [ // 子菜单
            {
                describe: '页面1',
                icon: 'appstore-o',
                uri: '/page-one', // 页面路由
                res_type: 'view',
            },
        ],
    },
    {
        describe: '菜单二',
        icon: 'bank',
        res_type: 'menu',
        children: [
            {
                describe: '页面2',
                icon: 'appstore-o',
                uri: '/page-two',
                res_type: 'view',
            },
            {
                describe: '菜单三',
                icon: 'appstore-o',
                res_type: 'menu',
                children: [
                    {
                        describe: '页面3',
                        icon: 'appstore-o',
                        uri: '/page-three',
                        res_type: 'view',
                    },
                    {
                        describe: '页面4',
                        icon: 'appstore-o',
                        uri: '/page-four',
                        res_type: 'view',
                    },
                ],
            },
        ],
    },
];
```
之所以字段名取这些是为了保持和IAM返回的页面权限中的字段一致，这样会比较方便处理。菜单理论上支持无限级的嵌套。

##### 2.使用IAM返回的权限菜单
使用IAM返回的权限菜单，需要在`.src/webstore/localMenuData.js`这个文件中将state的menuFromLocalOrRemote字段设置为"remote", 并在`.src/api/api.js`中配置好开发环境后台接口的路径即可，如下：
```javascript
    let base = '';
    if (process.env.NODE_ENV === 'dev') { // 本地调试时使用的后端环境
        base = 'http://gcp-manager.k8s.dev:8080'; // 你的项目的接口地址
    }
```
> 配置好这两个，模板会自动发请求去IAM取登录用户在该系统中的页面权限信息，并格式化成渲染菜单需要的格式，最后渲染出菜单。

**注**：后端系统默认直接接入IAM，并且IAM会提供如下三个通用的接口，如果出现问题可咨询IAM负责人`张刘成`。
- `/ssoagentlogin/getMenuesByAccount`: 获取菜单
- `/ssoagentlogin/getcurrentUserInfo`: 获取用户信息
- `/ssoagentlogin/logoutAndGetLoginUrl`: 退出登录

### Props
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 类型(vertical || inline | String | inline |
| accordion | 是否开启手风琴模式(每次只会展开一个菜单) | Boolean | true |
| menus | 菜单数据 | Array | [] |
| selectKey | 菜单选中项 | String | '' |

### 事件
| 名称 | 参数 | 说明 |
|-----|------|-----|
|menuChange|menuCollapsed|菜单项被点击时触发|



## 用户信息（template-userInfo）
> 展示登录用户的头像、姓名等信息，提供退出功能，提供工具栏（工具栏中目前只有全屏功能）；


## ionicon使用
ionicon为开源项目，由于vant自带的icon比较有限，有时候并不能完全满足业务开发的需求，所以这里在后台模板中引入了ionicon图标库，你只需要在使用的时候在页面模板中插入如下代码即可：
```html
<i class="ion-arrow-expand"></i>
```
其中`ion-arrow-expand`为图标名称，图标名称可以去[`ionicon官网`](http://ionicons.com/)查看。


