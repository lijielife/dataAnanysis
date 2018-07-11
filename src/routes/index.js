import Router from 'miox-router';

import HomePage from '../webviews/container/index.vue';

const route = new Router();

route.patch('/fe-data-overview', async (ctx) => {
    const inner = await new Promise((resolve) => {
        require.ensure([], (require) => {
            resolve(require('../webviews/dataPreview/index.vue'));
        });
    });
    await ctx.render(inner.default);
});
route.patch('/benefit-analysis', async (ctx) => {
    const inner = await new Promise((resolve) => {
        require.ensure([], (require) => {
            resolve(require('../webviews/dataPreview/index.vue'));
        });
    });
    await ctx.render(inner.default);
});
route.patch('/funnel-analyze', async (ctx) => {
    const inner = await new Promise((resolve) => {
        require.ensure([], (require) => {
            resolve(require('../webviews/funnelAnalyze/index.vue'));
        });
    });
    await ctx.render(inner.default);
});
route.patch('/router-config', async (ctx) => {
    const inner = await new Promise((resolve) => {
        require.ensure([], (require) => {
            resolve(require('../webviews/testTwo/index.vue'));
        });
    });
    await ctx.render(inner.default);
});
route.patch('/bank-view', async (ctx) => {
    const inner = await new Promise((resolve) => {
        require.ensure([], (require) => {
            resolve(require('../webviews/testTwo/index.vue'));
        });
    });
    await ctx.render(inner.default);
});
export default route;
