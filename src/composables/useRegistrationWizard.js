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
const selectedAddons = reactive(
  Object.fromEntries(
    addons.map((addon) => [
      addon.id,
      {
        quantity: 0,
        size: addon.sizes?.[0] ?? '',
      },
    ])
  )
)
const addonsById = computed(() => Object.fromEntries(addons.map((a) => [a.id, a])))
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

function toggleAddon(addonId) {
  if (selectedAddons[addonId].quantity > 0) {
    selectedAddons[addonId].quantity = 0
  } else {
    selectedAddons[addonId].quantity = 1
  }
}

function increaseAddonQuantity(addonId) {
  const addon = addonsById.value[addonId]
  if (!addon || (addon.maxQuantity ?? 1) <= selectedAddons[addonId].quantity) return
  selectedAddons[addonId].quantity += 1
}

function decreaseAddonQuantity(addonId) {
  const addon = addonsById.value[addonId]
  if (!addon || selectedAddons[addonId].quantity <= 0) return
  selectedAddons[addonId].quantity -= 1
}

function updateAddonSize(addonId, size) {
  const addon = addonsById.value[addonId]
  if (!addon || !addon.sizes?.includes(size)) return
  selectedAddons[addonId].size = size
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
    selectedAddons,
    toggleAddon,
    increaseAddonQuantity,
    decreaseAddonQuantity,
    updateAddonSize,
    totalPrice,
  }
}
