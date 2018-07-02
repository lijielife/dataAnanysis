/**
 * @file index.vue
 * @description Tab组件
 * @author xurenjie
 * @createAt 2017-11-07
 */
<template>
    <div class="tab">
        <div class="tab-container">
            <nb-tabs :active-tab-key="this.activeKey" type="editable-card" @add="onAdd" @remove="onRemove" @change="onClick">
                <nb-tab-pane v-for="tabPane in tabPanes" :tab-key="tabPane.key" :key="tabPane.key" :tab="tabPane.tab"></nb-tab-pane>
            </nb-tabs>
        </div>
    </div>
</template>
<script>
import { Component, life, watch, filter } from 'miox-vue2x-classify';
import { Tabs, TabPane } from '@u51/miox-vant';
@Component({
    props: {
        tabList: {
            type: Array,
            default: [],
        },
    },
    components: {
        'nb-tabs': Tabs,
        'nb-tab-pane': TabPane,
    },
    data() {
        return {
            activeKey: '1',
        }
    },
    methods: {
        onAdd() {
            this.$emit('delAllTab')
        },
        onRemove(tabKey) {
            this.$emit('delTab', tabKey)
        },
        onClick(key) {
            this.$push(key)
        },
    }
})
export default class TabPages {
    get tabPanes() {
        // 异步改变选中元素
        setTimeout(() => {
            this.activeKey = this.tabList[this.tabList.length - 1] && this.tabList[this.tabList.length - 1].uri
        }, 100)
        return this.tabList.map((item, idx) => {
            return {
                key: item.uri,
                tab: item.name
            }
        })
    }
}
</script>
<style src="./index.scss" lang="sass"></style>