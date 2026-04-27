<script setup>
import StepReviewSubmit from '@/components/wizard/steps/StepReviewSubmit.vue'
import StepAttendeeInfo from '@/components/wizard/steps/StepAttendeeInfo.vue'
import StepSessionSelection from '@/components/wizard/steps/StepSessionSelection.vue'
import StepAddons from '@/components/wizard/steps/StepAddons.vue'
import Logo from '@/assets/icons/Logo.svg'
import BaseButton from '@/components/wizard/BaseButton.vue'
import { useWizardSteps } from '@/composables/useWizardSteps'

const actionType = Object.freeze({
  next: 0,
  submit: 1,
})

const wizardSteps = [
  {
    id: 1,
    title: 'Attendee Info',
    component: StepAttendeeInfo,
    action: { type: actionType.next, label: 'Next: Sessions' },
    hasBack: false,
  },
  {
    id: 2,
    title: 'Sessions',
    component: StepSessionSelection,
    action: { type: actionType.next, label: 'Next: Add-ons' },
    hasBack: true,
  },
  {
    id: 3,
    title: 'Add-ons',
    component: StepAddons,
    action: { type: actionType.next, label: 'Next: Review' },
    hasBack: true,
  },
  {
    id: 4,
    title: 'Review',
    component: StepReviewSubmit,
    action: { type: actionType.submit, label: 'Submit Registration' },
    hasBack: true,
  },
]

const { currentStep, goBack, goNext } = useWizardSteps(wizardSteps.length)
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-surface-l0">
        <div class="px-12 py-4 flex gap-3 items-center">
          <img :src="Logo" />
          <span class="text-h4 text-neutral">WebDev Summit 2028</span>
        </div>

        <q-separator color="divider-default" />

        <div class="px-30">
          <q-stepper v-model="currentStep" flat header-nav color="primary">
            <q-step
              v-for="step in wizardSteps"
              :key="step.id"
              :name="step.id"
              :title="step.title"
              :prefix="`${step.id}`"
              :done="currentStep > step.id"
              done-icon="check"
            >
              <component :is="step.component" />
              <q-stepper-navigation>
                <div class="flex justify-between">
                  <base-button v-if="step.hasBack" :is-primary="false" @click="goBack">
                    Back
                  </base-button>
                  <div v-else></div>
                  <base-button v-if="step.action.type === actionType.next" @click="goNext">
                    {{ step.action.label }}
                  </base-button>
                  <base-button v-else-if="step.action.type === actionType.submit">
                    {{ step.action.label }}
                  </base-button>
                </div>
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
