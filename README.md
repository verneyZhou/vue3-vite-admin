# 准备

node 版本 >= 12.0.0

# 创建项目

vue3: https://v3.cn.vuejs.org/api/

element-plus: https://element-plus.gitee.io/zh-CN/guide/quickstart.html#full-import



- npm init @vitejs/app
  - 官方：https://vitejs.cn/guide/
- 按照提示流程操作即可，自定义项目名称（vue3-vite-admin），这里选择 vue-ts、
- cd vue3-vite-admin、npm install、npm run dev

> 也可通过附加命令直接创建项目:

```shell
# npm 7+（需要额外的双横线）
npm init @vitejs/app vue3-vite-admin -- --template vue-ts
```

# 项目配置

npm run dev 会执行 vite 命令，当以命令行方式运行 vite 时，Vite 会自动解析 项目根目录 下名为 vite.config.ts 的文件

> vite.config.ts 中配置参考：https://vitejs.cn/config/

- `plugins、resolve、server...`

## 项目目录

```
├── publish/
└── src/
    ├── assets/ // 静态资源目录
    ├── common/ // 通用类库目录
    ├── components/ // 公共组件目录
    ├── router/ // 路由配置目录
    ├── store/ // 状态管理目录
    ├── styles/ // 通用 CSS 目录
    ├── types/ // ts接口自定义
    ├── services/ // 接口配置
    ├── utils/ // 工具函数目录
    ├── views/ // 页面组件目录
    ├── App.vue
    ├── main.ts
    ├── shims-vue.d.ts // ts的.vue文件适配
├── tests/ // 单元测试目录
├── index.html // 入口
├── tsconfig.json // TypeScript 配置文件
├── vite.config.ts // Vite 配置文件
└── package.json
```



## 集成 vue-router、vuex、 Element Plus 、 axios

- Vue Router 4.0 提供了 Vue 3 支持，迁移指南：https://next.router.vuejs.org/zh/guide/migration/index.html

  1. 安装：`npm i vue-router@4 -S`
  2. 创建 src/router/index.ts 文件，添加路由

- Vuex 4.0 提供了 Vue 3 支持， 迁移指南：https://next.vuex.vuejs.org/zh/guide/migrating-to-4-0-from-3-x.html

  1. 安装：`npm i vuex@4 -S`
  2. 创建 src/store/index.ts 文件

- element-plus: npm i element-plus -S

  > 参考：https://element-plus.gitee.io/zh-CN/guide/installation.html

  按需加载、全局加载

- axios: npm i axios -S
  1. 添加 src/services/axios.ts 文件
  ``` ts

  ```



## 集成 CSS 预编译器 Stylus/Sass/Less

Vite 同时提供了对 `.scss, .sass, .less, .styl` 和 `.stylus` 文件的内置支持。没有必要为他们安装特定的 vite 插件，但相应的预处理器依赖本身必须安装。

> 本项目使用 CSS 预编译器 less，直接安装为开发依赖即可。Vite 内部已帮我们集成了相关的 loader，不需要额外配置。同理，你也可以使用 Sass 或 Less 等。 https://vitejs.cn/guide/features.html#css-%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8

```shell
# .scss and .sass
npm install -D sass

# .less
npm install -D less

# .styl and .stylus
npm install -D stylus
```



## 代码规范

### 集成 Prettier 配置

> Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具

https://prettier.io/

VSCode 编辑器使用 Prettier 配置需要下载插件 Prettier: `Code formatter`

1. 安装：npm i prettier -D
2. 在根目录下创建 .prettierrc 文件，配置
3. 格式化所有文件（. 表示所有文件）: `npx prettier --write`



### 集成 ESLint 配置
> ESLint 是一款用于查找并报告代码中问题的工具，并且支持部分问题自动修复。其核心是通过对代码解析得到的 AST（Abstract Syntax Tree 抽象语法树）进行模式匹配，来分析代码达到检查代码质量和风格问题的能力。

VSCode 使用 ESLint 配置文件需要去插件市场下载插件 ESLint 。

1. 安装：npm i eslint -D
2. 执行`npx eslint --init`配置 ESlint
``` shell
vue3-vite-admin npx eslint --init
✔ How would you like to use ESLint? · style # To check syntax, find problems, and enforce code style
✔ What type of modules does your project use? · esm # JavaScript modules (import/export)
✔ Which framework does your project use? · vue
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser, node #  browser, node都选择
✔ How would you like to define a style for your project? · guide # Use a popular style guide
✔ Which style guide do you want to follow? · airbnb # 这里有三种风格可供选择：Airbnb、Standard、Google，这里选了 airbnb
✔ What format do you want your config file to be in? · JavaScript
✔ Would you like to install them now with npm? · No / Yes
```
> 自动安装失败就手动安装：
`npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-base eslint-plugin-import eslint-plugin-vue -D`

