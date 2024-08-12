<template lang="pug">
main-banner(
  v-if="isLoaded"
  header="Amount of BNB entered to the system"
  link=true
  :footer="totalAmount + ' BNB'"
)
div(v-else) Loading...
</template>

<script setup>
import MainBanner from '~/components/pages-components/main/MainBanner.vue'
import {useStorage} from "@vueuse/core"

const web3Store = useWeb3Store()
const totalAmount = ref(0)
const isLoaded = ref(false)
const getTotalAccounts = async () => {
  const eventsFound = await web3Store.getDirectTransfers()
  const amount = eventsFound.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.returnValues.amount),
      0,
  )
  totalAmount.value = Number(amount) / 10**18
  isLoaded.value = true
}

onMounted(async () => {
  await getTotalAccounts()
})

const storage = useStorage('connected-wallet', '')
watch(storage, async () => {
  await getTotalAccounts()
})
</script>