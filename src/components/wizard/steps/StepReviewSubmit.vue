<script setup>
import { useRegistrationWizard } from '@/composables/useRegistrationWizard'
import ReviewBlock from '@/components/wizard/ReviewBlock.vue'
import { WIZARD_STEP_KEYS } from '@/utils/constants'
import { formatCurrency } from '@/utils'
import moment from 'moment'
import { CATEGORIES } from '@/utils/constants'
import { computed } from 'vue'

const {
  attendee,
  selectedTicket,
  selectedSessions,
  selectedAddons,
  workshopVipDiscount,
  totalPrice,
} = useRegistrationWizard()
const sessionSortByDate = computed(() => {
  return selectedSessions.value.toSorted((a, b) => {
    return moment(a.date).diff(moment(b.date))
  })
})
</script>

<template>
  <section class="grid gap-6">
    <span class="text-h3 text-neutral">Review Your Registration</span>

    <review-block
      :title="WIZARD_STEP_KEYS.attendeeInfo.label"
      :step-id="WIZARD_STEP_KEYS.attendeeInfo.id"
    >
      <div class="flex justify-between items-center">
        <span class="text-body-sm-regular text-neutral-muted">Name</span>
        <span class="text-body-sm-regular text-neutral">{{ attendee.fullName }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-body-sm-regular text-neutral-muted">Email</span>
        <span class="text-body-sm-regular text-neutral">{{ attendee.email }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-body-sm-regular text-neutral-muted">Phone</span>
        <span class="text-body-sm-regular text-neutral">{{ attendee.phone }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-body-sm-regular text-neutral-muted">Company</span>
        <span class="text-body-sm-regular text-neutral">{{ attendee.company }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-body-sm-regular text-neutral-muted">Job Title</span>
        <span class="text-body-sm-regular text-neutral">{{ attendee.jobTitle }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-body-sm-regular text-neutral-muted">Ticket Type</span>
        <span class="text-body-sm-regular text-neutral"
          >{{ selectedTicket.name }} ({{ formatCurrency(selectedTicket.price) }})</span
        >
      </div>

      <div v-if="attendee.shippingAddress" class="flex justify-between items-center">
        <span class="text-body-sm-regular text-neutral-muted">Shipping Address</span>
        <span class="text-body-sm-regular text-neutral">{{ attendee.shippingAddress }}</span>
      </div>
    </review-block>

    <review-block :title="WIZARD_STEP_KEYS.sessions.label" :step-id="WIZARD_STEP_KEYS.sessions.id">
      <div
        v-for="session in sessionSortByDate"
        :key="session.id"
        class="flex justify-between items-center"
      >
        <span class="text-body-sm-regular text-neutral-muted">{{
          moment(session.date).format('MMM DD, h:mm A')
        }}</span>
        <span class="text-body-sm-regular text-neutral">{{ session.title }}</span>
      </div>
    </review-block>

    <review-block :title="WIZARD_STEP_KEYS.addons.label" :step-id="WIZARD_STEP_KEYS.addons.id">
      <div
        v-for="addon in selectedAddons"
        :key="addon.id"
        class="flex justify-between items-center"
      >
        <span class="text-body-sm-regular text-neutral-muted">{{
          CATEGORIES[addon.category].label
        }}</span>
        <span class="text-body-sm-regular text-neutral"
          >{{ addon.name }} ({{ formatCurrency(addon.price) }})</span
        >
      </div>
    </review-block>

    <review-block title="Pricing Summary">
      <div class="flex justify-between items-center">
        <span class="text-body-sm-regular text-neutral-muted"
          >{{ selectedTicket.name }} Ticket</span
        >
        <span class="text-body-sm-regular text-neutral">{{
          formatCurrency(selectedTicket.price)
        }}</span>
      </div>

      <div
        v-for="addon in selectedAddons"
        :key="addon.id"
        class="flex justify-between items-center"
      >
        <span class="text-body-sm-regular text-neutral-muted"
          >{{ addon.name
          }}{{ addon.category === CATEGORIES.merchandise.id ? ` × ${addon.quantity}` : '' }}</span
        >
        <span class="text-body-sm-regular text-neutral">{{
          formatCurrency(addon.price * addon.quantity)
        }}</span>
      </div>

      <div v-if="workshopVipDiscount > 0" class="flex justify-between items-center">
        <span class="text-body-xs-regular text-brand-emphasis">Workshop discount (VIP 10%)</span>
        <span class="text-body-xs-regular text-brand-emphasis"
          >-{{ formatCurrency(workshopVipDiscount) }}</span
        >
      </div>

      <q-separator color="divider-default" />

      <div class="flex justify-between items-center">
        <span class="text-body-sm-medium text-neutral">Grand Total</span>
        <span class="text-body-sm-medium text-neutral">{{ formatCurrency(totalPrice) }}</span>
      </div>
    </review-block>
  </section>
</template>