- `@typescript-eslint/parser`: `ESLint`的解析器，用于解析`TypeScript`，从而检查和规范`TypeScript`代码。
- `@typescript-eslint/eslint-plugin`: 作为 eslint 默认规则的补充，提供了一些额外的适用于 ts 语法的规则。
- `@vue/prettier/@typescript-eslint`：使得`@typescript-eslint`中的样式规范失效，遵循prettier中的样式规范，需要放在最后一项。 




3. 安装成功后，根目录下会自动生成 .eslintrc.js 文件
    > 根据项目实际情况，如果我们有额外的 ESLint 规则，也在此文件中追加
4. 根目录下新增 .eslintignore 文件
5. 可在 `vscode` 的 `settting.json` 中添加自动修复指令：
``` json
 "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
 }
```
6. 可在 package.json 中添加命令：
``` json
"lint": "eslint --ext .js,.vue src",
"lint:fix": "eslint --ext .ts,.vue src --fix"
```


7. 解决 Prettier 和 ESLint 的冲突
    - npm i eslint-plugin-prettier eslint-config-prettier -D
        - `eslint-plugin-prettier`: 将 Prettier 的规则设置到 ESLint 的规则中；
        - `eslint-config-prettier`: 关闭 ESLint 中与 Prettier 中会发生冲突的规则。
        
    - 在 .eslintrc.js 添加 prettier 插件
    ``` js
    module.exports = {
    ...
    extends: [
        'plugin:vue/essential',
        'airbnb-base',
        'plugin:prettier/recommended' // 添加 prettier 插件
    ],
    ...
    }
    ```
    形成优先级：Prettier 配置规则 > ESLint 配置规则



### 集成 husky 和 lint-staged
> 我们在项目中已集成 ESLint 和 Prettier，来规范我们的代码，但团队里有人按自己的一套风格来写代码，或者干脆禁用掉这些工具，开发完成就直接把代码提交到了仓库，规范就没有什么作用。

> 所以，可以做一些限制，让没通过 ESLint 检测和修复的代码禁止提交，从而保证仓库代码都是符合规范的。

- husky —— Git Hook 工具，可以设置在 git 各个阶段（pre-commit、commit-msg、pre-push 等）触发我们的命令
    > 在本地执行 git commit 的时候，就对所提交的代码进行 ESLint 检测和修复（即执行 eslint --fix），如果这些代码没通过 ESLint 规则校验，则禁止提交。
- lint-staged —— 在 git 暂存的文件上运行 linters。
    > 只用 ESLint 修复自己此次写的代码，而不去影响其他的代码


### 提交规范

- commit message 格式规范

- 集成 Commitizen 实现规范提交
    > Commitizen 是一个帮助撰写规范 commit message 的工具。它有一个命令行工具 cz-cli。




## 单元测试

- ` vue-test-utils` + `jest`


## 自动部署

GitHub Actions


## 环境变量





## 其他

### svg-icons的全局引入
插件 vite-plugin-svg-icons
- 配置指南：https://github.com/anncwb/vite-plugin-svg-icons/blob/main/README.zh_CN.md



### element-plus引入
- 全局引入
- 按需加载



### 路由配置

- 动态路由

- 权限配置


- history模式


### 本地模拟mock

https://blog.csdn.net/weixin_42067720/article/details/115579817







# vue3

## 新用法

- computed
- reactive
- defineProps


## vue-router
- [迁移指南](https://next.router.vuejs.org/zh/guide/migration/index.html)



## vuex
- [迁移指南](https://next.vuex.vuejs.org/zh/guide/migrating-to-4-0-from-3-x.html)


# typescript

- shims-vue.d.ts的作用

- tsconfig.json
> 如果一个目录下存在一个tsconfig.json文件，那么它意味着这个目录是TypeScript项目的根目录。 tsconfig.json文件中指定了用来编译这个项目的根文件和编译选项。

https://www.tslang.cn/docs/handbook/tsconfig-json.html



# rollup打包

## 文件拆分








# 参考

- [从 0 开始手把手带你搭建一套规范的 Vue3.x 项目工程环境](https://juejin.cn/post/6951649464637636622)




