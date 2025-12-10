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

useNuxtApp().$on('initialized', async () => {
  setTimeout(complexFn)
})

useNuxtApp().$on('wallet-updated', async () => {
  setTimeout(complexFn)
})

const complexFn = async () => {
  isLoaded.value = false
  totalAmountBnb.value = await getBscStatistics() || 0
  if (totalAmountBnb.value > 0) {
    totalAmountBtc.value = await getBtcStatistics() || 0
  }
  isLoaded.value = true
}

const totalAmountBnb = ref(0)
const totalAmountBtc = ref(0)
const isLoaded = ref(false)

const config = useRuntimeConfig()

const getBscStatistics = async () => {
  if (!isClient || !config.public.CONTRACT_ADDRESS || !config.public.ALCHEMY_API_KEY) return;

  try {
    const response = await axios.post(
      `https://bnb-${config.public.ALCHEMY_NET}.g.alchemy.com/v2/${config.public.ALCHEMY_API_KEY}`,
      {
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [config.public.CONTRACT_ADDRESS, "latest"],
        id: 1
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const balanceHex = response.data.result;
    const balanceWei = parseInt(balanceHex, 16);
    const balanceBnb = balanceWei / 1e18;

    return balanceBnb;
  } catch (error) {
    console.error('Error fetching BSC statistics from Alchemy:', error);
    return 0;
  }
}

const getBtcStatistics = async () => {
  return totalAmountBnb.value / (await getBtcRate())
}

const getBtcRate = async () => {

  if (!isClient || !config.public.COINGECKO_API_KEY) return;

  const instance = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/exchange_rates'
  });

  instance.defaults.headers.common['x-cg-demo-api-key'] = config.public.COINGECKO_API_KEY;
  instance.defaults.headers.common['accept'] = 'application/json';

  const data = await instance.get()

  return data.data?.rates?.bnb?.value || new Error('something wrong with coingecko api');
}

</script>