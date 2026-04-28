<script setup>
import { computed } from 'vue'
import { formatCurrency } from '@/utils'

const { addon, selectedOption } = defineProps({
  addon: { type: Object, required: true },
  selectedOption: { type: Object, required: true },
})

const emit = defineEmits(['selectSize', 'addQuantity', 'removeQuantity'])

const maxQuantity = computed(() => addon.maxQuantity ?? 1)
const cardClass = computed(() => {
  if (selectedOption.quantity > 0) {
    return 'border-brand-emphasis bg-brand-muted-rest'
  } else {
    return 'border-neutral-muted bg-surface-l0'
  }
})

function handleSelectSize(size) {
  emit('selectSize', addon.id, size)
}

function handleAddQuantity(event) {
  emit('addQuantity', addon.id, event)
}

function handleRemoveQuantity(event) {
  emit('removeQuantity', addon.id, event)
}
</script>

<template>
  <div
    class="w-full flex flex-col gap-2 text-left p-4 rounded-md border-2 border-solid transition-colors"
    :class="cardClass"
  >
    <div class="flex justify-between items-center">
      <span class="text-subtitle1 text-neutral">{{ addon.name }}</span>
      <span class="text-subtitle1 text-neutral">{{ formatCurrency(addon.price) }}</span>
    </div>

    <span class="text-body-sm-regular text-neutral-muted">{{ addon.description }}</span>

    <div class="flex items-center gap-4">
      <div v-if="addon.sizes" class="flex items-center gap-2">
        <span class="text-body-sm-regular text-neutral-muted">Size:</span>
        <q-select
          dense
          outlined
          emit-value
          map-options
          options-dense
          :options="addon.sizes.map((size) => ({ label: size, value: size }))"
          :model-value="selectedOption.size"
          @update:model-value="handleSelectSize"
          class="w-[94px]"
          input-class="text-body-sm-regular text-neutral"
        />
      </div>

      <div class="flex items-center gap-2">
        <span class="text-body-sm-regular text-neutral-muted">Qty:</span>
        <button
          type="button"
          @click="handleRemoveQuantity"
          :disabled="selectedOption.quantity <= 0"
          class="h-7 w-7 rounded-md border-0"
        >
          <q-icon name="remove" />
        </button>
        <span class="text-subtitle2 text-neutral">{{ selectedOption.quantity }}</span>
        <button
          type="button"
          @click="handleAddQuantity"
          :disabled="selectedOption.quantity >= maxQuantity"
          class="h-7 w-7 rounded-md border-0"
        >
          <q-icon name="add" />
        </button>
      </div>

      <span class="text-[10px] text-neutral-quiet">max {{ maxQuantity }}</span>
    </div>

    <div v-if="selectedOption.quantity > 0" class="flex items-center gap-1">
      <q-icon name="check" class="text-success-emphasis" />
      <span class="text-body-xs-medium text-success">Added to order</span>
    </div>
  </div>
</template>
