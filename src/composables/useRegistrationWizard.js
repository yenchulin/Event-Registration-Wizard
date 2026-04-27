import { computed, reactive, ref } from 'vue'
import { event } from '@/mocks/event'

const selectedTicketTypeId = ref(event.ticketTypes[0]?.id ?? '')
const ticketTypes = computed(() => event.ticketTypes)

function selectTicketType(ticketTypeId) {
  selectedTicketTypeId.value = ticketTypeId
}

const attendee = reactive({
  fullName: '',
  email: '',
  phone: '',
  company: '',
  jobTitle: '',
  shippingAddress: '',
})

export function useRegistrationWizard() {
  return {
    attendee,
    ticketTypes,
    selectedTicketTypeId,
    selectTicketType,
  }
}
