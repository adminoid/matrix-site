<template lang="pug">
.registered-table.table-responsive
  .registered-table__header Accounts registered in the structure
  table.table-spec.table.table-responsive.table-spec_strip.table-dark.table-hover.table-spec__body-table
    thead.table-spec__thead
      tr
        th(scope="col") Matrix
        th(v-for="i in 20" :key="i" scope="col") {{ i }}
    tbody.table-spec__tbody.table-spec__tbody_strip
      tr(v-for="j in 5" :key="j")
        td lvl {{ j }}
        td(v-for="k in 20")
          .pink-num {{ k }}
</template>

<script setup>
const web3Store = useWeb3Store()
onMounted(async () => {
  console.info('bef cycle')
  for (const index in [...Array(20).keys()]) {
    const total = await web3Store.getTotalFromMatrix(index)
    console.log(index, '). ', Number(total))
  }
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