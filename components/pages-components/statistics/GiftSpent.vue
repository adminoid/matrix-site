<template lang="pug">
h3 GiftSpent
.wrapper(v-if="events.length > 0")
  h4 Your gifts spended by referrals
  table.table.table-danger.table-striped
    thead
      tr
        td Referral
        td Amount
    tbody
      tr(v-for="event in events")
        td {{ event.spender }}
        td {{ event.amount }}

</template>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'

const web3Store = useWeb3Store()

type TEvent = {
  spender: string,
  owner: string,
  amount: number,
}

const events = ref<TEvent[]>([])
const fillEvents = async () => {
  events.value = []
  const eventsFound = await web3Store.getGiftsSpent()
  for (const eventFound of eventsFound) {
    events.value.push({
      spender: eventFound.returnValues.spender,
      owner: eventFound.returnValues.owner,
      amount: eventFound.returnValues.amount,
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