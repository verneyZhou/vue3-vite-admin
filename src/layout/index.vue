<template>
    <div id="wrap" class="app-wrapper">

        <!-- 左侧菜单 -->
        <MainSidebar />

        <div id="main" class="main-container">
            <div>

                <!-- 头部 -->
                <MainHeader />

                <!-- tag-views -->
                <TagsView v-if="showTagsView" />

            </div>

            <!-- 内容 -->
            <MainContainer />

            <!-- 设置 -->
            <Settings />
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Layout'
    }
</script>


<script setup lang="ts">
import MainHeader from './header';
import MainSidebar from './menu';
import MainContainer from './main-container.vue';
import TagsView from './tags-view';
import Settings from './settings';

import { getCurrentInstance, computed, watchEffect, nextTick } from 'vue';
import settings from '@/settings'

// getCurrentInstance 支持访问内部组件实例。
let { proxy }: any = getCurrentInstance() // 当前实例

// 是否打开
let opened = computed(() => {
  return proxy.$store.state.app.sidebar.opened
})
// 计算属性 class样式
// let classObj = computed(() => {
//   return {
//     closeSidebar: !opened.value,
//     hideSidebar: !settings.showLeftMenu
//   }
// })

const showTagsView = computed(() => {
  return proxy.$store.state.settings.showTagsView
})


 nextTick(() => {
    // 计算属性 class样式
    watchEffect(() => {
        console.log('====1234', opened.value);
        let el = document.querySelector('.app-wrapper');
        opened.value ? el.classList.remove('closeSidebar') : el.classList.add('closeSidebar');
        settings.showLeftMenu ? el.classList.remove('hideSidebar') : el.classList.remove('hideSidebar');
    })
})


</script>

<style lang='less'>
    .app-wrapper {
        overflow: hidden;
        //display: flex;
        //align-content: start;
        //justify-content: start;
    }
    .main-container {
        min-height: 100%;
        transition: margin-left 0.28s;
        margin-left: @sideBarWidth;
        position: relative;
    }
    .sidebar-container {
        transition: width 0.28s;
        width: @sideBarWidth !important;
        background-color: @menuBg;
        height: 100%;
        position: fixed;
        font-size: 0;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
    }

    // 关闭左侧菜单
    .closeSidebar {
        .sidebar-container {
            width: 54px !important;
        }
        .main-container {
            margin-left: 54px !important;
        }
    }

    // 隐藏菜单
    .hideSidebar {
        .sidebar-container {
            width: 0 !important;
        }
        .main-container {
            margin-left: 0;
        }
    }
</style>