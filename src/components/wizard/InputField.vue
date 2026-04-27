<script setup>
defineProps({
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
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="grid gap-[6px]">
    <span class="text-body-sm-medium text-neutral">{{ label }}</span>
    <q-input
      :model-value="modelValue"
      outlined
      :placeholder="placeholder"
      :type="type"
      @update:model-value="emit('update:modelValue', $event)"
      input-class="text-body-lg-regular text-neutral"
    />
  </div>
</template>
