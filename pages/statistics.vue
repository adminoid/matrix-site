<template lang="pug">
client-only
  div(v-if="storage")
    div(v-if="isRegistered")
      referral-link
    div(v-else) Please register first
  div(v-else) Please connect wallet
</template>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import ReferralLink from '~/components/pages-components/statistics/ReferralLink.vue'
import {useWeb3Store} from "~/stores/useWeb3.js";

const storage = useStorage('connected-wallet', '')
watch(storage, (nVal) => {
  console.warn("watch", nVal)
})

const web3Store = useWeb3Store()
const isRegistered = ref(false)

// check if wallet registered
onMounted(async () => {
  isRegistered.value = await web3Store.checkRegister()
})

watch(storage, async () => {
  isRegistered.value = await web3Store.checkRegister()
})
</script>
