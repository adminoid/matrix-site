<template lang="pug">
h4 Referral link:
a(:href="'https://givedream.io/' + storage") https://givedream.io/{{ storage }}
</template>

<script setup>
import { useStorage } from '@vueuse/core'

// todo: copy to clipboard by click on the link

const { $B } = useNuxtApp()
const storage = useStorage("connected-wallet", "")
onMounted(() => {
  if (!$B.Ethereum) {
    storage.value = ''
  }
})
</script>
