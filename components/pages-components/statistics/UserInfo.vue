<template lang="pug">
h4 CoreUser:
pre {{ Number(userData.claims) }}
pre {{ Number(userData.gifts) }}
pre {{ Number(userData.level) }}
pre {{ userData.whose }}
pre {{ userData.isValue }}
</template>

<script setup>
import { useStorage } from '@vueuse/core'
const web3Store = useWeb3Store()

const userData = ref({})
// let userData
const fillData = async () => {
  userData.value = await web3Store.getUserData()
  // console.warn("userData,,,", typeof userData.value.claims)
  // console.warn("userData...", Number(userData.value.claims))
}

onMounted(async () => {
  await fillData()
})
const storage = useStorage('connected-wallet', '')
watch(storage, async () => {
  await fillData()
})
</script>
