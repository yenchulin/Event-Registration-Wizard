<script setup>
import { computed, ref } from 'vue'
import SessionCard from '@/components/wizard/general/SessionCard.vue'
import { useRegistrationWizard } from '@/composables/useRegistrationWizard'
import moment from 'moment'

const { eventDates, sessionsByDay } = useRegistrationWizard()

const selectedDate = ref(eventDates.value[0])

const dayTabs = computed(() =>
  eventDates.value.map((date) => ({
    id: date,
    label: moment(date).format('MMM DD'),
  }))
)
const sessionsForSelectedDay = computed(() => sessionsByDay.value[selectedDate.value] ?? [])

function selectDate(dateId) {
  selectedDate.value = dateId
}
</script>

<template>
  <section class="grid gap-6">
    <span class="text-h3 text-neutral">Select Sessions</span>

    <div class="flex gap-1 w-fit rounded-[10px] p-1 bg-surface-l2">
      <button
        v-for="tab in dayTabs"
        :key="tab.id"
        type="button"
        class="px-4 py-2 rounded-lg transition-colors border-0 text-[13px]"
        :class="[
          selectedDate === tab.id
            ? 'bg-brand-emphasis-rest text-inverse font-semibold'
            : 'bg-transparent text-neutral-muted font-medium cursor-pointer',
        ]"
        @click="selectDate(tab.id)"
      >
        {{ tab.label }}
      </button>
    </div>

    <span class="text-body-sm-medium text-brand-emphasis">0 sessions selected</span>

    <div class="grid grid-cols-2 gap-4">
      <session-card
        v-for="session in sessionsForSelectedDay"
        :key="session.id"
        :session="session"
      />
    </div>
  </section>
</template>
