/**
 * Miox install file
 */
import 'miox-css';
import Miox from 'miox';
import Engine from 'miox-vue2x';
import VueContainer from 'miox-vue2x-container';
import './initialize';
import store from './webstore/index';
import Route from './routes';
import Container from './webviews/container/index.vue';
import './style/common.scss'; // 页面全局样式表


// 新建Miox对象
const app = new Miox({
    max: 1,
    session: false,
    strict: true,
});

// 各种事件
app.on('500', (err) => {
    console.log(err.stack);
});
app.on('404', err => console.warn('404 Not found'));
app.on('process:start', () => console.log('process:start'));
app.on('process:end', () => console.log('process:end'));

// 设置引擎
app.install(Engine);

// 设置store
app.set('vuex', store);

app.install(VueContainer(Container));

// 设置路由
app.use(Route.routes());

// 监听页面切换
app.on('webview:beforeEnter', async () => {
    // console.log(app.req);
    store.commit('setMenuSelectKey', app.req.mark);
    store.commit('setBreadcrumb', app.req.mark);
});
// 启动服务监听
export default app.listen();