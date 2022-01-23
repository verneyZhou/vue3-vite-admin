<script setup lang="ts">

const props = defineProps({
  graphData: Object
});
</script>

<template>
  <vue-json-pretty
    :path="'res'"
    :deep="3"
    :showLength="true"
    :data="props.graphData"
  ></vue-json-pretty>
</template>
