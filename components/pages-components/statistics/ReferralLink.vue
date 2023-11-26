<template lang="pug">
p Ref link: {{ web3Store.connectedWallet }}
//p Ref link: {{ $B.Wallet }}
</template>

<script setup>
import {useWeb3Store} from "~/stores/useWeb3.js";

const web3Store = useWeb3Store()

// const { $B } = useNuxtApp()
// onMounted(async () => {
//   const glob = getGlobalThis()
//   await $B.init(glob)
//   console.log($B)
// })

// const refLink = ref($B.Wallet)
</script>
