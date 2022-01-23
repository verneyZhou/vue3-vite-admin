
<template>
  <div class="echart-card">

    <el-space class="space" wrap size="large">
      <el-skeleton
        v-for="(item, key) in componentList"
        :key="key"
        animated
        :rows="7"
        :loading="loading"
        :class="$style.size"
        :style="{ width: item.width }"
      >
        <template #default>
          <div
            :class="['echart-card', $style.size]"
            :style="{ width: item.width }"
          >
            <h4>{{ item.title }}</h4>
            <component :is="item.component"></component>
          </div>
        </template>
      </el-skeleton>
    </el-space>

  </div>
</template>

<script setup lang="ts">
import { RePie, ReLine, ReBar} from "@/components/ReCharts/index";
import { ref, shallowRef, computed, onBeforeMount } from "vue";

// 属性
defineProps({
    loading: {
      type: Boolean,
    },
  });

const date: Date = new Date();
const componentList = shallowRef([]);



onBeforeMount(() => {
  componentList.value = [
      {
        width: "28.28em",
        title: "GitHub饼图信息",
        component: RePie
      },
      {
        width: "28.28em",
        title: "GitHub折线图信息",
        component: ReLine
      },
      {
        width: "28.28em",
        title: "GitHub柱状图信息",
        component: ReBar
      }
    ];
});
</script>

<style module scoped>
.size {
  height: 335px;
}
</style>

<style lang="scss" scoped>
.echart-card {
  width: 100%;
  height: 100%;

  .space {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 8px;
    padding: 10px;

    .echart-card {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

      h4 {
        margin: 0;
        padding: 20px;
      }
    }
  }
}
</style>
