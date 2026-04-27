<script setup>
import { computed } from 'vue'

const { isPrimary, disabled, type } = defineProps({
  isPrimary: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
})

const emit = defineEmits(['click'])

const btnBgColor = computed(() => (isPrimary ? 'bg-accent-emphasis-rest' : 'bg-neutral-muted-rest'))
const btnTextColor = computed(() => (isPrimary ? 'text-inverse' : 'text-neutral-muted'))
const disabledClass = computed(() =>
  disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
)

function handleClick(event) {
  if (disabled) return
  emit('click', event)
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :aria-disabled="disabled"
    @click="handleClick"
    :class="[
      'inline px-4 py-[10px] rounded-[10px] border-0 select-none transition-opacity',
      btnBgColor,
      disabledClass,
    ]"
  >
    <span :class="['text-subtitle2', btnTextColor]">
      <slot>Default Text</slot>
    </span>
  </button>
</template>
