<template lang="pug">
h2 Yours referrals ({{total}})
table
  tr(v-for="event in events")
    td {{ event.user }}
</template>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'

const web3Store = useWeb3Store()

type TEvent = {
  change: number,
  whose: string,
  user: string,
}

const events = ref<TEvent[]>([])
const total = ref(0)

const fillEvents = async () => {
  events.value = []
  const eventsFound = await web3Store.getWhoseOfUser()
  console.warn(eventsFound)
  total.value = eventsFound.length
  for (const eventFound of eventsFound) {
    events.value.push({
      change: eventFound.returnValues.change,
      whose: eventFound.returnValues.whose,
      user: eventFound.returnValues.user,
    })
  }
}

onMounted(async () => {
  await fillEvents()
})
const storage = useStorage('connected-wallet', '')
watch(storage, async () => {
  await fillEvents()
})

</script>