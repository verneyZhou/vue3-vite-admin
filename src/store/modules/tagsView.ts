import setting from '@/settings'
import { RouterTy, RouteItemTy } from '@/types/router'
import { ObjTy } from '@/types/common'


// 定义接口
interface tagsViewTy {
  visitedViews: RouterTy
  cachedViews: RouterTy
}

// state
const state = {
  visitedViews: [], // 可访问的路由
  cachedViews: [] // 缓存路由
}

// 定义方法
const mutations = {
  // 添加可访问路由
  ADD_VISITED_VIEW: (state: tagsViewTy, view: any) => {

    // 防重校验
    if (state.visitedViews.some((v) => v.path === view.path)) return
    
    // 数量限制，更新
    if (state.visitedViews.length >= setting.tagsViewNum) {
      state.visitedViews.pop()
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    } else { // 添加
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    }
  },
  // 添加缓存路由
  ADD_CACHED_VIEW: (state: tagsViewTy, view: any) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  // 删除可访问路由
  DEL_VISITED_VIEW: (state: tagsViewTy, view: any) => {
    // entries()，返回包含了数组的键值对可迭代对象
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  // 删除缓存路由
  DEL_CACHED_VIEW: (state: tagsViewTy, view: any) => {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  // 删除其他
  DEL_OTHERS_VISITED_VIEWS: (state: tagsViewTy, view: any) => {
    state.visitedViews = state.visitedViews.filter((v: any) => {
      return v.meta.affix || v.path === view.path
    })
  },
  DEL_OTHERS_CACHED_VIEWS: (state: tagsViewTy, view: any) => {
    const index = state.cachedViews.indexOf(view.name)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },
  // 删除所有
  DEL_ALL_VISITED_VIEWS: (state: tagsViewTy) => {
    // keep affix tags
    state.visitedViews = state.visitedViews.filter((tag: RouteItemTy) => tag.meta?.affix)
  },
  DEL_ALL_CACHED_VIEWS: (state: tagsViewTy) => {
    state.cachedViews = []
  },
  // 更新
  UPDATE_VISITED_VIEW: (state: tagsViewTy, view: any) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}

const actions = {
  addView({ dispatch }: ObjTy, view: any) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }: ObjTy, view: any) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }: ObjTy, view: any) {
    commit('ADD_CACHED_VIEW', view)
  },

  delView({ dispatch, state }: ObjTy, view: any) {
    return new Promise((resolve) => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delVisitedView({ commit, state }: ObjTy, view: any) {
    return new Promise((resolve) => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delCachedView({ commit, state }: ObjTy, view: any) {
    return new Promise((resolve) => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },

  delOthersViews({ dispatch, state }: ObjTy, view: RouteItemTy) {
    return new Promise((resolve) => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delOthersVisitedViews({ commit, state }: ObjTy, view: RouteItemTy) {
    return new Promise((resolve) => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  delOthersCachedViews({ commit, state }: ObjTy, view: RouteItemTy) {
    return new Promise((resolve) => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },

  delAllViews({ dispatch, state }: ObjTy, view: RouteItemTy) {
    return new Promise((resolve) => {
      dispatch('delAllVisitedViews', view)
      dispatch('delAllCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delAllVisitedViews({ commit, state }: ObjTy) {
    return new Promise((resolve) => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  delAllCachedViews({ commit, state }: ObjTy) {
    return new Promise((resolve) => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },

  updateVisitedView({ commit }: ObjTy, view: RouteItemTy) {
    commit('UPDATE_VISITED_VIEW', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
