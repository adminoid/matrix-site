<template lang="pug">
h4 First {{ total }} wallets in first matrix:
div(v-for="(user, i) of users") {{ i }}. {{ user }}
</template>

<script setup>
import { useStorage } from '@vueuse/core'
const web3Store = useWeb3Store()

const total = 109

const users = ref([])
const fillData = async () => {
  users.value = await web3Store.getFirstUsers(total)
}

onMounted(async () => {
  await fillData()
  console.log(users.value.length, users.value)
})
const storage = useStorage('connected-wallet', '')
watch(storage, async () => {
  await fillData()
})
</script>
