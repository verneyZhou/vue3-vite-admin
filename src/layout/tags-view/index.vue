<template>
  <div id="tags-view-container" class="tags-view-container">
    <div class="tags-view-wrapper">

      <!-- 路由 -->
      <router-link
        v-for="tag in visitedViews"
        ref="refTag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <!-- 是否可关闭 -->
        <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </div>

    <!-- 鼠标右键呼出tab -->
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script setup lang="ts">

/**
 * 备注
 * @click.middle 鼠标中建点击
 * @contextmenu.prevent 鼠标右键点击， 加prevent为了屏蔽浏览器自带右键
 */

// import ScrollPane from './ScrollPane'
import path from 'path'

import { onMounted, getCurrentInstance, watch, toRefs, reactive, computed } from 'vue'
//获取store和router
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { RouterTy, RouteItemTy } from '@/types/router'
import { ObjTy } from '@/types/common'
const store = useStore()
const router = useRouter()
let { proxy }: any = getCurrentInstance()

// 响应式
const state: ObjTy = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {},
  affixTags: []
})

// 可访问的视图
const visitedViews = computed(() => {
  return store.state.tagsView.visitedViews
})

// 路由
const routes = computed(() => {
  return store.state.permission.routes
})

// 监听路由，动态添加
watch(
  () => proxy.$route,
  () => {
    addTags()
    // tag remove has issue
    // moveToCurrentTag()
  }
)
watch(
  () => state.visible,
  (value) => {
    if (value) {
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  }
)

watch(
  () => state.visible,
  (value) => {
    if (value) {
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  }
)

onMounted(() => {
  initTags() // 初始化
  addTags() // 添加路由
})

// 是否是当前路由
const isActive = (route: RouteItemTy) => {
  return route.path === proxy.$route.path
}

// 是否固定（不可删除）
const isAffix = (tag: RouteItemTy) => {
  return tag.meta && tag.meta.affix
}

// 过滤需要固定的路由
const filterAffixTags = (routes: RouterTy, basePath = '/') => {
  let tags: Array<RouteItemTy> = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) { // 需要固定
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) { // 有子路由，递归调用
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

// 初始化：将需要固定的路由，直接添加到路由列表中
const initTags = () => {
  const affixTags = (state.affixTags = filterAffixTags(routes.value))
  for (const tag of affixTags) {
    // Must have tag name
    if (tag.name) {
      store.dispatch('tagsView/addVisitedView', tag)
    }
  }
}

// 添加路由
const addTags = () => {
  const { name } = proxy.$route
  if (name) {
    store.dispatch('tagsView/addView', proxy.$route)
  }
  return false
}

// 刷新
const refreshSelectedTag = (view: RouteItemTy) => {
  store.dispatch('tagsView/delCachedView', view).then(() => {
    const { fullPath } = view
    proxy.$nextTick(() => {
      proxy.$router.replace({
        path: '/redirect' + fullPath
      })
    })
  })
}

// 删除选中路由
const closeSelectedTag = (view: RouteItemTy) => {
  store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view) // 跳至上一个
    }
  })
}

// 关闭其他
const closeOthersTags = () => {
  proxy.$router.push(state.selectedTag)
  store.dispatch('tagsView/delOthersViews', state.selectedTag).then(() => {
    // moveToCurrentTag()
  })
}

// 关闭所有
const closeAllTags = (view: RouteItemTy) => {
  store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
    if (state.affixTags.some((tag: RouteItemTy) => tag.path === view.path)) {
      return
    }
    toLastView(visitedViews, view)
  })
}

// 跳至上一个
const toLastView = (visitedViews: RouterTy, view: RouteItemTy) => {
  const latestView: ObjTy = visitedViews.slice(-1)[0] // 获取最后一个
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === 'Dashboard') {
      // to reload home page
      router.replace({ path: '/redirect' + view.fullPath })
    } else {
      router.push('/')
    }
  }
}

// 鼠标右键，打开menu
const openMenu = (tag: RouteItemTy, e: any) => {
  const menuMinWidth = 105
  const offsetLeft = proxy.$el.getBoundingClientRect().left // container margin left
  const offsetWidth = proxy.$el.offsetWidth // container width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const left = e.clientX - offsetLeft + 15 // 15: margin right

  if (left > maxLeft) {
    state.left = maxLeft
  } else {
    state.left = left
  }
  state.top = e.clientY
  state.visible = true
  state.selectedTag = tag
}

// close
const closeMenu = () => {
  state.visible = false
}
// const handleScroll = () => {
//   closeMenu()
// }


// 导出 template 中会用到的变量
let { visible, top, left, selectedTag } = toRefs(state)
</script>

<style lang="less" scoped>
.tags-view-container {
  height: @tagViewHeight;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 27px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 3px;
      &:first-of-type {
        margin-left: 10px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="less">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    border-radius: 3px;
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
