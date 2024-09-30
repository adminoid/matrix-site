<template lang="pug">
button.btn.btn-cpink.main-button(
  type="button"
  @click.prevent="connectWallet"
) {{ buttonText }}
</template>

<script setup>
import { getBC } from "~/stores/useWeb3.js";
import { useStorage } from '@vueuse/core'

const buttonText = ref('Connect')

let BC
onMounted(async () => {
  const walletStorage = useStorage('connected-wallet', '')
  if (walletStorage.value) {
    BC = await getBC()
  }
})

// TODO: check localStorage wallet and connect if exist

// todo => restore mark
// const connectWallet = async () => {
//   BC = await getBC()
// }

</script>
