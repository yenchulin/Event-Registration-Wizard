import { computed, reactive, ref } from 'vue'
import { event } from '@/mocks/event'
import { sessions } from '@/mocks/sessions'
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

export function useRegistrationWizard() {
  return {
    attendee,
    ticketTypes,
    selectedTicketTypeId,
    selectTicketType,
    eventDates,
    sessionsByDay,
  }
}
