<script setup>
import moment from 'moment'
import { computed } from 'vue'

const props = defineProps({
  session: { type: Object, required: true },
  selected: { type: Boolean, default: false },
})

const SessionTrack = {
  frontend: 'frontend',
  backend: 'backend',
  devops: 'devops',
  main: 'main',
}

const trackLabel = computed(() => (props.session.track ?? '').toUpperCase())
const timeRange = computed(
  () =>
    `${moment(props.session.date).format('hh:mm A')} - ${moment(props.session.endDate).format('hh:mm A')}`
)
const remainingSpots = computed(() =>
  Math.max(props.session.capacity - props.session.registered, 0)
)
const capacityRatio = computed(() => {
  const cap = Math.max(props.session.capacity, 0)
  if (cap <= 0) {
    return 0
  }
  return Math.min(1, props.session.registered / cap)
})

const cardClass = computed(() => {
  if (remainingSpots.value === 0) return 'border border-neutral-muted bg-surface-l2'
  if (props.selected) return 'border-2 border-brand-emphasis bg-brand-muted-rest cursor-pointer'
  return 'border border-neutral-muted bg-surface-l0 cursor-pointer'
})

const badgeClass = computed(() => {
  switch (props.session.track) {
    case SessionTrack.frontend:
      return 'bg-warning-muted-rest'
    case SessionTrack.backend:
      return 'bg-info-muted-rest'
    case SessionTrack.devops:
      return 'bg-accent-muted-rest'
    case SessionTrack.main:
    default:
      return 'bg-surface-l2'
  }
})

const badgeTextClass = computed(() => {
  switch (props.session.track) {
    case SessionTrack.frontend:
      return 'text-warning-emphasis'
    case SessionTrack.backend:
      return 'text-info-emphasis'
    case SessionTrack.devops:
      return 'text-accent-emphasis'
    case SessionTrack.main:
    default:
      return 'text-neutral-muted'
  }
})

const progressBarClass = computed(() => {
  if (capacityRatio.value === 1) {
    return 'bg-danger-emphasis-rest'
  } else if (capacityRatio.value >= 0.7) {
    return 'bg-accent-bold-rest'
  } else if (capacityRatio.value >= 0.5) {
    return 'bg-warning-bold-rest'
  } else {
    return 'bg-brand-emphasis-rest'
  }
})

const progressBarTextClass = computed(() => {
  if (capacityRatio.value === 1) {
    return 'text-neutral'
  } else if (capacityRatio.value >= 0.7) {
    return 'text-accent-emphasis'
  } else if (capacityRatio.value >= 0.5) {
    return 'text-warning-emphasis'
  } else {
    return 'text-brand-emphasis'
  }
})
</script>

<template>
  <button
    type="button"
    :class="cardClass"
    class="text-left p-4 rounded-[6px] border-solid transition-colors"
  >
    <div class="flex flex-col gap-2">
      <div class="flex justify-between items-center">
        <div
          class="flex justify-between items-center px-[9px] py-[3px] rounded-full"
          :class="badgeClass"
        >
          <span class="text-body-xs-medium" :class="badgeTextClass">{{ trackLabel }}</span>
        </div>
        <div
          class="w-4 h-4 rounded-[2px] border border-solid flex items-center justify-center"
          :class="[
            selected
              ? 'bg-brand-emphasis-rest border-brand-emphasis'
              : 'bg-surface-l0 border-neutral-emphasis',
          ]"
        >
          <q-icon name="check" class="text-inverse" />
        </div>
      </div>

      <span class="text-subtitle1 text-neutral">
        {{ session.title }}
      </span>

      <span class="text-body-sm-regular text-neutral-muted">
        {{ session.speaker }}, {{ session.speakerTitle }}
      </span>

      <span class="text-body-xs-regular text-neutral-quiet">
        {{ timeRange }}
      </span>

      <div class="h-[6px] rounded-full bg-surface-l2">
        <div
          class="h-full rounded-full"
          :class="progressBarClass"
          :style="{ width: `${capacityRatio * 100}%` }"
        ></div>
      </div>

      <span class="text-body-xs-medium" :class="progressBarTextClass" v-if="remainingSpots === 0"
        >Sold Out</span
      >
      <span class="text-body-xs-regular" :class="progressBarTextClass" v-else
        >{{ remainingSpots }} spots left</span
      >
    </div>
  </button>
</template>
