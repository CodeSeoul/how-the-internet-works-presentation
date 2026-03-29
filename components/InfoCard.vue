<script setup lang="ts">
import { computed } from 'vue'
import { colorMap } from './colors'

const props = withDefaults(defineProps<{
  title: string
  icon?: string
  color?: string
  subtitle?: string
}>(), {
  color: 'teal',
})

const colors = computed(() => colorMap[props.color] ?? colorMap.teal)
</script>

<template>
  <div
    class="rounded-lg border-l-4 bg-white/5 px-4 py-3"
    :class="[colors.border]"
  >
    <div class="flex items-center gap-2 mb-1">
      <span v-if="icon" class="text-base">{{ icon }}</span>
      <span class="font-bold" :class="[colors.text]">{{ title }}</span>
    </div>
    <div v-if="subtitle" class="text-xs opacity-60 mb-1">{{ subtitle }}</div>
    <div class="text-sm opacity-80 leading-relaxed">
      <slot />
    </div>
  </div>
</template>
