<script setup>
import { useWizardSteps } from '@/composables/useWizardSteps'
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  stepId: { type: Number, default: 0 },
  isInvalid: { type: Boolean, default: false },
})

const { goToStep } = useWizardSteps()

const blockClass = computed(() => {
  if (props.isInvalid) {
    return 'border-danger-emphasis'
  }
  return 'border-neutral-muted'
})

const titleClass = computed(() => {
  if (props.isInvalid) {
    return 'text-danger'
  }
  return 'text-neutral'
})
</script>

<template>
  <div class="grid gap-3 p-5 rounded-md border-2 border-solid bg-surface-l1" :class="blockClass">
    <div class="flex justify-between items-center">
      <span class="text-subtitle1" :class="titleClass">{{ title }}</span>
      <a
        v-if="stepId > 0"
        class="text-body-sm-medium text-teal-500 underline cursor-pointer"
        @click="goToStep(stepId)"
        >Edit → Step {{ stepId }}</a
      >
    </div>
    <slot></slot>
  </div>
</template>
