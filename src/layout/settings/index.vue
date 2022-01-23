<template>
    <div
        class="settings-handle"
        :style="{top: buttonTop + 'px'}"
        @click="handleShow"
    >
        <el-icon :size="24"><setting /></el-icon>

        <el-drawer v-model="show" size="300px" :with-header="false">
            <div class="drawer-container">
                <h2 class="drawer-title">系统配置</h2>
                <div class="drawer-item">
                    <span>显示 Tags-View</span>
                    <el-switch v-model="state.showTagsView" class="drawer-switch" />
                </div>
                <div class="drawer-item">
                    <span>系统主题</span>
                    <div>
                        <el-radio v-for="(item) in state.themeList" v-model="state.activeTheme" :key="item.value" :label="item.value">{{item.label}}</el-radio>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { ref, reactive, watch, onMounted } from 'vue'
import variables from '@/styles/variables.less'
import { getActiveTheme } from '@/utils/cookie'

const store = useStore()

// 属性
defineProps({
    buttonTop: {
        type: Number,
        default: 250
    }
})

// state
const state = reactive({
  showTagsView: store.state.settings.showTagsView,
  activeTheme: store.state.settings.activeTheme,
  themeList: store.state.settings.themeList
})

// 监听变化
watch(
  () => state.activeTheme,
  (value) => {
    store.commit('settings/CHANGE_SETTING', {
      key: 'activeTheme',
      value
    })
  }
)

watch(
  () => state.showTagsView,
  (value) => {
    store.commit('settings/CHANGE_SETTING', {
      key: 'showTagsView',
      value
    })
  }
)


const show = ref(false);

const handleShow = () => {
    show.value = true;
}


onMounted(() => {
  initTheme() // 初始化
})

const initTheme = () => {
    console.log(getActiveTheme());
    let _theme = getActiveTheme() || 'normal' // 正在应用的主题的名字
    store.commit('settings/CHANGE_SETTING', {
      key: 'activeTheme',
      value: _theme
    })
}



</script>

<style lang='less' scoped>
    .settings-handle {
        width: 48px;
        height: 48px;
        position: absolute;
        right: 0px;
        text-align: center;
        font-size: 24px;
        border-radius: 6px 0 0 6px !important;
        z-index: 10;
        cursor: pointer;
        pointer-events: auto;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        background: @menuBg;
    }

    .drawer-container {
        padding: 24px 0px;
        font-size: 14px;
        line-height: 1.5;
        word-wrap: break-word;

        .drawer-title {
            margin-bottom: 12px;
            color: rgba(0, 0, 0, 0.85);
            font-size: 14px;
            line-height: 22px;
        }

        .drawer-item {
            color: rgba(0, 0, 0, 0.65);
            font-size: 14px;
            padding: 12px 0;
            margin-bottom: 10px;
        }

        .drawer-switch {
            float: right;
        }
    }

</style>

