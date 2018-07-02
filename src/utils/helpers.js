import moment from 'moment';

export function getUrlKey(name) {
    return decodeURIComponent((new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`).exec(location.href) || ['', ''])[1].replace(/\+/g, '%20')) || null;
}

/*
* @desc: 深拷贝
*/
export function deepClone(val) {
    return JSON.parse(JSON.stringify(val));
}

/*
* @desc: 时间戳转YYYY-MM-DD HH:mm:ss
*/
export function formatDateTime(timeStamp) {
    const date = new Date();
    date.setTime(timeStamp);
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? (`0${m}`) : m;
    let d = date.getDate();
    d = d < 10 ? (`0${d}`) : d;
    let h = date.getHours();
    h = h < 10 ? (`0${h}`) : h;
    let minute = date.getMinutes();
    let second = date.getSeconds();
    minute = minute < 10 ? (`0${minute}`) : minute;
    second = second < 10 ? (`0${second}`) : second;
    return `${y}-${m}-${d} ${h}:${minute}:${second}`;
}

/*
* @desc: 对入参进行统一处理
*/
export function handleParams(params) {
    const obj = Object.assign({}, params);

    for (const key in obj) {
        // 处理单个 date 
        if (moment.isMoment(obj[key])) {
            obj[key] = obj[key].format('YYYY-MM-DD');
        }
        // 处理 rangeDate 
        if (key.indexOf('range') !== -1 && obj[key].length) {
            const pre = key.split('__')[0];
            obj[`${pre}BeginDate`] = obj[key][0].format('YYYY-MM-DD');
            obj[`${pre}EndDate`] = obj[key][1].format('YYYY-MM-DD');
            delete obj[key];
        }
        // 如果对象为空，则删除此对象
        if (!obj[key] && !(obj[key] === 0)) delete obj[key];
    }
    return obj;
}
