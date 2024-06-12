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

const connectWallet = () => {
  // const storage = useStorage('connected-wallet', '')

  console.info('connectWallet.!? -1')

  // console.log(storage.value)
  // if (storage.value) {
    console.info('connectWallet.!? 1')
    web3Store.connectWallet().then(() => {
      console.info('connectWallet.!? 0')
      buttonText.value = 'Connected'
    })
  // }
}
</script>
