<template>
  <span :style="{ color }">
    {{ value }}
  </span>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, watchEffect, unref, onMounted, watch } from 'vue';
  import { useTransition, TransitionPresets } from '@vueuse/core';
  import { isNumber } from '@/utils/is';

  // 属性
  const props = {
    startVal: { type: Number, default: 0 },
    endVal: { type: Number, default: 2021 },
    duration: { type: Number, default: 1500 },
    autoplay: { type: Boolean, default: true },
    decimals: {
      type: Number,
      default: 0,
      validator(value: number) {
        return value >= 0;
      },
    },
    prefix: { type: String, default: '' },
    suffix: { type: String, default: '' },
    separator: { type: String, default: ',' },
    decimal: { type: String, default: '.' },
    /**
     * font color
     */
    color: { type: String },
    /**
     * Turn on digital animation
     */
    useEasing: { type: Boolean, default: true },
    /**
     * Digital animation
     */
    transition: { type: String, default: 'linear' },
  };

export default defineComponent({
    name: 'CountTo',
    props,
    emits: ['onStarted', 'onFinished'],
    setup(props, { emit }) {
        const source = ref(props.startVal);
        const disabled = ref(false);
        let outputValue = useTransition(source);

        const value = computed(() => formatNumber(unref(outputValue)));

        // watchEffect 不需要指定监听的属性，他会自动的收集依赖， 只要我们回调中引用到了 响应式的属性， 那么当这些属性变更的时候，这个回调都会执行
        watchEffect(() => {
            source.value = props.startVal;
        });

        watch([() => props.startVal, () => props.endVal], () => {
            if (props.autoplay) {
                start(); // 自动开始
            }
        });


        onMounted(() => {
            props.autoplay && start(); // 自动开始
        });

        // 开始
        function start() {
            run();
            source.value = props.endVal;
        }
        
        // 重置
        function reset() {
            source.value = props.startVal;
            run();
        }

        // 动态改变 outputValue 
        function run() {
            // 调用 vueuse 的 useTransition 方法
            outputValue = useTransition(source, {
                disabled,
                duration: props.duration,
                onFinished: () => emit('onFinished'), // 结束
                onStarted: () => emit('onStarted'), // 开始
                ...(props.useEasing ? { transition: TransitionPresets[props.transition] } : {}),
            });
        }

        // 格式化数字
        function formatNumber(num: number | string) {
            if (!num && num !== 0) {
                return '';
            }
            const { decimals, decimal, separator, suffix, prefix } = props;
            num = Number(num).toFixed(decimals);
            num += '';

            const x = num.split('.');
            let x1 = x[0];
            const x2 = x.length > 1 ? decimal + x[1] : '';

            const rgx = /(\d+)(\d{3})/;
            if (separator && !isNumber(separator)) {
                while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + separator + '$2');
                }
            }
            return prefix + x1 + x2 + suffix;
        }

        return { value, start, reset };
    },
});
</script>
