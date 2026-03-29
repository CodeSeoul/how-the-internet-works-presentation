<script setup lang="ts">
import { computed } from 'vue'
import { colorMap } from './colors'

const props = withDefaults(defineProps<{
  leftTitle?: string
  rightTitle?: string
  leftColor?: string
  rightColor?: string
  leftIcon?: string
  rightIcon?: string
}>(), {
  leftColor: 'red',
  rightColor: 'green',
})

const leftColors = computed(() => colorMap[props.leftColor] ?? colorMap.red)
const rightColors = computed(() => colorMap[props.rightColor] ?? colorMap.green)
</script>

<template>
  <div class="grid grid-cols-2 gap-6">
    <div
      class="rounded-xl border p-5"
      :class="[leftColors.border, leftColors.bg]"
    >
      <div v-if="leftTitle" class="font-bold mb-2 flex items-center gap-2" :class="[leftColors.text]">
        <span v-if="leftIcon">{{ leftIcon }}</span>
        {{ leftTitle }}
      </div>
      <slot name="left" />
    </div>
    <div
      class="rounded-xl border p-5"
      :class="[rightColors.border, rightColors.bg]"
    >
      <div v-if="rightTitle" class="font-bold mb-2 flex items-center gap-2" :class="[rightColors.text]">
        <span v-if="rightIcon">{{ rightIcon }}</span>
        {{ rightTitle }}
      </div>
      <slot name="right" />
    </div>
  </div>
</template>
