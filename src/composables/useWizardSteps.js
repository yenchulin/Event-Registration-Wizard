import { ref } from 'vue'
import { WIZARD_STEP_KEYS } from '@/utils/constants'

const currentStep = ref(WIZARD_STEP_KEYS.attendeeInfo.id)

function goToStep(stepNumber) {
  currentStep.value = Math.min(Math.max(stepNumber, 1), Object.keys(WIZARD_STEP_KEYS).length)
}

function goNext() {
  goToStep(currentStep.value + 1)
}

function goBack() {
  goToStep(currentStep.value - 1)
}

function reset() {
  currentStep.value = WIZARD_STEP_KEYS.attendeeInfo.id
}

export function useWizardSteps() {
  return {
    currentStep,
    goToStep,
    goNext,
    goBack,
    reset,
  }
}
