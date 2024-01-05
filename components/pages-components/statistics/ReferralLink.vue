<template lang="pug">
p Ref link: {{ storage }}
</template>

<script setup>
import { useStorage } from '@vueuse/core'
const { $B } = useNuxtApp()

console.info("$B")
console.warn($B.Ethereum)

const storage = useStorage("connected-wallet", "")

onMounted(() => {
  if (!$B.Ethereum) {
    storage.value = ''
  }
})
</script>
