<template lang="pug">
.col.col-md-6
  main-banner(
    :isShowed="isLoaded"
    header="Amount of BNB entered to the system"
    link=true
    :footer="totalAmountBnb + ' BNB'"
  )
.col.col-md-3
  main-banner(
    :isShowed="isLoaded"
    header="BTC equivalent of sent BNB that entered to the system"
    :footer="totalAmountBtc + ' BTC'"
  )
</template>

<script setup>
import MainBanner from '~/components/pages-components/main/MainBanner.vue'
import {getBC} from '~/stores/useWeb3.js'
import {GetEvents} from "~/libs/events-infura/abi-events.js";

const BC = await getBC()
const totalAmountBnb = ref(0)
const totalAmountBtc = ref(0)
const isLoaded = ref(false)
const getTotalAccounts = async () => {
  // const eventsFound = await BC.value.getDirectTransfers()
  const eventsFound = await GetEvents('DirectTransfer')

  console.warn('eventsFound')
  console.log(eventsFound)

  const amount = eventsFound.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.amount),
      0,
  )
  totalAmountBnb.value = Number(amount) / 10**18
  const rate = await getBtcRate()
  totalAmountBtc.value = (totalAmountBnb.value / rate).toFixed(3)
  isLoaded.value = true
}

const getBtcRate = async () => {
  // btc $58961
  // bnb $521
  return new Promise(resolve => {
    resolve(113)
  })

  // todo -- https://www.okx.com/docs-v5/trick_en/#order-management-pagination
  // try {
  //   const response = await axios.get('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=USD', {
  //     headers: {
  //       'X-CMC_PRO_API_KEY': '8f350504-8864-4aaa-8666-778c3bc28dbf',
  //     },
  //   })
  //   console.info('response')
  //   console.log(response)
  //
  // } catch(e) {
  //
  //   // TODO: fix cors error
  //
  //   console.warn('E')
  //   console.warn(e)
  // }

  // const axios = require('axios');
  // let data = JSON.stringify({
  //   "symbols": "ETH/USD,BTC/USD"
  // });
  // let config = {
  //   method: 'post',
  //   maxBodyLength: Infinity,
  //   url: 'https://oracle.binance.com/api/gw/symbol-price',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   },
  //   data : data
  // };
  // axios(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
}
// onMounted(async () => {
//   await getTotalAccounts()
// })

watch(isInitialized, async (nv) => {
  if (nv) {
    await getTotalAccounts()
  }
})

useNuxtApp().$on('wallet-updated', async () => {
  await getTotalAccounts()
})
</script>