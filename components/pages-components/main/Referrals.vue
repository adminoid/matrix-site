<template lang="pug">
.referrals.mt-4.mt-md-0
  .referrals__header Your referral link
  .referrals__link
    .referrals__link-text https://givedream.io/?referrer=8fisnba4TMygvDTQsFAbHGEHTEs
    .referrals__link-copy
  .referrals__header.referrals__header_big Referrals
  //pre {{ events }}
  table.table-spec.table-dark.table-hover.table-spec__body-table(v-if="isDataLoaded")
    thead.table-spec__thead
      tr
        th Status
        th Spender
    tbody.table-spec__tbody
      tr(v-for="event in events")
        template(v-if="!event.isAccrued")
          td {{ stages.not_accrued }}
          td ...
        template(v-else-if="event.isAccrued && !event.isSpent")
          td {{ stages.accrued_not_spent }}
          td ...
        template(v-else)
          td {{ stages.accrued_and_spent }}
          td {{ event.spender }}
  div(v-else) Loading data...
</template>

<script setup>
import { useStorage } from '@vueuse/core'

const web3Store = useWeb3Store()
const stages = {
  not_accrued: 'Not accrued yet',
  accrued_not_spent: 'Already accrued, but not spent',
  accrued_and_spent: 'Already spent',
}
const events = ref([])
const isDataLoaded = ref(false)
const fillEvents = async () => {
  const [eventsAccruedFound, eventsSpentFound] = await Promise.all([web3Store.getGiftsAccrued(), web3Store.getGiftsSpent()])
  isDataLoaded.value = true
  events.value = [
    {
      isAccrued: false,
      isSpent: false,
    },
    {
      isAccrued: false,
      isSpent: false,
    }
  ]

  if (eventsAccruedFound.length > 0) {
    for (const eventIndex in eventsAccruedFound) {
      if (eventsAccruedFound[eventIndex]) {
        events.value[eventIndex] = {
          isAccrued: true,
          isSpent: false,
          accrued: eventsAccruedFound[eventIndex]?.returnValues?.amount.toString()
        }

        if (eventsSpentFound[eventIndex]) {
          events.value[eventIndex] = {
            isAccrued: true,
            isSpent: true,
            spender: eventsSpentFound[eventIndex]?.returnValues?.spender
          }
        }
      }
    }
  }
}

onMounted(() => {
  fillEvents()
})
const storage = useStorage('connected-wallet', '')
watch(storage, async () => {
  await fillEvents()
})
</script>