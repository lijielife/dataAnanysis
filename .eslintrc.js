var path = require('path');
module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import",
        "vue",
    ],
    'parser': 'babel-eslint',
    rules: {
        "no-underscore-dangle": [
            "error", 
            { "allow": ["_d", "_date"] }
        ],
        'class-methods-use-this': 'off',
        'no-param-reassign': 'off', // 允许修改函数引用类型入参
        'no-plusplus': 'off', // 允许 ++
        'no-restricted-syntax': [ // 覆盖掉对 for-in 和 for-of 的限制
            'error',
            'LabeledStatement',
            'WithStatement',
        ],
        "no-shadow": [
            "error",
            { 
                "allow":
                ["state"] 
            }
        ],
        'import/extensions': ['off', 'never'],
        'indent': ['error', 4],
        'no-console': 0,
        'no-debugger': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-unresolved': 0,
        'no-use-before-define': 0,
        'no-useless-escape': 0,
        'no-undef': 0,
        'no-prototype-builtins': 0,
        'no-lonely-if': 0,
        'no-extend-native': 0,
        'consistent-return': 0,
        // 'no-useless-return': 0,
        // 'strict': 0,
        // "class-methods-use-this": 0,
        // 'no-script-url': 0
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: path.join(__dirname, './config/webpack.web.dev.config.js')
            }
        }
    }
};