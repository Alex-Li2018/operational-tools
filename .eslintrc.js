module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  // 解析@,@api等内容,后缀
  settings: {
    'import/resolver': {
      alias: {
          map: [
              ['@', './src']
          ],
          extensions: ['.vue', '.ts', '.js', '.json']
      }
    }
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  // 允许的全局变量
  'globals': {
    'Quill': true,
    'require': true,
    "__NODE_ENV__": true,
    "arguments": true
},
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  'overrides': [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off'
      }
    }
  ]
};
