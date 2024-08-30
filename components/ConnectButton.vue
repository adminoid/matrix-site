<template lang="pug">
button.btn.btn-cpink.main-button(
  type="button"
  @click.prevent="connectWallet"
) {{ buttonText }}
</template>

<script setup>
import {useWeb3Store} from "~/stores/useWeb3.vue.js";
// import { useStorage } from '@vueuse/core'

// TODO remove useWeb3Store() everywhere, leave only in pages/main.vue

const web3Store = useWeb3Store()
const buttonText = ref('Connect')

const connectWallet = () => {
  // const storage = useStorage('connected-wallet', '')

  console.info('connectWallet.!? -1')
  console.warn(web3Store)

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
