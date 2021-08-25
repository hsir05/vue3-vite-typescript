# Vue 3 + Vite + vue-route4 + Typescript +  + axios + antd design + less

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
    ecmaVersion: 12, // es版本
    sourceType: 'module' // 指定源码所在位置 scripte/module
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

### 1-5. commitlint

```vue
配置刚刚介绍到的commitlint，只需要一句命令即可完成配置,它会在项目根目录下面创建一个commitlint.config.js配置文件
module.exports = { extends: ['@commitlint/config-conventional'] };
```

### 1-6. 定义触发hook时要执行的Npm脚本

```vue
提交前对暂存区的文件进行代码风格语法校验
对提交的信息进行规范化校验
  "scripts": {
    "lint-staged": "lint-staged",
    "commitlint": "commitlint --config commitlint.config.js -e -V"
  },
  "lint-staged": {
    "src/**/*.{js,vue,md,json}": [
      "eslint --fix",
      "prettier --write"
    ]
  }

```

### 1-7. 配置husky通过触发Git Hook执行脚本

```vue

# 设置脚本`prepare`并且立马执行来安装，此时在根目录下会创建一个`.husky`目录
npm set-script prepare "husky install" && npm run prepare

# 设置`pre-commit`钩子，提交前执行校验
npx husky add .husky/pre-commit "yarn lint-staged"

# 设置`pre-commit`钩子，提交message执行校验
npx husky add .husky/commit-msg "yarn commitlint"

```

**此时已经完成配置了，现在团队里面任何成员的提交必须按照严格的规范进行了**

## 2. 添加tsx支持

需要在 vite.config.js 文件中添加如下配置：

```js
export default {
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
}
```

重新启动项目如有报错：`h is not defined`,需要在 .jsx 或 .tsx 文件中手动引入 import { h } from 'vue';

```js
export default {
  esbuild: {
    jsxInject: "import { h } from 'vue';"
}
 ```


git 提交规范

```vue
feat 增加新功能
fix 修复问题/BUG
style 代码风格相关无影响运行结果的
perf 优化/性能提升
refactor 重构
revert 撤销修改
test 测试相关
docs 文档/注释
chore 依赖更新/脚手架配置修改等
workflow 工作流改进
ci 持续集成
types 类型定义文件更改
wip 开发中
```