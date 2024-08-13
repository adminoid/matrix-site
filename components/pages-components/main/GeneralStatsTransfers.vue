<template lang="pug">
template(v-if="isLoaded")
  .col.col-md-6
    main-banner(
      header="Amount of BNB entered to the system"
      link=true
      :footer="totalAmountBnb + ' BNB'"
    )
  .col.col-md-3
    main-banner(
      header="BTC equivalent of sent BNB that entered to the system"
      :footer="totalAmountBtc + ' BTC'"
    )
div(v-else) Loading...
</template>

<script setup>
import MainBanner from '~/components/pages-components/main/MainBanner.vue'
import {useStorage} from "@vueuse/core"
// import axios from "axios"

const web3Store = useWeb3Store()
const totalAmountBnb = ref(0)
const totalAmountBtc = ref(0)
const isLoaded = ref(false)
const getTotalAccounts = async () => {
  const eventsFound = await web3Store.getDirectTransfers()
  const amount = eventsFound.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.returnValues.amount),
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
onMounted(async () => {
  await getTotalAccounts()
})

const storage = useStorage('connected-wallet', '')
watch(storage, async () => {
  await getTotalAccounts()
})
</script>