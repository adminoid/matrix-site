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
import {isClient} from "@vueuse/core";
import axios from "axios";

let BC

useNuxtApp().$on('initialized', async () => {
  setTimeout(await getBscStatistics())
})

useNuxtApp().$on('wallet-updated', async () => {
  setTimeout(await getBscStatistics())
})

const totalAmountBnb = ref(0)
const totalAmountBtc = ref(0)
const isLoaded = ref(false)

const getBscStatistics = async () => {

  isLoaded.value = false

  const config = useRuntimeConfig()

  console.warn('CONTRACT_ADDRESS:', config.public.CONTRACT_ADDRESS)
  console.log(isClient, config.public.CHAIN_ID_DECIMAL, config.public.CONTRACT_ADDRESS, config.public.BSCSCAN_API_KEY)

  if (!isClient || !config.public.CHAIN_ID_DECIMAL || !config.public.CONTRACT_ADDRESS || !config.public.BSCSCAN_API_KEY) return;

  const txList = await axios.get(`https://api.etherscan.io/v2/api?chainid=${config.public.CHAIN_ID_DECIMAL}&apikey=${config.public.BSCSCAN_API_KEY}&module=account&action=txlist&address=${config.public.CONTRACT_ADDRESS}&startblock=0&endblock=99999999`)

  const txData = txList.data.result
  let amountBnbStatic = 0;
  for (const txListIdx in txData) {
    if (txData[txListIdx].value && Number(txData[txListIdx].value) > 0) {
      amountBnbStatic += Number(txData[txListIdx].value)
    }
  }
  totalAmountBnb.value = amountBnbStatic / 10**18
  console.log(totalAmountBnb.value)

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

</script>