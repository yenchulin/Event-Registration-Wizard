<script setup>
import { useWizardSteps } from '@/composables/useWizardSteps'

defineProps({
  title: { type: String, required: true },
  stepId: { type: Number, default: 0 },
})

const { goToStep } = useWizardSteps()
</script>

<template>
  <div class="grid gap-3 p-5 rounded-md border border-solid border-neutral-muted bg-surface-l1">
    <div class="flex justify-between items-center">
      <span class="text-subtitle1 text-neutral">{{ title }}</span>
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
