<script setup>
import { computed } from 'vue'

const { isPrimary, disabled, onClick } = defineProps({
  isPrimary: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  onClick: { type: Function, required: true },
})

const btnBgColor = computed(() => (isPrimary ? 'bg-accent-emphasis-rest' : 'bg-neutral-muted-rest'))
const btnTextColor = computed(() => (isPrimary ? 'text-inverse' : 'text-neutral-muted'))
</script>

<template>
  <div
    role="button"
    @click="onClick"
    @keydown.enter="onClick"
    @keydown.space.prevent="onClick"
    :class="['inline px-4 py-[10px] rounded-[10px] cursor-pointer select-none', btnBgColor]"
  >
    <span :class="['text-subtitle2', btnTextColor]">
      <slot>Default Text</slot>
    </span>
  </div>
</template>
