<script setup>
import StepReviewSubmit from '@/components/wizard/steps/StepReviewSubmit.vue'
import StepAttendeeInfo from '@/components/wizard/steps/StepAttendeeInfo.vue'
import StepSessionSelection from '@/components/wizard/steps/StepSessionSelection.vue'
import StepAddons from '@/components/wizard/steps/StepAddons.vue'
import BaseButton from '@/components/wizard/BaseButton.vue'
import { useWizardSteps } from '@/composables/useWizardSteps'
import { useRegistrationWizard } from '@/composables/useRegistrationWizard'
import { WIZARD_STEP_KEYS } from '@/utils/constants'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const actionType = {
  next: 0,
  submit: 1,
}
const wizardSteps = [
  {
    id: WIZARD_STEP_KEYS.attendeeInfo.id,
    title: WIZARD_STEP_KEYS.attendeeInfo.label,
    component: StepAttendeeInfo,
    action: { type: actionType.next, label: 'Next: Sessions' },
    hasBack: false,
  },
  {
    id: WIZARD_STEP_KEYS.sessions.id,
    title: WIZARD_STEP_KEYS.sessions.label,
    component: StepSessionSelection,
    action: { type: actionType.next, label: 'Next: Add-ons' },
    hasBack: true,
  },
  {
    id: WIZARD_STEP_KEYS.addons.id,
    title: WIZARD_STEP_KEYS.addons.label,
    component: StepAddons,
    action: { type: actionType.next, label: 'Next: Review' },
    hasBack: true,
  },
  {
    id: WIZARD_STEP_KEYS.review.id,
    title: WIZARD_STEP_KEYS.review.label,
    component: StepReviewSubmit,
    action: { type: actionType.submit, label: 'Submit Registration' },
    hasBack: true,
  },
]

const router = useRouter()
const { currentStep, goBack, goNext } = useWizardSteps()
const { isAttendeeValid, isSelectedSessionsValid, isSubmissionLoading, submitRegistration } =
  useRegistrationWizard()

const isSubmitErrorDialogOpen = ref(false)
const submitErrorMessage = ref('')

function isStepError(stepId) {
  if (stepId == WIZARD_STEP_KEYS.attendeeInfo.id) {
    return !isAttendeeValid.value
  }
  if (stepId == WIZARD_STEP_KEYS.sessions.id) {
    return !isSelectedSessionsValid.value
  }
  return false
}

function handleSubmitRegistration() {
  submitRegistration().then((result) => {
    if (!result) return
    if (result.success) {
      router.push({
        name: 'registration-success',
        params: { confirmationCode: result.confirmationCode },
      })
    } else {
      submitErrorMessage.value = result.error
      isSubmitErrorDialogOpen.value = true
    }
  })
}
</script>

<template>
  <q-page class="relative">
    <q-stepper v-model="currentStep" flat header-nav color="primary" class="px-30">
      <q-step
        v-for="step in wizardSteps"
        :key="step.id"
        :name="step.id"
        :title="step.title"
        :prefix="`${step.id}`"
        :done="currentStep > step.id && !isStepError(step.id)"
        :error="isStepError(step.id)"
        done-icon="check"
        error-icon="info"
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
            <base-button
              v-else-if="step.action.type === actionType.submit"
              @click="handleSubmitRegistration"
            >
              {{ step.action.label }}
            </base-button>
          </div>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>

    <q-inner-loading :showing="isSubmissionLoading">
      <q-spinner-dots size="50px" color="primary" />
    </q-inner-loading>

    <q-dialog v-model="isSubmitErrorDialogOpen" persistent>
      <q-card class="w-[420px] max-w-[90vw] rounded-md">
        <q-card-section class="text-subtitle1 text-danger">Oops!</q-card-section>
        <q-card-section class="py-0 text-body-sm-regular">
          {{ submitErrorMessage }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="OK" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
