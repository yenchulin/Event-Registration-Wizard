import { computed, reactive, ref } from 'vue'
import { event } from '@/mocks/event'
import { sessions } from '@/mocks/sessions'
import { addons } from '@/mocks/addons'
import moment from 'moment'

/** attendee info */
const attendee = reactive({
  fullName: '',
  email: '',
  phone: '',
  company: '',
  jobTitle: '',
  shippingAddress: '',
})

/** ticket selection */
const selectedTicketTypeId = ref(event.ticketTypes[0]?.id ?? '')
const ticketTypes = computed(() => event.ticketTypes ?? [])
const selectedTicket = computed(() =>
  ticketTypes.value.find((ticket) => ticket.id === selectedTicketTypeId.value)
)
const ticketPrice = computed(() => selectedTicket.value?.price ?? 0)

function selectTicketType(ticketTypeId) {
  selectedTicketTypeId.value = ticketTypeId
}

/** session selection */
const selectedSessionIds = ref(new Set([]))
const eventDates = computed(() => event.dates ?? [])
const sessionsById = computed(() =>
  Object.fromEntries(sessions.map((session) => [session.id, session]))
)
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
const selectedSessionDateRanges = computed(() => {
  return Array.from(selectedSessionIds.value).map((sessionId) => {
    const session = sessionsById.value[sessionId]
    return {
      date: moment(session.date),
      endDate: moment(session.endDate),
    }
  })
})

function toggleSession(sessionId) {
  if (selectedSessionIds.value.has(sessionId)) {
    selectedSessionIds.value.delete(sessionId)
  } else {
    selectedSessionIds.value.add(sessionId)
  }
}

/** addons selection */
const selectedAddonIds = ref(new Set([]))
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

function toggleAddon(addonId) {
  if (selectedAddonIds.value.has(addonId)) {
    selectedAddonIds.value.delete(addonId)
  } else {
    selectedAddonIds.value.add(addonId)
  }
}
const totalPrice = computed(() => ticketPrice.value)

export function useRegistrationWizard() {
  return {
    /** attendee info */
    attendee,
    /** ticket selection */
    ticketTypes,
    selectedTicketTypeId,
    selectedTicket,
    ticketPrice,
    selectTicketType,
    /** session selection */
    selectedSessionIds,
    eventDates,
    sessionsByDay,
    toggleSession,
    selectedSessionDateRanges,
    /** addons selection */
    addonsByCategory,
    addonCategories,
    selectedAddonIds,
    toggleAddon,
    totalPrice,
  }
}
