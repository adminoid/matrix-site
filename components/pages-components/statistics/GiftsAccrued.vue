<template lang="pug">
h3 GiftsAccrued
.wrapper(v-if="events.length > 0")
  h4 Your gifts earned by descendants
  table.table.table-success.table-striped
    thead
      tr
        td Matrix level
        td Amount
    tbody
      tr(v-for="event in events")
        td {{ event.matrixIndex }}
        td {{ event.amount }}

</template>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'

const web3Store = useWeb3Store()

type TEvent = {
  matrixIndex: number,
  amount: number,
}

const events = ref<TEvent[]>([])
const fillEvents = async () => {
  events.value = []
  const eventsFound = await web3Store.getGiftsAccrued()
  for (const eventFound of eventsFound) {
    events.value.push({
      matrixIndex: eventFound.returnValues.matrixIndex,
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