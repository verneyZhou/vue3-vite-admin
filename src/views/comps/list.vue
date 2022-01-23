<template>
<div class=''>
    <p>固定时间点</p>
    <el-time-select
        v-model="value"
        start="08:30"
        step="00:15"
        end="18:30"
        placeholder="Select time"
    >
    </el-time-select>
    <p>树形控件</p>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />

    <div>
        <el-link href="https://element-plus.gitee.io/zh-CN/" target="_blank">default</el-link>
        <el-link type="primary">primary</el-link>
        <el-link type="success">success</el-link>
        <el-link type="warning">warning</el-link>
        <el-link type="danger">danger</el-link>
        <el-link type="info">info</el-link>
    </div>

     <el-row>
      <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
    </el-row>

      <p>svg-icon</p>
      <svg-icon icon-class="dashboard"></svg-icon>
      <svg-icon icon-class="example"></svg-icon>
      <svg-icon icon-class="eye-open"></svg-icon>

      <p>el-icon</p>
      <el-icon><edit /></el-icon>
      <el-icon><aim /></el-icon>
      <el-icon><add-location /></el-icon>
      <el-icon><apple /></el-icon>

</div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      value: '',
      data: [
        {
          label: 'Level one 1',
          children: [
            {
              label: 'Level two 1-1',
              children: [
                {
                  label: 'Level three 1-1-1',
                },
              ],
            },
          ],
        },
        {
          label: 'Level one 2',
          children: [
            {
              label: 'Level two 2-1',
              children: [
                {
                  label: 'Level three 2-1-1',
                },
              ],
            },
            {
              label: 'Level two 2-2',
              children: [
                {
                  label: 'Level three 2-2-1',
                },
              ],
            },
          ],
        },
        {
          label: 'Level one 3',
          children: [
            {
              label: 'Level two 3-1',
              children: [
                {
                  label: 'Level three 3-1-1',
                },
              ],
            },
            {
              label: 'Level two 3-2',
              children: [
                {
                  label: 'Level three 3-2-1',
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
  },
}
</script>
<style lang='less' scoped>
//@import url();

</style>