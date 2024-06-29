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
        td {{ e.user }}
</template>

<script setup>
import { useStorage } from '@vueuse/core'

const web3Store = useWeb3Store()

const events = ref([])
// const total = ref(0)

const fillEvents = async () => {
  events.value = []
  const eventsFound = await web3Store.getWhoseOfUser()
  // console.info('eventsFound')
  // console.log(eventsFound)
  // total.value = eventsFound.length

  console.info('eventsFound . , .')
  console.log(eventsFound)

  for (const eventFound of eventsFound) {
    events.value.push({
      change: eventFound.returnValues.change,
      whose: eventFound.returnValues.whose,
      user: eventFound.returnValues.user,
    })
  }
}

onMounted(async () => {
  setTimeout(async ()=>{
    await fillEvents()
  }, 7000)
})

const storage = useStorage('connected-wallet', '')
watch(storage, async () => {
  await fillEvents()
})
</script>