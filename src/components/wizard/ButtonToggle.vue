<script setup>
defineProps({
  /** @type {{ id: string, label: string }[]} */
  items: {
    type: Array,
    required: true,
    validator: (value) =>
      value.every(
        (item) =>
          item.id && item.label && typeof item.id === 'string' && typeof item.label === 'string'
      ),
  },
  selected: { type: String, required: true },
})

const emit = defineEmits(['select'])

function selectItem(itemId) {
  emit('select', itemId)
}
</script>

<template>
  <div class="flex gap-1 w-fit rounded-[10px] p-1 bg-surface-l2">
    <button
      v-for="item in items"
      :key="item.id"
      type="button"
      class="px-4 py-2 rounded-lg transition-colors border-0 text-[13px]"
      :class="[
        selected === item.id
          ? 'bg-brand-emphasis-rest text-inverse font-medium'
          : 'bg-transparent text-neutral-muted font-regular cursor-pointer',
      ]"
      @click="selectItem(item.id)"
    >
      {{ item.label }}
    </button>
  </div>
</template>
