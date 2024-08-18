<template lang="pug">
h3 EarnByReferrals
.wrapper(v-if="events.length > 0")
  h4 Your claim balance top up by descendants
  table.table.table-success.table-striped
    thead
      tr
        td User
        td Earned
    tbody
      tr(v-for="event in events")
        td {{ event.user }}
        td {{ event.amount }}
</template>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'

const web3Store = useWeb3Store()

type TEvent = {
  user: string,
  amount: number,
}

const events = ref<TEvent[]>([])
const fillEvents = async () => {
  events.value = []
  const eventsFound = await web3Store.getReferralEarn()
  for (const eventFound of eventsFound) {
    events.value.push({
      user: eventFound.returnValues.user,
      amount: eventFound.returnValues.newValue,
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

// test local hardhat wallet: 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc
</script>