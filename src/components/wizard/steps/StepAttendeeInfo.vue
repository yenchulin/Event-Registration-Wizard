<script setup>
import { useRegistrationWizard } from '../../../composables/useRegistrationWizard'

const { ticketTypes, selectedTicketTypeId, selectTicketType } = useRegistrationWizard()
</script>

<template>
  <section>
    <div class="grid gap-4">
      <span class="text-subtitle1 text-neutral">Select Ticket Type</span>

      <div class="grid grid-cols-3 gap-4">
        <button
          v-for="ticket in ticketTypes"
          :key="ticket.id"
          type="button"
          class="flex flex-col gap-3 text-left p-5 rounded-md transition-colors cursor-pointer"
          :class="[
            selectedTicketTypeId === ticket.id
              ? 'border-2 border-brand-emphasis bg-brand-muted-rest'
              : 'border border-neutral-muted bg-surface-l1',
          ]"
          @click="selectTicketType(ticket.id)"
        >
          <div class="flex justify-between items-center">
            <span class="text-subtitle1">{{ ticket.name }}</span>
            <span class="text-subtitle1">${{ ticket.price }}</span>
          </div>
          <span class="text-body-sm-regular text-neutral-muted">{{ ticket.description }}</span>
          <div v-for="perk in ticket.perks" :key="perk" class="flex items-center gap-2">
            <q-icon name="check_circle" />
            <span class="text-body-sm-regular text-neutral-muted">{{ perk }}</span>
          </div>
          <div class="flex-1"></div>
          <div
            class="w-fit flex items-center gap-1 rounded-full px-[9px] py-[3px] bg-success-emphasis-active"
            :class="selectedTicketTypeId === ticket.id ? '' : 'invisible'"
          >
            <q-icon name="check" class="text-inverse" />
            <span class="text-body-xs-medium text-inverse">Selected</span>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>
