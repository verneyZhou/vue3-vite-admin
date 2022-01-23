import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    // beforeMounted声明周期
    onBeforeMount(() => {
      const { params, query } = route
      const { path } = params
      // 直接replace到重定向页面
      router.replace({ path: '/' + path, query })
    })
    return () => ''
  }
})
