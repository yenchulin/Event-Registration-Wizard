<script setup>
import { computed, ref } from 'vue'
import ButtonToggle from '@/components/wizard/ButtonToggle.vue'
import { useRegistrationWizard } from '@/composables/useRegistrationWizard'

const { addonCategories } = useRegistrationWizard()

const selectedAddon = ref(addonCategories.value[0]?.id ?? '')

const addonTabs = computed(() =>
  addonCategories.value.map((category) => ({
    id: category,
    label: category.charAt(0).toUpperCase() + category.slice(1),
  }))
)

function selectAddon(addonId) {
  selectedAddon.value = addonId
}
</script>

<template>
  <section class="grid gap-6">
    <span class="text-h3 text-neutral">Select Add-ons</span>

    <button-toggle :items="addonTabs" :selected="selectedAddon" @select="selectAddon" />
  </section>
</template>
