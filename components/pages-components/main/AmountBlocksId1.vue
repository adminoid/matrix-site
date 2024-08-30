<template lang="pug">
main-banner(
  :isShowed="isLoaded"
  header="Amount of BNB received from id1 to help animals"
  link=true
  :footer="totalForId1"
)
</template>

<script setup>
import MainBanner from '~/components/pages-components/main/MainBanner.vue'
import {useStorage} from "@vueuse/core"

const web3Store = useWeb3Store()
const totalForId1 = ref(0)
const isLoaded = ref(false)
const getTotalForId1 = async () => {
  const cnf = useRuntimeConfig()
  totalForId1.value = await web3Store.getIncomesForId(cnf.public.ID_ADDRESS_1)
  isLoaded.value = true
}

onMounted(async () => {
  await getTotalForId1()
})

// TODO replace storage
const storage = useStorage('connected-wallet', '')
watch(storage, async () => {
  await getTotalForId1()
})
</script>