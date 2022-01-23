/*使用vue3.0 jsx语法书写*/
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    elIcon: {
      type: Boolean,
      default: false
    }
  },

  // 一个组件选项，在组件被创建之前，props 被解析之后执行。它是组合式 API 的入口。
  setup(props) {
    const { icon } = props
    const renderItem = () => {
      if (icon) {
        return <svg-icon icon-class={icon} className="nav-icon" />
      }
    }
    return () => {
      return renderItem()
    }
  }
})
