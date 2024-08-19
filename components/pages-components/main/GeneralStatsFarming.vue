<template lang="pug">
.col
  main-banner(
    v-if="isLoaded"
    header="Amount of BNB sent to farming and staking"
    :footer="totalForId0"
  )
</template>

<script setup>
import MainBanner from '~/components/pages-components/main/MainBanner.vue'
import {useStorage} from "@vueuse/core"
// import NuxtConfig from "~/nuxt.config.js";

// TODO: Events that need to calculate amount for id0 and id1 (there is id0):
//  BelowTwoAppear(address indexed receiver, uint amount, uint indexed matrixIndex)
//  ClaimsAppear(address indexed owner, uint indexed levelPrice, uint newValue)

const web3Store = useWeb3Store()
const totalForId0 = ref(0)
const isLoaded = ref(false)
const getTotalForId0 = async () => {
  const cnf = useRuntimeConfig()
  totalForId0.value = await web3Store.getIncomesForId(cnf.public.ID_ADDRESS_0)
  isLoaded.value = true
}

onMounted(async () => {
  await getTotalForId0()
})

const storage = useStorage('connected-wallet', '')
watch(storage, async () => {
  await getTotalForId0()
})
</script>