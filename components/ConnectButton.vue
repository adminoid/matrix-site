<template lang="pug">
button.btn.btn-cpink.main-button(
  type="button"
  @click.prevent="connectWallet"
) {{ buttonText }}
</template>

<script setup>
import {getBC} from "~/stores/useWeb3.js";
import { useStorage } from '@vueuse/core'

const BC = await getBC()
const buttonText = ref('Connect')

onMounted(async () => {
  const walletStorage = useStorage('connected-wallet', '')
  if (walletStorage.value) {
    await InitializeExternal()
  }
})

// TODO: check localStorage wallet and connect if exist

const connectWallet = async () => {

  await InitializeExternal()

  console.warn(BC.value.isRegistered)
}
</script>
