<template lang="pug">
.registered-table.table-responsive(v-if="BC.value?.Wallet")
  .registered-table__header Accounts registered in the structure
  table.table-spec__body-table(
    class="table-spec table table-responsive table-spec_strip table-dark table-hover"
    v-if="isLoaded"
  )
    thead.table-spec__thead
      tr
        th(scope="col") Matrix
        th(v-for="i in 20" :key="i" scope="col") {{ i }}
    tbody.table-spec__tbody.table-spec__tbody_strip
      tr(v-for="j in 5" :key="j")
        td lvl {{ j }}
        td(v-for="k in 20")
          .pink-num(v-if="tableData[k - 1]?.levels") {{ tableData[k - 1]?.levels[j - 1]?.count }}
          .pink-num(v-else)
  div(v-else) Loading...
</template>

<script setup>

//  1. getting connected wallet id from each matrix
//  2. getting last user in matrix that lower than id
//  3. calculate each (of 5) level filled with last user id

import {getDescendantsProxy} from '~/stores/useWeb3.js'

const BC = await getBC()
const isLoaded = ref(false)
const fillUserTable = async () => {
  tableData.value = await getDescendantsProxy()
  isLoaded.value = true
}

const tableData = ref([])
onMounted(async () => {
  await fillUserTable()
})

useNuxtApp().$on('wallet-updated', async () => {
  await fillUserTable()
})
</script>

<style lang="sass">
.registered-table
  &__header
    font-size: 1rem
    font-weight: 500
    line-height: 24px
    margin-bottom: 1rem
  &__header_big
    font-size: 1rem
    font-weight: 500
    line-height: 24px
    margin-bottom: 1rem
</style>