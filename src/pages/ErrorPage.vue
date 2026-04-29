<script setup>
import { useRouter } from 'vue-router'
import BaseButton from '@/components/wizard/BaseButton.vue'

const router = useRouter()

function goHome() {
  router.push({ name: 'home' })
}
</script>

<template>
  <q-page class="flex flex-col gap-4 items-center justify-center bg-brand-emphasis-rest">
    <span class="text-h1 text-inverse">Oops! Something went wrong.</span>
    <base-button @click="goHome">Back to Home</base-button>
  </q-page>
</template>
