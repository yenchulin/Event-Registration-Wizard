import { computed, reactive, ref } from 'vue'
import { event } from '@/mocks/event'
import { sessions } from '@/mocks/sessions'
import { addons } from '@/mocks/addons'
import moment from 'moment'

const attendee = reactive({
  fullName: '',
  email: '',
  phone: '',
  company: '',
  jobTitle: '',
  shippingAddress: '',
})

const selectedTicketTypeId = ref(event.ticketTypes[0]?.id ?? '')
const ticketTypes = computed(() => event.ticketTypes)

function selectTicketType(ticketTypeId) {
  selectedTicketTypeId.value = ticketTypeId
}

const selectedSessionIds = ref(new Set([]))
const eventDates = computed(() => event.dates ?? [])
const sessionsByDay = computed(() => {
  const grouped = {}
  sessions.forEach((s) => {
    const dayKey = moment(s.date).format('YYYY-MM-DD')
    if (grouped[dayKey]) {
      grouped[dayKey].push(s)
    } else {
      grouped[dayKey] = [s]
    }
  })
  return grouped
})

function toggleSession(sessionId) {
  if (selectedSessionIds.value.has(sessionId)) {
    selectedSessionIds.value.delete(sessionId)
  } else {
    selectedSessionIds.value.add(sessionId)
  }
}

const addonsByCategory = computed(() => {
  const grouped = {}
  addons.forEach((a) => {
    if (grouped[a.category]) {
      grouped[a.category].push(a)
    } else {
      grouped[a.category] = [a]
    }
  })
  return grouped
})
const addonCategories = computed(() => Object.keys(addonsByCategory.value ?? {}))

export function useRegistrationWizard() {
  return {
    attendee,
    ticketTypes,
    selectedTicketTypeId,
    selectTicketType,
    selectedSessionIds,
    eventDates,
    sessionsByDay,
    toggleSession,
    addonsByCategory,
    addonCategories,
  }
}
