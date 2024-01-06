<template lang="pug">
.wrapper(v-if="events.length > 0")
  h2 Your claims earned by descendants
  table.table.table-dark.table-striped-columns
    thead
      tr
        td User
        td Matrix level
        td Amount
    tbody
      tr(v-for="event in events")
        td {{ event.user }}
        td {{ event.matrixIndex }}
        td {{ event.amount }}

</template>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'

const web3Store = useWeb3Store()

type TEvent = {
  user: string,
  matrixIndex: number,
  amount: number,
}

const events = ref<TEvent[]>([])
const fillEvents = async () => {
  events.value = []
  const eventsFound = await web3Store.getGiftsAccrued()
  for (const eventFound of eventsFound) {
    events.value.push({
      user: eventFound.returnValues.user,
      matrixIndex: eventFound.returnValues.matrixIndex,
      amount: eventFound.returnValues.amount,
    })
  }
  console.info("events")
  console.log(events.value)
}

onMounted(() => {
  fillEvents()
})
const storage = useStorage('connected-wallet', '')
watch(storage, async () => {
  await fillEvents()
})
</script>