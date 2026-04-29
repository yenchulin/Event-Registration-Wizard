<script setup>
import { useRegistrationWizard } from '@/composables/useRegistrationWizard'
import InputField from '@/components/wizard/InputField.vue'
import { formatCurrency } from '@/utils'

const {
  attendee,
  attendeeErrorMsgs,
  isShippingRequired,
  ticketTypes,
  selectedTicketTypeId,
  selectTicketType,
} = useRegistrationWizard()
</script>

<template>
  <section class="grid gap-8">
    <div class="grid gap-4">
      <span class="text-subtitle1 text-neutral">Select Ticket Type</span>

      <div class="grid grid-cols-3 gap-4">
        <button
          v-for="ticket in ticketTypes"
          :key="ticket.id"
          type="button"
          class="flex flex-col gap-3 text-left p-5 rounded-md border-2 border-solid transition-colors cursor-pointer"
          :class="[
            selectedTicketTypeId === ticket.id
              ? 'border-brand-emphasis bg-brand-subtle-rest'
              : 'border-neutral-muted bg-surface-l1',
          ]"
          @click="selectTicketType(ticket.id)"
        >
          <div class="flex justify-between items-center">
            <span class="text-subtitle1">{{ ticket.name }}</span>
            <span class="text-subtitle1">{{ formatCurrency(ticket.price) }}</span>
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

    <div class="grid gap-8">
      <span class="text-h3 text-neutral">Attendee Information</span>

      <div class="grid gap-5">
        <div class="grid grid-cols-2 gap-4">
          <input-field
            v-model="attendee.fullName"
            label="Full Name *"
            placeholder="Enter your full name"
            :error="attendeeErrorMsgs.fullName"
          />
          <input-field
            v-model="attendee.email"
            label="Email *"
            placeholder="Enter your email"
            type="email"
            :error="attendeeErrorMsgs.email"
          />
          <input-field
            v-model="attendee.phone"
            label="Phone *"
            placeholder="Enter your phone number"
            type="tel"
            :error="attendeeErrorMsgs.phone"
          />
          <input-field
            v-model="attendee.company"
            label="Company *"
            placeholder="Enter your company"
            :error="attendeeErrorMsgs.company"
          />
        </div>
        <input-field
          v-model="attendee.jobTitle"
          label="Job Title *"
          placeholder="Enter your job title"
          :error="attendeeErrorMsgs.jobTitle"
        />
        <input-field
          v-model="attendee.shippingAddress"
          :label="isShippingRequired ? 'Shipping Address *' : 'Shipping Address (Optional)'"
          placeholder="Enter your shipping address"
          :error="attendeeErrorMsgs.shippingAddress"
        />
      </div>
    </div>
  </section>
</template>
