<script setup>
import Logo from '@/assets/icons/Logo.svg'
</script>

<template>
  <q-layout view="hHh Lpr lFf">
    <div class="px-12 py-4 flex gap-3 items-center">
      <img :src="Logo" />
      <span class="text-h4 text-neutral">WebDev Summit 2028</span>
    </div>

    <q-separator color="divider-default" />

    <q-page-container class="bg-surface-l0">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
