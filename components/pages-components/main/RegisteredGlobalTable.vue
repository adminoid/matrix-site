<template lang="pug">
client-only
  .registered-table.table-responsive(v-if="isLoaded")
    .registered-table__header Registered accounts in the Global lines
    table.table-spec.table.table-responsive.table-spec_strip.table-dark.table-hover.table-spec__body-table
      tbody.table-spec__tbody.table-spec__tbody_strip
        tr
          th(scope="col") Lines1
          th(
            v-for="i in 10"
            :key="i"
            scope="col"
          ) {{ i }}
        tr
          td Accounts1
          td(v-for="k in 10")
            .pink-num {{ levels[k - 1] }}
        tr
          th(scope="col") Lines2
          th(
            v-for="i in [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
            :key="i"
            scope="col"
          ) {{ i }}
        tr
          td Accounts2
          td(v-for="k in [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]")
            .pink-num {{ levels[k - 1] }}
</template>

<script setup>
import {getBC} from '~/stores/useWeb3.js'
import {isClient} from "@vueuse/core";
import {useNuxtApp} from "#app";

let BC
const isLoaded = ref(false)

const fillGlobalTable = async () => {
  if (!isClient) return
  BC = getBC()
  if (BC && BC.value) {
    for (const index in [...Array(20).keys()]) {
      const total = await BC.value.getTotalFromMatrix(Number(index))
      levels.value.push(Number(total) - 5)
    }
  }
  isLoaded.value = true
}

const levels = ref([])

// TODO: disable fillGlobalTable() for debugging
useNuxtApp().$on('initialized', async () => {
  await fillGlobalTable()
})

useNuxtApp().$on('wallet-updated', async () => {
  await fillGlobalTable()
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