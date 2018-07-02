const webpackConfig = require('miox-vue2x-webpack-config');
const pkg = require('../package.json');
const proxy = require('./webpack.web.proxy.config');
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
                },
                // {
                //     test: /\.css$/,
                //     use: [
                //     { loader: 'style-loader' },
                //     {
                //         loader: 'css-loader',
                //         options: {
                //             modules: true,
                //             localIdentName: '[path][name]__[local]--[hash:base64:5]',
                //         }
                //     }
                //     ]
                // },
            ]
        },
        entry: {
            app: config.resolve('src', 'index.js')
        },
        resolve: {
            extensions: ['.js', '.vue', '.jsx', '.json', '.css', '.less'],
            alias: alias,
        },
        plugins: [
            config.html(config.resolve('src', 'index.html')),
        ],
        devServer: {
            contentBase: config.resolve('src'),
            proxy: proxy,
            host: pkg.service.ip,
            port: pkg.service.port,
            disableHostCheck: true
        }
    });
});