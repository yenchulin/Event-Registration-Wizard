import { computed, reactive, ref } from 'vue'
import { event } from '../mocks/event'

const selectedTicketTypeId = ref(event.ticketTypes[0]?.id ?? '')
const ticketTypes = computed(() => event.ticketTypes)

function selectTicketType(ticketTypeId) {
  selectedTicketTypeId.value = ticketTypeId
}

export function useRegistrationWizard() {
  return {
    ticketTypes,
    selectedTicketTypeId,
    selectTicketType,
  }
}
