<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  error: {
    type: Object,
    default: { required: '', format: '' },
  },
})

const emit = defineEmits(['update:modelValue'])

const labelClass = computed(() => {
  return props.error.required !== '' || props.error.format !== '' ? 'text-danger' : 'text-neutral'
})
</script>

<template>
  <div class="grid gap-[6px]">
    <span class="text-body-sm-medium" :class="labelClass">{{ label }}</span>
    <q-input
      :model-value="modelValue"
      outlined
      :placeholder="placeholder"
      :type="type"
      @update:model-value="emit('update:modelValue', $event)"
      input-class="text-body-lg-regular text-neutral"
      :error="error.required !== '' || error.format !== ''"
      :error-message="error.required || error.format"
      :no-error-icon="true"
    />
  </div>
</template>
