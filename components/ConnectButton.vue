<template lang="pug">
button.btn.btn-cpink.main-button(
  type="button"
  @click.prevent="connectWallet"
) {{ buttonText }}
</template>

<script setup>
import {useWeb3Store} from "~/stores/useWeb3.js";

const web3Store = useWeb3Store()
const buttonText = ref('Connect')

const connectWallet = async () => {
  if (!web3Store.connectedWallet) {
    await web3Store.connectWallet()
  }
}

</script>
