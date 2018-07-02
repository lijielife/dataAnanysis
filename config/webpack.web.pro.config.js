const webpackConfig = require('miox-vue2x-webpack-config');
const alias = require('./alias');

module.exports = webpackConfig(config => {
    config.set({
        env: 'web',
        'source-compile': {
            dirs: [/^src/i],
            modules: [/miox\-?/i, /element\-?/i]
        }
    });
    config.merge({
        module: {
            rules: [
                {
                    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                    exclude: /favicon\.png$/,
                    loader: "url-loader"
                }
            ]
        },
        entry: {
            'vendor': [
                'miox', 'miox-router', 'miox-vue2x'
            ],
            'app': config.resolve('src', 'index.js')
        },
        output: {
            path: config.resolve('build'),
            filename: '[name].[hash:10].js'
        },
        resolve: {
            extensions: [
                '.js',
                '.vue',
                '.jsx',
                '.json',
                '.css',
                '.less'
            ],
            alias: alias
        },
        plugins: [
            config.html(config.resolve('src', 'index.html')),
            config.resource('web.[hash:10].css'),
            config.chunk({
                names: ["vendor", "manifest"]
            }),
            /*
     * 注入环境变量，可直接在js中使用
     * */
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"',
                    // 枚举值 prod: 线上 | test: 测试 | pre: 预发 | stable_project： stable环境
                    BUILD_ENV: JSON.stringify(process.env.BUILD_ENV)
                }
            })
        ]
    });
});