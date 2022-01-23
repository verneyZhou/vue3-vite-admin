<template>
  <div class="home">

    <!-- 轮播 -->
    <el-carousel height="150px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
    </el-carousel>

    <!-- 卡片 -->
    <grow-card :loading="loading"></grow-card>    

    <!-- echart -->
    <EchartCard :loading="loading"/>

    
  </div>

</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import GrowCard from './comps/grow-card';
  import EchartCard from './comps/echart-card';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
<style lang="less" scoped>
.home {
  // color: red;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
