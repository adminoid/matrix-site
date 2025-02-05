<template lang="pug">
.registered-table.table-responsive
  .registered-table__header Accounts registered in the structure
  table.table-spec__body-table(
    class="table-spec table table-responsive table-spec_strip table-dark table-hover"
    v-if="isLoaded"
  )
    thead.table-spec__thead
      tr
        th(scope="col") Matrix
        th(v-for="i in 20" :key="i" scope="col")
          .table-spec__div.table-spec__div_selected(v-if="i <= maxLevel") {{ i }}
          .table-spec__div(v-else) {{ i }}
    tbody.table-spec__tbody.table-spec__tbody_strip
      tr(v-for="j in 5" :key="j")
        td lvl {{ j }}
        td(v-for="k in 20")
          .pink-num(v-if="tableData[k - 1]?.levels") {{ tableData[k - 1]?.levels[j - 1]?.count || '-' }}
          .pink-num(v-else) -
  div(v-else) Loading...
</template>

<script setup>

//  1. getting connected wallet id from each matrix
//  2. getting last user in matrix that lower than id
//  3. calculate each (of 5) level filled with last user id

import {getBC, getDescendantsProxy} from '~/stores/useWeb3.js'
import {isClient} from "@vueuse/core";

let BC
const isLoaded = ref(false)
const tableData = ref([])
const maxLevel = ref(0)
const fillUserTable = async () => {
  if (!isClient) return
  BC = getBC()
  if (BC && BC.value) {
    const res = await getDescendantsProxy()
    maxLevel.value = res.length
    tableData.value = res
  }
  isLoaded.value = true
}

// TODO: disable fillUserTable() for debugging
useNuxtApp().$on('initialized', async () => {
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

.table-spec
  &__div
    margin-left: -5px
    width: 25px
    height: 25px
    border: 1px solid transparent
    border-radius: 50%
    text-align: center
    display: flex
    align-items: center
    justify-content: center
    &_selected
      border-color: #713DFF
</style>