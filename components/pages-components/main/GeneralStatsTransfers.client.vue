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
  setTimeout(await getBtcStatistics())
})

useNuxtApp().$on('wallet-updated', async () => {
  setTimeout(await getBscStatistics())
  setTimeout(await getBtcStatistics())
})

const totalAmountBnb = ref(0)
const totalAmountBtc = ref(0)
const isLoaded = ref(false)

const config = useRuntimeConfig()

const getBscStatistics = async () => {

  isLoaded.value = false

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
  isLoaded.value = true
}

const getBtcStatistics = async () => {
  totalAmountBtc.value = totalAmountBnb.value / (await getBtcRate())
}

const getBtcRate = async () => {

  if (!isClient || !config.public.CHAIN_ID_DECIMAL || !config.public.CONTRACT_ADDRESS || !config.public.BSCSCAN_API_KEY || !config.public.COINGECKO_API_KEY) return;

  const instance = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/exchange_rates'
  });

  instance.defaults.headers.common['x-cg-demo-api-key'] = config.public.COINGECKO_API_KEY;
  instance.defaults.headers.common['accept'] = 'application/json';

  const data = await instance.get()

  return data.data?.rates?.bnb?.value || new Error('something wrong with coingecko api');
}

</script>