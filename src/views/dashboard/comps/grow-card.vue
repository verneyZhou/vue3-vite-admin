<template>
  <div class="flex-center-start">
    <el-card v-for="(item, index) in growCardList" :key="index" class="box-card">
        
        <!-- 头部 -->
        <template #header>
            <div class="card-header">
                <span>{{item.title}}</span>
                <el-tag :type="item.tag || ''">{{item.action}}</el-tag>
            </div>           
        </template>

        <!-- 骨架屏 -->
        <el-skeleton v-if="loading" :rows="1" animated/>

        <!-- 内容 -->
        <template v-else>
          <h2 class="title">
              <CountTo prefix="$" :startVal="1" :endVal="item.value" />
          </h2>
          <p>
              <span>总{{ item.title }}</span>
              <CountTo prefix="$" :startVal="1" :endVal="item.total" />
          </p> 
        </template>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
  import CountTo from '@/components/count-to';
  import { growCardList } from './data';

  defineProps({
    loading: {
      type: Boolean,
    },
  });
</script>
<style lang="less" scoped>
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .box-card {
        width: 300px;
        margin: 10px;
    }
</style>
