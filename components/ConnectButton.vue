<template lang="pug">
button.btn.btn-cpink.main-button(
  type="button"
  @click.prevent="connectWallet"
) {{ buttonText }}
</template>

<script setup>
import {useWeb3Store} from "~/stores/useWeb3.js";
import { useStorage } from '@vueuse/core'

const web3Store = useWeb3Store()
const buttonText = ref('Connect')

const storage = useStorage('connected-wallet', '')
if (storage.value) {
  await web3Store.connectWallet()
}
const connectWallet = async () => {
  await web3Store.connectWallet()
}

</script>
