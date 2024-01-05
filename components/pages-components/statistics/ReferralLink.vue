<template lang="pug">
p Referral link:
  br
  a(:href="'https://givedream.io/' + storage") https://givedream.io/{{ storage }}
</template>

<script setup>
import { useStorage } from '@vueuse/core'

const { $B } = useNuxtApp()
const storage = useStorage("connected-wallet", "")
onMounted(() => {
  if (!$B.Ethereum) {
    storage.value = ''
  }
})
</script>
