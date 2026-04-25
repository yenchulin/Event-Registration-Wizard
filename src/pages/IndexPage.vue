<script setup>
import { ref } from 'vue'
import StepReviewSubmit from '../components/wizard/steps/StepReviewSubmit.vue'
import StepAttendeeInfo from '../components/wizard/steps/StepAttendeeInfo.vue'
import StepSessionSelection from '../components/wizard/steps/StepSessionSelection.vue'
import StepAddons from '../components/wizard/steps/StepAddons.vue'
import Logo from '../assets/icons/Logo.svg'
import BaseButton from '../components/wizard/general/BaseButton.vue'

const wizardSteps = [
  {
    id: 1,
    title: 'Attendee Info',
    component: StepAttendeeInfo,
    nextTitle: 'Session Selection',
    hasBack: false,
  },
  {
    id: 2,
    title: 'Sessions',
    component: StepSessionSelection,
    nextTitle: 'Add-ons',
    hasBack: true,
  },
  {
    id: 3,
    title: 'Add-ons',
    component: StepAddons,
    nextTitle: 'Review',
    hasBack: true,
  },
  {
    id: 4,
    title: 'Review',
    component: StepReviewSubmit,
    nextTitle: 'Session Selection',
    hasBack: true,
  },
]

const currentStep = ref(1)
const goNext = () => {
  currentStep.value += 1
}
const goBack = () => {
  currentStep.value -= 1
}
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-surface-l0">
        <div class="px-12 py-4 flex gap-3">
          <img :src="Logo" />
          <h1 class="text-h4 text-neutral">WebDev Summit 2028</h1>
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
                  <base-button v-if="step.hasBack" :is-primary="false" :on-click="goBack">
                    Back
                  </base-button>
                  <div v-else></div>
                  <base-button :on-click="goNext">
                    {{ `Next: ${step.nextTitle}` }}
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
