import { ref } from 'vue'

const currentStep = ref(1)

export function useWizardSteps(totalSteps) {
  function goToStep(stepNumber) {
    currentStep.value = Math.min(Math.max(stepNumber, 1), totalSteps)
  }

  function goNext() {
    goToStep(currentStep.value + 1)
  }

  function goBack() {
    goToStep(currentStep.value - 1)
  }

  return {
    currentStep,
    goToStep,
    goNext,
    goBack,
  }
}
