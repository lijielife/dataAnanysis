import moment from 'moment';

export function getUrlKey(name) {
    return decodeURIComponent(
        (new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`).exec(location.href) || ['', ''])[1].replace(
            /\+/g,
            '%20',
        ),
    ) || null;
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
export function formatDateTime(timeStamp, type) {
    const date = new Date();
    date.setTime(timeStamp);

    const y = date.getFullYear();
    let m = date.getMonth() + 1;

    m = m < 10
        ? (`0${m}`)
        : m;
    let d = date.getDate();
    d = d < 10
        ? (`0${d}`)
        : d;
    let h = date.getHours();
    h = h < 10
        ? (`0${h}`)
        : h;
    let minute = date.getMinutes();
    let second = date.getSeconds();
    minute = minute < 10
        ? (`0${minute}`)
        : minute;
    second = second < 10
        ? (`0${second}`)
        : second;
    if (type === 6) {
        return `${y}-${m}-${d} ${h}:${minute}:${second}`;
    } else if (type === 2) {
        return `${m}-${d}`;
    } else if (type === 3) {
        return `${h}:00:00`;
    }
    if (type === 100) {
        console.log('100type', `${y}-${m}-${d}`);
    }

    return `${y}-${m}-${d}`;
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
        if (!obj[key] && !(obj[key] === 0)) { delete obj[key]; }
    }
    return obj;
}

/*
* @desc: 获取一系列全局变量
*/
export function getActivityId(activityId) {
    if (typeof activityId !== 'undefined') {
        window.$$_ActivityId = activityId;
    } else {
        window.$$_ActivityId = PG.QS.activityId;
    }
}

/*
* @desc: 查询环境
*/
export function checkEnv() {
    if (location.origin !== 'http://opsplate.u51-inc.com') {
        window.$$Authorization = 'service 123';
    } else {
        window.$$Authorization = 'service 2d42dfcba08934aa819eea25e500ac3d';
    }
    // 模糊查找的token
    window.$$fuzzyAuthorization = 'encrypt MTIzLXYx.iDDTpiSu5GYvgBGyxf-cc7o_swNNNJBm0aWg8eZSX5_9uKCdG_8_gdoYbq3rM' +
            'Y2oiqang05Lej3z2QS_OhrxVg';
    window.$$fuzzyUserid = 123;
    window.$$commonPath = '/ops-activityeffect';
}

/*
* @desc:深拷贝
*/
export function cloneObj(obj) {
    let str;
    let newobj = obj.constructor === Array
        ? []
        : {};
    if (typeof obj !== 'object') {
        // do nothing
    } else if (window.JSON) {
        str = JSON.stringify(obj); // 系列化对象
        newobj = JSON.parse(str); // 还原
    } else {
        for (const i in obj) {
            if (obj.hasOwnProperty(i)) {
                newobj[i] = typeof obj[i] === 'object'
                    ? cloneObj(obj[i])
                    : obj[i];
            }
        }
    }
    return newobj;
}
