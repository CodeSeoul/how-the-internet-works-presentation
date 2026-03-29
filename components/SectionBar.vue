<script setup lang="ts">
import { computed } from 'vue'
import { colorMap } from './colors'

const props = withDefaults(defineProps<{
  color?: string
}>(), {
  color: 'teal',
})

const colors = computed(() => colorMap[props.color] ?? colorMap.teal)
</script>

<template>
  <div class="flex items-center gap-3 mb-2">
    <div class="w-1 h-6 rounded-full" :class="[colors.badge]" />
    <div class="font-bold text-lg">
      <slot />
    </div>
  </div>
</template>
