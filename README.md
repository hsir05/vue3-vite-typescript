# Vue 3 + Typescript + Vite

## 1. 规范管理

### 1-1. 代码风格约束

```vue
eslint：代码质量检测（用var还是let，用==还是===...）
prettier：代码风格检测（加不加尾逗号，单引号还是双引号...）
eslint-config-prettier：解决ESLint与Prettier的风格冲突
eslint-plugin-prettier：ESLint的插件，集成Prettier的功能
eslint-plugin-vue：ESLint的插件，增加Vue的检测能力
```

`yarn add eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue -D`

### 1-2 .eslintrc.js prettier.config.js文件

项目根目录下添加`.eslintrc.js`和`prettier.config.js`文件

**.eslintrc.js**

```vue
module.exports = {
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error'
  }
}
```

**.prettier.config.js**

```vue
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false, // 未尾逗号
  vueIndentScriptAndStyle: true,
  singleQuote: true, // 单引号
  quoteProps: 'as-needed',
  bracketSpacing: true,
  trailingComma: 'none', // 未尾逗号
  arrowParens: 'always',
  insertPragma: false,
  requirePragma: false,
  proseWrap: 'never',
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'lf'
}
```

[ESLint Rules](http://eslint.cn/docs/rules/)

[Prettier中文网](https://www.prettier.cn/docs/index.html)


**`ctrl+shift+P`调出控制台输入`Reload Window`配置即可生效**

### 1-3 git提交约束

```vue
husky：触发Git Hooks,执行脚本
lint-staged：检测文件，只对暂存区中有改动的文件进行检测，可以在提交前进行Lint操作
commitizen：使用规范化的message提交
commitlint: 检查message是否符合规范
cz-conventional-changelog：适配器。提供conventional-changelog标准（约定式提交标准）。基于不同需求，也可以使用不同适配器（比如: cz-customizable）。

```

`yarn add husky lint-staged commitizen @commitlint/config-conventional @commitlint/cli  -D`

### 1-4. 提交

```vue
添加一个脚本就可以编写规范化的提交：
"scripts": {
    "cz": "git cz"
  }

```
