<template lang="pug">
main-banner(
  :isShowed="isLoaded"
  header="Registered accounts"
  :footer="totalRegisteredAccounts"
)
</template>

<script setup>
import MainBanner from '~/components/pages-components/main/MainBanner.vue'
import {useStorage} from "@vueuse/core";

const web3Store = useWeb3Store()
const totalRegisteredAccounts = ref(0)
const isLoaded = ref(false)
const getTotalAccounts = async () => {
  totalRegisteredAccounts.value = await web3Store.getAddressesGlobalTotal()
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