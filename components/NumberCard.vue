<script setup lang="ts">
import { computed } from 'vue'
import { colorMap } from './colors'

const props = withDefaults(defineProps<{
  number: number
  title: string
  color?: string
}>(), {
  color: 'teal',
})

const colors = computed(() => colorMap[props.color] ?? colorMap.teal)
const padded = computed(() => String(props.number).padStart(2, '0'))
</script>

<template>
  <div
    class="rounded-lg bg-white/5 border border-white/10 px-4 py-3 relative"
  >
    <div class="flex items-start gap-3">
      <span
        class="text-2xl font-bold opacity-80 leading-none mt-0.5"
        :class="[colors.text]"
      >{{ padded }}</span>
      <div>
        <div class="font-bold text-sm mb-1">{{ title }}</div>
        <div class="text-xs opacity-70 leading-relaxed">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
