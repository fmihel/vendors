const path = require('path'); 

module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },
    // "extends": "eslint:recommended",
    extends: 'airbnb/base',
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaFeatures: {
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        babelOptions: {
            configFile: './.babelrc', // или абсолютный путь, если относительный не сработает
        },
    },
    rules: {
        'no-console': 'off',
        'no-bitwise': 'off',
        'no-useless-constructor': 'off',
        'no-unused-vars': 'warn',
        'class-methods-use-this': 'off',
        'no-plusplus': 'off',
        'max-classes-per-file': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'no-underscore-dangle': 'off',
        'max-len': 'off',
        'linebreak-style': 'off',
        indent: [
            'error',
            4,
        ],
        quotes: [
            'error',
            'single',
        ],
        semi: [
            'error',
            'always',
        ],
    },
};
