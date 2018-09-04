import Router from 'miox-router';

const route = new Router();

route.patch('/fe-data-overview', async (ctx) => {
    const inner = await new Promise((resolve) => {
        require.ensure([], (require) => {
            resolve(require('../webviews/dataPreview/index.vue'));
        });
    });
    await ctx.render(inner.default);
});
route.patch('/cg-data-overview', async (ctx) => {
    const inner = await new Promise((resolve) => {
        require.ensure([], (require) => {
            resolve(require('../webviews/dataPreview/index.vue'));
        });
    });
    await ctx.render(inner.default);
});


route.patch('/be-data-overview', async (ctx) => {
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
route.patch('/report-download', async (ctx) => {
    const inner = await new Promise((resolve) => {
        require.ensure([], (require) => {
            resolve(require('../webviews/reportDownload/index.vue'));
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

route.patch('/overall-database', async (ctx) => {
    const inner = await new Promise((resolve) => {
        require.ensure([], (require) => {
            resolve(require('../webviews/overallDatabase/index.vue'));
        });
    });
    await ctx.render(inner.default);
});

export default route;
