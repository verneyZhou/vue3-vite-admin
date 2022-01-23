import { createStore } from 'vuex'
import getters from './getters'
import { ObjTy } from '@/types/common'

// 自动加载，取代之前 webpack 的 require.context
const modulesFiles = import.meta.globEager('./modules/*.ts')
const modules: ObjTy = {}
for (const path in modulesFiles) {
  const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
  modules[moduleName] = modulesFiles[path].default
}
console.log('modules', modules)
export default createStore({
  modules,
  getters
})
