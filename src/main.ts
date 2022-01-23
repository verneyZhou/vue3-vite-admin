import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

import router from "@/router";
import store from "@/store";

// 全局样式
import '@/styles/index.less';

// 全局引入 element-ui
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";

// 全局注册elment-icon
import * as ElIconModules from '@element-plus/icons'
for(let iconName in ElIconModules){
  let comp = ElIconModules[iconName] || null;
  comp && app.component(comp.name, comp);
}


// vite 引入svg-icon组件
import 'virtual:svg-icons-register'
import svgIcon from '@/components/svg-icon.g.vue'

// 路由权限校验
import './permission'


// json高亮
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";


console.log('=====import.meta.env', import.meta.env);


app.use(router)
  .use(store)
  .use(ElementPlus, { size: "mini", locale: zhCn })
  .component('svg-icon', svgIcon)
  .component('vue-json-pretty', VueJsonPretty)
  .mount("#app");

// 引入指令
import directive from '@/directives'
directive(app)


