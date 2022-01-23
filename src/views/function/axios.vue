<template>
  <div>
    axios
    <el-button @click="onAxios">获取用户信息</el-button>
    <vue-json-pretty
      v-if="result"
      :path="'res'"
      :deep="3"
      :showLength="true"
      :data="result"
  ></vue-json-pretty>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "@/services/axios";

export default defineComponent({
  setup() {

    let result = ref('');

    const onAxios = () => {
      axios.get("/api/user/info")
      .then((res) => {
        console.log("res: ", res);
        result.value = res;
      })
      .catch((err) => {
        console.log("err: ", err);
        result.value = err;
      });
    };

    return {
      result,
      onAxios
    }
  },


});
</script>
