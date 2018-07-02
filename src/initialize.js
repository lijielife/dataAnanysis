/* eslint-disable import/no-unresolved */
import vue from 'vue';
import { Icon, Input, Button, Layout, Breadcrumb, BreadcrumbItem, Grid, Notification,
    Pagination, Checkbox, Select, Option, Modal, Row, Col, Radio, RadioGroup,
    CheckboxGroup, Cascader, Message, Tooltip, Tag, Spin, Table, TableColumn, RadioButton,
    Tabs, TabPane, DatePicker, Flex, Card, Form, FormItem, Contextmenu, Dropdown, DropdownMenu,
    DropdownItem, DropdownSubmenu, TimePicker, InputNumber, ellipsis, Badge, Menu, icon } from '@u51/miox-vant';
// import './utils/filter.js'; // 过滤器
import axios from './axios';


vue.component('nb-icon', Icon);
vue.component('nb-input', Input);
vue.component('nb-button', Button);
vue.component('nb-layout', Layout);
vue.component('nb-header', Layout.Header);
vue.component('nb-content', Layout.Content);
vue.component('nb-footer', Layout.Footer);
vue.component('nb-side', Layout.Sider);
vue.component('nb-breadcrumb', Breadcrumb);
vue.component('nb-breadcrumb-item', BreadcrumbItem);
vue.component('nb-grid', Grid);
vue.component('nb-pagination', Pagination);
vue.component('nb-checkbox', Checkbox);
vue.component('nb-checkbox-group', CheckboxGroup);
vue.component('nb-select', Select);
vue.component('nb-option', Option);
vue.component('nb-modal', Modal);
vue.component('nb-row', Row);
vue.component('nb-col', Col);
vue.component('nb-form', Form);
vue.component('nb-form-item', FormItem);
vue.component('nb-radio', Radio);
vue.component('nb-radio-group', RadioGroup);
vue.component('nb-cascader', Cascader);
vue.component('nb-tooltip', Tooltip);
vue.component('nb-tag', Tag);
vue.component('nb-spin', Spin);
vue.component('nb-table', Table);
vue.component('nb-table', Table);
vue.component('nb-table-column', TableColumn);
vue.component('nb-radio-button', RadioButton);
vue.component('nb-tabs', Tabs);
vue.component('nb-card', Card);
vue.component('nb-tab-pane', TabPane);
vue.component('nb-datePicker', DatePicker);
vue.component('Flex', Flex);
vue.component('icon', icon);
vue.component('Contextmenu', Contextmenu);
vue.component('nb-dropdown', Dropdown);
vue.component('nb-dropdown-menu', DropdownMenu);
vue.component('nb-dropdown-item', DropdownItem);
vue.component('nb-dropdown-submenu', DropdownSubmenu);
vue.component('ellipsis', ellipsis);
vue.component('nb-timePicker', TimePicker);
vue.component('number', InputNumber);
vue.component('nb-badge', Badge);
vue.component('nb-menu', Menu);
vue.component('nb-menu-item', Menu.Item);
vue.component('nb-menu-sub', Menu.Sub);
vue.component('nb-menu-item-group', Menu.Group);

vue.prototype.$axios = axios;
window.axios = axios;
vue.prototype.$modal = Modal;
vue.prototype.$msg = Message;
vue.prototype.$notify = (msg, type) => {
    type = type || 'success';
    Notification[type]({
        message: msg,
        description: '',
    });
};

