<script setup>
import { useRouter } from 'vue-router'
import { useRegistrationWizard } from '@/composables/useRegistrationWizard'
import { computed } from 'vue'
import BaseButton from '@/components/wizard/BaseButton.vue'

defineProps({
  confirmationCode: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const { attendee, selectedTicket, resetWizardState } = useRegistrationWizard()

const attendeeName = computed(() => attendee.fullName?.trim() || 'there')
const attendeeEmail = computed(() => attendee.email?.trim() || 'your inbox')
const selectedTicketLabel = computed(() => selectedTicket.value?.name || 'selected')

function goHome() {
  resetWizardState()
  router.push({ name: 'home' })
}
</script>

<template>
  <q-page class="flex items-center justify-center" style="min-height: calc(100vh - 80px)">
    <section class="flex flex-col items-center max-w-[560px] gap-4 text-center">
      <div class="h-20 w-20 rounded-full bg-success-emphasis-rest flex items-center justify-center">
        <q-icon name="check" class="text-inverse text-5xl" />
      </div>

      <span class="text-h2 text-success">Registration Complete!</span>

      <span class="text-body-lg-regular text-neutral">Confirmation #{{ confirmationCode }}</span>

      <p class="m-0 text-body-sm-regular text-neutral-muted">
        Thank you, {{ attendeeName }}! Your {{ selectedTicketLabel }} registration for WebDev Summit
        2028 is confirmed.
        <br />
        You will receive a confirmation email at {{ attendeeEmail }}.
      </p>

      <base-button @click="goHome">Back to Home</base-button>
    </section>
  </q-page>
</template>
