module.exports = {
    "env": { // 指定代码运行的宿主环境
        "browser": true,
        "es2021": true,
        "node": true
    },    
    "parserOptions": { // 设置解析器选项
        "ecmaVersion": 13,
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "extends": [ // 指定eslint规范
        "plugin:vue/base",
        // "airbnb-base",
        // 'plugin:prettier/recommended'
    ],
    "plugins": [ // 引用第三方的插件,插件名称可以省略 eslint-plugin- 前缀
        "vue",
        "@typescript-eslint"
    ],
    "rules": { // 规则
        "indent": ["warn", 4, { "SwitchCase": 1 }],
        "quotes": ["error", "single", { "allowTemplateLiterals": true }],
        "semi": ["warn", "always"],
        "vue/html-self-closing": ["warn", {
            "html": {
                "void": "any",
                "normal": "any",
                "component": "any"
            }
        }],
        "vue/script-indent": ["error", 4, { "baseIndent": 0, "switchCase": 1}]
    }
};
