import axios from 'axios';

/*
* @desc: 全局数据配置
*/
const globalMap = new Map([
    // 优先级
    ['priorityLevel', [
        {
            value: 'LOW',
            name: '低',
        },
        {
            value: 'MIDDLE',
            name: '中',
        },
        {
            value: 'HIGH',
            name: '高',
        },
    ]],
    // 合并类型 KEYVALUE("KEYVALUE",0), ROW("增量-合并",1), APPENDONLY("增量-追加",2), FULL("全量",3)
    ['importMode', [
        {
            value: 'ROW',
            name: '增量-合并',
        },
        {
            value: 'APPENDONLY',
            name: '增量-追加',
        },
        // {
        //     value: 'KEYVALUE',
        //     name: 'KEYVALUE',
        // },
        // {
        //     value: 'FULL',
        //     name: '全量',
        // },
    ]],
    // 清空目标表方式
    ['cleanType', [
        {
            value: 'NONE',
            name: 'NONE',
        },
        {
            value: 'DELETE',
            name: 'DELETE',
        },
        {
            value: 'TRUNCATE',
            name: 'TRUNCATE',
        },
    ]],
    // 调度周期
    ['scheduleCycle', [
        {
            value: 'SECOND',
            name: '秒',
        },
        {
            value: 'MINUTE',
            name: '分',
        },
        {
            value: 'HOUR',
            name: '小时',
        },
        {
            value: 'DAY',
            name: '天',
        },
        {
            value: 'WEEK',
            name: '周',
        },
        {
            value: 'MONTH',
            name: '月',
        },
        {
            value: 'YEAR',
            name: '年',
        },
    ]],
]);
export default globalMap;

/*
* @desc: 从后端获取数据
*/
const paramsConfig = {
    operatorList: {
        url: 'user/operatorList',
        params: {},
    },
};
/*
* @desc: 定义asyncGet方法
*/
Map.prototype.asyncGet = ((key) => {
    if (globalMap.has(key)) {
        return Promise.resolve(globalMap.get(key));
    }
    return new Promise((resolve) => {
        const item = paramsConfig[key];
        axios.get(item.url, { params: item.params })
            .then((res) => {
                resolve(res);
                globalMap.set(key, res);
            });
    });
});
