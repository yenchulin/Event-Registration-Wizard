<script setup>
import { computed, ref } from 'vue'
import { formatCurrency } from '@/utils'
import ButtonToggle from '@/components/wizard/ButtonToggle.vue'
import { useRegistrationWizard } from '@/composables/useRegistrationWizard'
import AddonCard from '@/components/wizard/AddonCard.vue'

const categoryLabelMap = {
  workshop: 'Workshops',
  meal: 'Meal Packages',
  merchandise: 'Merchandise',
}

const {
  addonCategories,
  addonsByCategory,
  selectedAddonIds,
  selectedTicket,
  ticketPrice,
  totalPrice,
} = useRegistrationWizard()

const selectedAddon = ref(Object.keys(categoryLabelMap)[0])

const addonTabs = computed(() =>
  addonCategories.value.map((category) => ({
    id: category,
    label: categoryLabelMap[category] ?? category,
  }))
)
const addonsForSelectedCategory = computed(() => addonsByCategory.value[selectedAddon.value] ?? [])

function selectAddon(addonId) {
  selectedAddon.value = addonId
}
</script>

<template>
  <section class="grid grid-cols-10 gap-8">
    <div class="grid col-span-7 gap-6">
      <span class="text-h3 text-neutral">Select Add-ons</span>

      <button-toggle :items="addonTabs" :selected="selectedAddon" @select="selectAddon" />

      <addon-card
        v-for="addon in addonsForSelectedCategory"
        :key="addon.id"
        :addon="addon"
        :selected="selectedAddonIds.has(addon.id)"
        @toggle="toggleAddon"
      />
    <div
      class="grid col-span-3 gap-4 h-fit rounded-md border border-solid border-neutral-muted bg-surface-l1 p-6"
    >
      <span class="text-subtitle1 text-neutral">Order Summary</span>

      <div class="flex justify-between items-center">
        <span class="text-body-sm-regular text-neutral-muted">
          {{ selectedTicket?.name ?? '' }} Ticket
        </span>
        <span class="text-body-sm-regular text-neutral-muted">{{
          formatCurrency(ticketPrice)
        }}</span>
      </div>

      <q-separator color="divider-default" />

      <div class="flex justify-between items-center">
        <span class="text-body-sm-medium text-neutral">Total</span>
        <span class="text-body-sm-medium text-neutral">{{ formatCurrency(totalPrice) }}</span>
      </div>
    </div>
  </section>
</template>
