<template lang="pug">
.registered-table
  .registered-table__header Accounts registered in the structure
  .registered-table__link
    .registered-table__link-text https://givedream.io/?referrer=8fisnba4TMygvDTQsFAbHGEHTEs
    .registered-table__link-copy
  .registered-table__header.registered-table__header_big Referrals
  table.registered-table__table.table-dark.table-hover.registered-table__body-table
    thead.registered-table__table-thead
      tr
        th Wallet address
        th Friends
        th Gifts
    tbody.registered-table__table-tbody
      tr
        td Ox9f6D...F4BC
        td friend1
        td 0.01
      tr
        td Ox9f6D...F4BC
        td friend1
        td 0.01
      tr
        td Ox9f6D...F4BC
        td friend1
        td 0.01

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
  &__link
    margin-bottom: 1rem
    background-color: #1C1A2E
    padding: 8px 10px 8px 10px
    border-radius: 8px
    font-size: 0.75rem
    font-weight: 400
    line-height: 1rem
    display: flex
    align-items: center
    justify-content: space-between
    &-text
      overflow-wrap: break-word
      max-width: 90%
    &-copy
      display: inline-block
      background-image: url("@/assets/img/icons/copy.svg")
      background-repeat: no-repeat
      width: 22px
      height: 27px
      background-position: 50%
  &__table
    width: 100%
    //border-collapse: collapse
    &-thead
      color: #7B859F
      font-size: 12px
      font-weight: 400
      line-height: 30px
      border-bottom: 1px solid #353445
    &-tbody
      color: #E4EBFA
      font-size: 12px
      font-weight: 400
      line-height: 16px
      td
        &::before
          content: ''
          display: block
          height: 7px
</style>