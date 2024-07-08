<template lang="pug">
.referrals.mt-4.mt-md-0
  .referrals__header Your referral link
  .referrals__link
    .referrals__link-text https://givedream.io/?referrer=8fisnba4TMygvDTQsFAbHGEHTEs
    .referrals__link-copy
  .referrals__header.referrals__header_big Referrals
  table.table-spec.table-dark.table-hover.table-spec__body-table(v-if="events.length > 0")
    thead.table-spec__thead
      tr
        th Wallet
    tbody.table-spec__tbody
      tr(v-for="e in events")
        td {{ e.matrixIndex }} / {{ e.amountAccrued }} / {{ e.spender }} / {{ e.owner }} / {{ e.amountSpent }}
</template>

<script setup>
import { useStorage } from '@vueuse/core'

const web3Store = useWeb3Store()

const events = ref([])
const fillEvents = async () => {
  events.value = []
  // todo: add promise.all
  // const eventsAccruedFound = await web3Store.getGiftsAccrued()
  // const eventsSpentFound = await web3Store.getGiftsSpent()

  const [eventsAccruedFound, eventsSpentFound] = await Promise.all([web3Store.getGiftsAccrued(), web3Store.getGiftsSpent()])

  console.warn(1, eventsAccruedFound)
  console.warn(2, eventsSpentFound)

  for (const eventIndex in eventsAccruedFound) {
    // console.log('eventIndex:', eventIndex)
    // console.log('eventsAccruedFound -. ', eventsAccruedFound[eventIndex])
    // console.log('eventsSpentFound -. ', eventsSpentFound[eventIndex])

    // if (eventsAccruedFound[eventIndex]?.returnValues) {
    //   console.info('isok eventsAccruedFound')
    // } else {
    //   console.info('isntok eventsAccruedFound')
    // }
    //
    // if (eventsSpentFound[eventIndex]?.returnValues) {
    //   console.info('isok eventsSpentFound')
    // } else {
    //   console.info('isntok eventsSpentFound')
    // }

    events.value.push({
      matrixIndex: eventsAccruedFound[eventIndex]?.returnValues ? eventsAccruedFound[eventIndex].returnValues.matrixIndex : false,
      amountAccrued: eventsAccruedFound[eventIndex]?.returnValues ? eventsAccruedFound[eventIndex].returnValues.amount : false,
      spender: eventsSpentFound[eventIndex]?.returnValues ? eventsSpentFound[eventIndex].returnValues.spender : false,
      owner: eventsSpentFound[eventIndex]?.returnValues ? eventsSpentFound[eventIndex].returnValues.owner : false,
      amountSpent: eventsSpentFound[eventIndex]?.returnValues ? eventsSpentFound[eventIndex].returnValues.amount : false,
    })
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