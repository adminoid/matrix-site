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
  // const storage = useStorage('connected-wallet', '')

  const cr = await web3Store.checkRegister()

  console.warn('crCR')
  console.log(cr.value)

  // if (storage.value) {
  web3Store.connectWallet().then(() => {
    buttonText.value = 'Connected'
  })
  // }
}
</script>
