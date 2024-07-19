<template lang="pug">
h3 ClaimSpent
.wrapper(v-if="events.length > 0")
  h4 Your claim funds was spent
  table.table.table-success.table-striped
    thead
      tr
        td Owner
        td Spent
        td To level
    tbody
      tr(v-for="event in events")
        td {{ event.owner }}
        td {{ event.value }}
        td {{ event.level }}
</template>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'

const web3Store = useWeb3Store()

type TEvent = {
  owner: string,
  value: string,
  level: string,
}

const events = ref<TEvent[]>([])
const fillEvents = async () => {
  events.value = []
  const eventsFound = await web3Store.getClaimSpent()
  for (const eventFound of eventsFound) {
    events.value.push({
      owner: eventFound.returnValues.owner,
      value: eventFound.returnValues.value.toString(),
      level: eventFound.returnValues.newLevel.toString(),
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