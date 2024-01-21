<template lang="pug">
h3 ClaimAppear
.wrapper(v-if="events.length > 0")
  h4 Your claims appear
  table.table.table-success.table-striped
    thead
      tr
        td Owner
        td Level price
        td New value
    tbody
      tr(v-for="event in events")
        td {{ event.owner }}
        td {{ event.levelPrice }}
        td {{ event.newValue }}
</template>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'

const web3Store = useWeb3Store()

type TEvent = {
  owner: string,
  levelPrice: string,
  newValue: string,
}

const events = ref<TEvent[]>([])
const fillEvents = async () => {
  events.value = []
  const eventsFound = await web3Store.getClaimsAppear()
  for (const eventFound of eventsFound) {
    events.value.push({
      owner: eventFound.returnValues.owner,
      levelPrice: eventFound.returnValues.levelPrice,
      newValue: eventFound.returnValues.newLevel,
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