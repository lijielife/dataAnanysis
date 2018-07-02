/**
 * @file: index.jsx
 * @author: 尹博文
 * @createAt: 2017/10/30
 * @description: 渲染菜单栏通用方法
 */
import style from './index.scss';

export default {
    methods: {
        /**
         * @description 渲染当前层级菜单
         * @param <Array> list 菜单渲染数据
         * @return <String> 返回组装好的菜单字符串
         */
        renderMenuList(list) {
            const menusStr = list.map((item) => {
                let str = '';
                if (item.children && item.children.length) {
                    if (!item.group) {
                        str = this.renderSubMenu(item);
                    } else {
                        str = this.renderGroup(item);
                    }
                } else {
                    str = this.renderMenuItem(item);
                }
                return str;
            });
            return menusStr;
        },
        /**
         * @description 渲染 menuItem
         */
        renderMenuItem(item) {
            return (
                <nb-menu-item
                    name={item.uri}
                    v-push={`${item.uri}`}
                    icon={item.icon ? item.icon : ''}
                >
                    <span>{item.describe}</span>
                </nb-menu-item>
            );
        },
        /**
         * @description 渲染 subMenu
         */
        renderSubMenu(item) {
            return (
                <nb-menu-sub
                    title={item.describe}
                    icon={item.icon ? item.icon : 'appstore'}
                >
                    {this.renderMenuList(item.children)}
                </nb-menu-sub>
            );
        }, 
        /**
         * @description 渲染 group
         */
        renderGroup(item) {
            return (
                <nb-menu-item-group title={item.describe}>
                    {this.renderMenuList(item.children)}
                </nb-menu-item-group>
            );
        },
        menuItemClicked(val) {
            this.$emit('menuChange', val);
        },
    },
    computed: {

    },
    props: {
        mode: {
            type: String,
            default: 'inline',
            required: false,
        },
        accordion: {
            type: Boolean,
            default: true,
            required: false,
        },
        menus: {
            type: Array,
            default: [],
            required: true,
        },
        selectKey: {
            type: String,
            default: '',
            required: true,
        },
    },
    render() {
        return (
            <nb-menu
                ref="menu"
                accordion={this.accordion}
                class="system_menu"
                theme="dark"
                mode={this.mode}
                value={this.selectKey}
                onInput={this.menuItemClicked}
            >
                {this.renderMenuList(this.menus)}
            </nb-menu>
        );
    },
};

