<template lang="pug">
.registered-table.table-responsive
  .registered-table__header Registered accounts in the Global lines
  table.table-spec.table.table-responsive.table-spec_strip.table-dark.table-hover.table-spec__body-table
    tbody.table-spec__tbody.table-spec__tbody_strip
      tr
        th(scope="col") Lines1
        th(v-for="i in 10" :key="i" scope="col") {{ i }}
      tr
        td Accounts1
        td(v-for="k in 10")
          .pink-num {{ k }}
      tr
        th(scope="col") Lines2
        th(v-for="i in [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]" :key="i" scope="col") {{ i }}
      tr
        td Accounts2
        td(v-for="k in 10")
          .pink-num {{ k }}
</template>

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