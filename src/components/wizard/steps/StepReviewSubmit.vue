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
  attendeeErrorMsgs,
  isAttendeeValid,
  selectedTicket,
  selectedSessions,
  selectedAddons,
  workshopVipDiscount,
  isShippingRequired,
  totalPrice,
} = useRegistrationWizard()

const errorAttendeeInfo = computed(() =>
  Object.entries(attendeeErrorMsgs).reduce((acc, [key, error]) => {
    if (error.required !== '' || error.format !== '') {
      acc[key] = error
    }
    return acc
  }, {})
)

const sessionSortByDate = computed(() => {
  return selectedSessions.value.toSorted((a, b) => {
    return moment(a.date).diff(moment(b.date))
  })
})
</script>

<template>
  <section class="grid gap-6">
    <span class="text-h3 text-neutral">Review Your Registration</span>

    <div
      v-if="!isAttendeeValid"
      class="flex flex-col grid gap-2 p-4 border border-solid border-danger-muted rounded-md bg-danger-muted-rest"
    >
      <span class="text-body-sm-medium text-danger"
        >Please fix the following errors before submitting</span
      >
      <span
        v-for="error in errorAttendeeInfo"
        :key="error.key"
        class="text-body-sm-regular text-danger"
        >• Step 1: {{ error.required || error.format }}</span
      >
    </div>

    <review-block
      title="Attendee Information"
      :step-id="WIZARD_STEP_KEYS.attendeeInfo.id"
      :is-invalid="!isAttendeeValid"
    >
      <div class="flex justify-between items-center">
        <span class="text-body-sm-regular text-neutral-muted">Name</span>
        <span v-if="attendeeErrorMsgs.fullName.required" class="text-body-sm-regular text-danger"
          >— (required)</span
        >
        <span v-else class="text-body-sm-regular text-neutral">{{ attendee.fullName }} </span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-body-sm-regular text-neutral-muted">Email</span>
        <span v-if="attendeeErrorMsgs.email.required" class="text-body-sm-regular text-danger"
          >— (required)</span
        >
        <span v-else-if="attendeeErrorMsgs.email.format" class="text-body-sm-regular text-danger">{{
          attendee.email
        }}</span>
        <span v-else class="text-body-sm-regular text-neutral">{{ attendee.email }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-body-sm-regular text-neutral-muted">Phone</span>
        <span v-if="attendeeErrorMsgs.phone.required" class="text-body-sm-regular text-danger"
          >— (required)</span
        >
        <span v-else-if="attendeeErrorMsgs.phone.format" class="text-body-sm-regular text-danger">{{
          attendee.phone
        }}</span>
        <span v-else class="text-body-sm-regular text-neutral">{{ attendee.phone }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-body-sm-regular text-neutral-muted">Company</span>
        <span v-if="attendeeErrorMsgs.company.required" class="text-body-sm-regular text-danger"
          >— (required)</span
        >
        <span v-else class="text-body-sm-regular text-neutral">{{ attendee.company }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-body-sm-regular text-neutral-muted">Job Title</span>
        <span v-if="attendeeErrorMsgs.jobTitle.required" class="text-body-sm-regular text-danger"
          >— (required)</span
        >
        <span v-else class="text-body-sm-regular text-neutral">{{ attendee.jobTitle }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-body-sm-regular text-neutral-muted">Ticket Type</span>
        <span class="text-body-sm-regular text-neutral"
          >{{ selectedTicket.name }} ({{ formatCurrency(selectedTicket.price) }})</span
        >
      </div>

      <div v-if="isShippingRequired" class="flex justify-between items-center">
        <span class="text-body-sm-regular text-neutral-muted">Shipping Address</span>
        <span
          v-if="attendeeErrorMsgs.shippingAddress.required"
          class="text-body-sm-regular text-danger"
          >— (required for merchandise)</span
        >
        <span v-else class="text-body-sm-regular text-neutral">{{ attendee.shippingAddress }}</span>
      </div>
    </review-block>

    <review-block title="Selected Sessions" :step-id="WIZARD_STEP_KEYS.sessions.id">
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

    <review-block title="Addons" :step-id="WIZARD_STEP_KEYS.addons.id">
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
