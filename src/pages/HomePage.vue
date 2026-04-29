<script setup>
import { useRouter } from 'vue-router'
import BaseButton from '@/components/wizard/BaseButton.vue'

const router = useRouter()

function goToRegistrationWizard() {
  router.push({ name: 'registration-wizard' })
}
</script>

<template>
  <q-page class="flex flex-col gap-4 items-center justify-center bg-brand-emphasis-rest">
    <span class="text-h1 text-inverse">Welcome!</span>
    <base-button @click="goToRegistrationWizard">Register</base-button>
  </q-page>
</template>
