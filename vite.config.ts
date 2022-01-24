import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx' // 支持jsx语法
import viteSvgIcons from 'vite-plugin-svg-icons' // 导入svg-icon
import { viteMockServe } from 'vite-plugin-mock' // mock
import legacy from '@vitejs/plugin-legacy' // 为打包后的文件提供传统浏览器兼容性支持

import rollupImportVariables from 'rollup-plugin-dynamic-import-variables';

import setting from './src/settings'
const prodMock = setting.openProdMock

import path from "path";

// 配置参考：https://vitejs.cn/config/

export default ({command, mode}: any) => {

  console.log('===command', command, mode);

  return defineConfig({
    base: "./", // 打包路径
    define: {
      // 解决报错：Uncaught ReferenceError: process is not defined
      'process.platform': null,
      'process.version': null
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // 设置 @ 指向 src 目录
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'] // 导入时想要省略的扩展名列表
    },
    server: {
      port: 8091, // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      // proxy: { // 代理
  
      // },
    },
    // 指定传递给 CSS 预处理器的选项
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "@/styles/variables.less";`
        },
        
      }
    },
    plugins: [
      // 插件
      vue(),
      vueJsx(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      }),
      viteSvgIcons({
        // config svg dir that can config multi
        iconDirs: [
          path.resolve(process.cwd(), 'src/assets/svg/common'),
          path.resolve(process.cwd(), 'src/assets/svg/nav-bar')
        ],
        // appoint svg icon using mode
        symbolId: 'icon-[dir]-[name]'
      }),
      viteMockServe({
        supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
        mockPath: 'mock', // 设置模拟.ts 文件的存储文件夹: 根目录下 mock/ 文件夹
        localEnabled: command === 'serve', // 设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
        prodEnabled: true || command !== 'serve' && prodMock, // 设置打包是否启用 mock 功能
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `, // 如果生产环境开启了 mock 功能,即prodEnabled=true.则该代码会被注入到injectFile对应的文件的底部; 这样做的好处是,可以动态控制生产环境是否开启 mock 且在没有开启的时候 mock.js 不会被打包。如果代码直接写在main.ts内，则不管有没有开启,最终的打包都会包含mock.js
        injectFile:`path.resolve(process.cwd(), 'src/main.{ts,js}')`, // injectCode代码注入的文件,默认为项目根目录下src/main.{ts,js}
        logger: true // 是否在控制台显示请求日志
      })
    ],
    build:{ // 构建
      minify: 'terser',
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        plugins:[
          rollupImportVariables()
        ]
      },
    },
    optimizeDeps: { // 依赖预构建优化
      include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en']
    }
  });  
}

