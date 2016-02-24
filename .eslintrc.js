module.exports = {
    'env': {
        'node':true,
        'browser': true,
        'commonjs': true,
        'es6': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaFeatures': {
            'experimentalObjectRestSpread': true,
            'jsx': true
        },
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'indent': [
            2,
            2
        ],
        'linebreak-style': [
            2,
            'unix'
        ],
        'quotes': [
            0,
            'single'
        ],
        'semi': [
            0,
            'always'
        ],
        'no-unused-vars':0,
        'no-self-compare':1,
        'comma-dangle':0,
        'no-console':0
    }
};