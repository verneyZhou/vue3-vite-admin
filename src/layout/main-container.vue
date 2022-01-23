<template>
    <!-- <router-view class="page-content" :class="{ 'show-tag-view': setting.showTagsView }"></router-view> -->

    <!-- 缓动效果 -->
    <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
        <div class="page-content" :class="{ 'show-tag-view': setting.showTagsView }" :key="key">
            <component :is="Component" :key="key" />
        </div>
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import setting from '@/settings'

import { computed } from 'vue'
import { useRoute } from 'vue-router'

const key = computed(() => {
  return useRoute().path
})

</script>



<style lang='less' scoped>
.page-content {
    padding: 10px;
    height: calc(~ '100vh - @{navBarHeight}');
    width: 100%;
    position: relative;
    overflow: auto;
    &.show-tag-view {
        height: calc(~ '100vh - @{navBarHeight} - @{tagViewHeight}') !important;
    }
}
</style>