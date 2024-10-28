<template lang="pug">
client-only
  .referrals.mt-4.mt-md-0
    .referrals__header Your referral link
    .referrals__link
      .referrals__link-text https://givedream.io/{{ wallet }}
      .referrals__link-copy
    .referrals__header.referrals__header_big Referrals
    table.table-spec.table-dark.table-hover.table-spec__body-table(v-if="isDataLoaded")
      thead.table-spec__thead
        tr
          th Status
          th Spender
      tbody.table-spec__tbody
        tr(v-for="event in events")
          template(v-if="!event.isAccrued")
            td {{ stages.not_accrued }}
            td ...
          template(v-else-if="event.isAccrued && !event.isSpent")
            td {{ stages.accrued_not_spent }}
            td ...
          template(v-else)
            td {{ stages.accrued_and_spent }}
            td {{ event.owner }}
    div(v-else) <i>Is loading...</i>
</template>

<script setup>
import {getBC} from "~/stores/useWeb3.js";
import {useNuxtApp} from "#app";
import {isClient} from "@vueuse/core";
import {GetEvents} from "~/libs/events-infura/abi-events.js";

let BC

useNuxtApp().$on('initialized', async () => {
  await fillEvents()
})

useNuxtApp().$on('wallet-updated', async () => {
  await fillEvents()
})

const wallet = ref('')

const stages = {
  not_accrued: 'Not accrued yet',
  accrued_not_spent: 'Already accrued, but not spent',
  accrued_and_spent: 'Already spent',
}

const events = ref([])
const isDataLoaded = ref(false)
const fillEvents = async () => {
  if (!isClient) return;
  BC = getBC()
  if (BC && BC.value) {
    wallet.value = BC.value.Wallet

    const [eventsAccruedFound, eventsSpentFound] = await Promise.all([await GetEvents('GiftAppear', [BC.value.Wallet]), await GetEvents('GiftSpent', [BC.value.Wallet])])
    events.value = [
      {
        isAccrued: false,
        isSpent: false,
      },
      {
        isAccrued: false,
        isSpent: false,
      }
    ]

    if (eventsAccruedFound.length > 0) {
      for (const eventIndex in eventsAccruedFound) {
        if (eventsAccruedFound[eventIndex]) {
          events.value[eventIndex] = {
            isAccrued: true,
            isSpent: false,
            accrued: eventsAccruedFound[eventIndex].amount.toString()
          }

          if (eventsSpentFound[eventIndex]) {
            events.value[eventIndex] = {
              isAccrued: true,
              isSpent: true,
              owner: eventsSpentFound[eventIndex].owner
            }
          }
        }
      }
    }
  }
  isDataLoaded.value = true
}
</script>