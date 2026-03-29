<script setup lang="ts">
import { computed } from 'vue'
import { colorMap, variantDefaults } from './colors'

const props = withDefaults(defineProps<{
  icon?: string
  color?: string
  variant?: 'tip' | 'warning' | 'info' | 'fun'
}>(), {
  variant: 'tip',
})

const resolvedColor = computed(() => props.color ?? variantDefaults[props.variant].color)
const resolvedIcon = computed(() => props.icon ?? variantDefaults[props.variant].icon)
const colors = computed(() => colorMap[resolvedColor.value] ?? colorMap.teal)
</script>

<template>
  <div
    class="flex items-start gap-3 rounded-lg border-l-4 px-4 py-3 mt-4"
    :class="[colors.border, colors.bg]"
  >
    <span class="text-lg flex-shrink-0 mt-0.5">{{ resolvedIcon }}</span>
    <div class="text-sm leading-relaxed opacity-90">
      <slot />
    </div>
  </div>
</template>
