<template lang="pug">
h4 CoreUser:
div(v-if="userData.core")
  pre claims: {{ Number(userData.core.claims) }}
  pre gifts: {{ Number(userData.core.gifts) }}
  pre level: {{ Number(userData.core.level) }}
  pre whose: {{ userData.core.whose }}
  pre isValue: {{ userData.core.isValue }}

h4 Matrix 0 user:
div(v-if="userData.matrix")
  pre index: {{ Number(userData.matrix.index) }}
  pre isRight: {{ userData.matrix.isRight }}
  pre isValue: {{ userData.matrix.isValue }}
  pre parent: {{ Number(userData.matrix.parent) }}
  pre plateau: {{ Number(userData.matrix.plateau) }}
</template>

<script setup>
import { useStorage } from '@vueuse/core'
const web3Store = useWeb3Store()

const userData = ref({})
const fillData = async () => {
  userData.value = await web3Store.getUserData()
}

onMounted(async () => {
  await fillData()
})
const storage = useStorage('connected-wallet', '')
watch(storage, async () => {
  await fillData()
})
</script>
