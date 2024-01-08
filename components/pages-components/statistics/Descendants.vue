<template lang="pug">
h3 GiftSpent
.wrapper
  h4 Your descendants
  table.table.table-success.table-striped
    thead
      tr
        td Left
        td Right
    tbody
</template>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'

const web3Store = useWeb3Store()

const fillDescendants = async () => {
  const result = await web3Store.getDescendants()
  console.warn('result')
  console.log(result)
}

onMounted(async () => {
  await fillDescendants()
})

const storage = useStorage('connected-wallet', '')
watch(storage, async () => {
  await fillDescendants()
})
</script>