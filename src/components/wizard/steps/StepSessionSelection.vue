<script setup>
import { computed, ref } from 'vue'
import SessionCard from '@/components/wizard/SessionCard.vue'
import ButtonToggle from '@/components/wizard/ButtonToggle.vue'
import { useRegistrationWizard } from '@/composables/useRegistrationWizard'
import moment from 'moment'

const { eventDates, sessionsByDay, selectedSessionIds, toggleSession } = useRegistrationWizard()

const selectedDate = ref(eventDates.value[0])

const dateTabs = computed(() =>
  eventDates.value.map((date) => ({
    id: date,
    label: moment(date).format('MMM DD'),
  }))
)
const sessionsForSelectedDay = computed(() => sessionsByDay.value[selectedDate.value] ?? [])
const selectedSessionCount = computed(() => selectedSessionIds.value.size)

function selectDate(dateId) {
  selectedDate.value = dateId
}
</script>

<template>
  <section class="grid gap-6">
    <span class="text-h3 text-neutral">Select Sessions</span>

    <button-toggle :items="dateTabs" :selected="selectedDate" @select="selectDate" />

    <span class="text-body-sm-medium text-brand-emphasis">
      {{ selectedSessionCount }}
      {{ selectedSessionCount <= 1 ? 'session' : 'sessions' }} selected</span
    >

    <div class="grid grid-cols-2 gap-4">
      <session-card
        v-for="session in sessionsForSelectedDay"
        :key="session.id"
        :session="session"
        :selected="selectedSessionIds.has(session.id)"
        @toggle="toggleSession"
      />
    </div>
  </section>
</template>
