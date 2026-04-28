<script setup>
import { computed, ref } from 'vue'
import moment from 'moment'
import { formatCurrency } from '@/utils'
import ButtonToggle from '@/components/wizard/ButtonToggle.vue'
import { useRegistrationWizard } from '@/composables/useRegistrationWizard'
import AddonCard from '@/components/wizard/AddonCard.vue'
import MerchandiseAddonCard from '@/components/wizard/MerchandiseAddonCard.vue'
import { CATEGORIES } from '@/utils/enums'

const categoryTabs = Object.values(CATEGORIES)
const {
  addonsByCategory,
  selectedAddons,
  toggleAddon,
  increaseAddonQuantity,
  decreaseAddonQuantity,
  updateAddonSize,
  selectedSessionDateRanges,
  selectedTicket,
  ticketPrice,
  totalPrice,
} = useRegistrationWizard()

const selectedCategory = ref(CATEGORIES.workshop.id)

const addonsForSelectedCategory = computed(
  () => addonsByCategory.value[selectedCategory.value] ?? []
)

function selectCategory(categoryId) {
  selectedCategory.value = categoryId
}

function hasTimeConflict(addon) {
  if (!addon.date || !addon.endDate) return false
  return selectedSessionDateRanges.value.some(
    (dateRange) =>
      moment(addon.date).isBetween(dateRange.date, dateRange.endDate, undefined, '[)') ||
      moment(addon.endDate).isBetween(dateRange.date, dateRange.endDate, undefined, '(]') ||
      dateRange.date.isBetween(moment(addon.date), moment(addon.endDate), undefined, '[)') ||
      dateRange.endDate.isBetween(moment(addon.date), moment(addon.endDate), undefined, '(]')
  )
}
</script>

<template>
  <section class="grid grid-cols-10 gap-8">
    <div class="grid col-span-7 gap-6">
      <span class="text-h3 text-neutral">Select Add-ons</span>

      <button-toggle :items="categoryTabs" :selected="selectedCategory" @select="selectCategory" />

      <div v-for="addon in addonsForSelectedCategory" :key="addon.id">
        <merchandise-addon-card
          v-if="addon.category === 'merchandise'"
          :addon="addon"
          :selectedOption="selectedAddons[addon.id]"
          @selectSize="updateAddonSize"
          @addQuantity="increaseAddonQuantity"
          @removeQuantity="decreaseAddonQuantity"
        />
        <addon-card
          v-else
          :addon="addon"
          :selected="selectedAddons[addon.id].quantity > 0"
          :hasTimeConflict="hasTimeConflict(addon)"
          @toggle="toggleAddon"
        />
      </div>
    </div>

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
