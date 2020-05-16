module.exports = {
    root : true,
    env : {
        node : true
    },
    extends : [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions : {
        parser : 'babel-eslint'
    },
    rules : {
        'no-console' : process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger' : process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        semi : 'off',
        'semi-spacing' : ['error', { after : true, before : false }],
        'semi-style' : ['error', 'last'],
        'no-extra-semi' : 'off',
        'no-unexpected-multiline' : 'error',
        'no-unreachable' : 'error',
        indent : ['warn', 4],
        'no-multiple-empty-lines' : 'warn',
        'key-spacing' : 'off'
    }
}
