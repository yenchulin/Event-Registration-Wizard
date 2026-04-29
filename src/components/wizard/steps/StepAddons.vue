<script setup>
import { computed, ref } from 'vue'
import moment from 'moment'
import { formatCurrency } from '@/utils'
import ButtonToggle from '@/components/wizard/ButtonToggle.vue'
import { useRegistrationWizard } from '@/composables/useRegistrationWizard'
import AddonCard from '@/components/wizard/AddonCard.vue'
import MerchandiseAddonCard from '@/components/wizard/MerchandiseAddonCard.vue'
import { CATEGORIES } from '@/utils/constants'

const categoryTabs = Object.values(CATEGORIES)
const {
  addonsByCategory,
  addonSelectionState,
  selectedAddons,
  workshopVipDiscount,
  isShippingRequired,
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

      <div
        v-if="isShippingRequired"
        class="flex gap-3 p-4 rounded-lg border border-solid border-info-opacity bg-info-subtle-rest"
      >
        <q-icon name="info" class="text-info font-size-lg" />
        <div class="flex flex-col gap-1">
          <span class="text-subtitle2 text-neutral">Shipping Information</span>
          <span class="font-size-md line-height-md text-neutral"
            >Merchandise items will be shipped to your address one week before the conference.
            Please ensure your shipping address in Step 1 is correct.</span
          >
        </div>
      </div>

      <div v-for="addon in addonsForSelectedCategory" :key="addon.id">
        <merchandise-addon-card
          v-if="addon.category === CATEGORIES.merchandise.id"
          :addon="addon"
          :selectedOption="addonSelectionState[addon.id]"
          @selectSize="updateAddonSize"
          @addQuantity="increaseAddonQuantity"
          @removeQuantity="decreaseAddonQuantity"
        />
        <addon-card
          v-else
          :addon="addon"
          :selected="addonSelectionState[addon.id].quantity > 0"
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

      <div
        v-for="addon in selectedAddons"
        :key="addon.id"
        class="flex justify-between items-center"
      >
        <span class="text-body-sm-regular text-neutral-muted"
          >{{ addon.name
          }}{{ addon.category === CATEGORIES.merchandise.id ? ` × ${addon.quantity}` : '' }}</span
        >
        <span class="text-body-sm-regular text-neutral-muted">{{
          formatCurrency(addon.price * addon.quantity)
        }}</span>
      </div>

      <div v-if="workshopVipDiscount > 0" class="flex justify-between items-center">
        <span class="text-body-xs-regular text-brand-emphasis">Workshop discount (VIP 10%)</span>
        <span class="text-body-xs-regular text-brand-emphasis"
          >-{{ formatCurrency(workshopVipDiscount) }}</span
        >
      </div>

      <q-separator color="divider-default" />

      <div class="flex justify-between items-center">
        <span class="text-body-sm-medium text-neutral">Total</span>
        <span class="text-body-sm-medium text-neutral">{{ formatCurrency(totalPrice) }}</span>
      </div>
    </div>
  </section>
</template>
