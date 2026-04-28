<script setup>
import { computed } from 'vue'
import { formatCurrency } from '@/utils'
import moment from 'moment'

const { addon, selected, hasTimeConflict } = defineProps({
  addon: { type: Object, required: true },
  selected: { type: Boolean, default: false },
  hasTimeConflict: { type: Boolean, default: false },
})

const emit = defineEmits(['toggle'])

const timeRange = computed(
  () => `${moment(addon.date).format('MMM DD, h:mm A')} - ${moment(addon.endDate).format('h:mm A')}`
)
const remainingSpots = computed(() => Math.max(addon.capacity - addon.registered, 0))

const cardClass = computed(() => {
  if (hasTimeConflict || remainingSpots.value === 0) {
    return 'border-neutral-muted bg-surface-l2'
  } else if (selected) {
    return 'border-brand-emphasis bg-brand-muted-rest cursor-pointer'
  } else {
    return 'border-neutral-muted bg-surface-l0 cursor-pointer'
  }
})

function handleToggle(event) {
  if (hasTimeConflict || remainingSpots.value === 0) return
  emit('toggle', addon.id, event)
}
</script>

<template>
  <button
    type="button"
    class="flex flex-col gap-2 text-left p-4 rounded-md border-2 border-solid transition-colors"
    :class="cardClass"
    @click="handleToggle"
  >
    <div class="flex justify-between items-center">
      <span class="text-subtitle1 text-neutral">{{ addon.name }}</span>
      <span class="text-subtitle1 text-neutral">{{ formatCurrency(addon.price) }}</span>
    </div>

    <span class="text-body-sm-regular text-neutral-muted">{{ addon.description }}</span>

    <span v-if="addon.date && addon.endDate" class="text-body-xs-regular text-neutral-quiet">{{
      timeRange
    }}</span>

    <span
      v-if="addon.capacity !== undefined && remainingSpots > 0"
      class="text-body-xs-regular text-neutral-quiet"
      >{{ remainingSpots }} {{ `${remainingSpots <= 1 ? 'spot' : 'spots'}` }} left</span
    >
    <span v-else-if="addon.capacity !== undefined" class="text-body-xs-medium text-neutral-quiet"
      >Sold Out</span
    >
  </button>
</template>
