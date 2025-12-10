# coingecko get rate btc/bnb

Look at this document: https://docs.coingecko.com/reference/exchange-rates
and give me js code snippet where axios package gets btc/bnb rate. As api key set {API_KEY_GECKO}

# etherscan issue

We have a code that request value from etherscan api there `components/pages-components/main/GeneralStatsTransfers.client.vue`, 
but there is an issue: `Free API access is temporarily unavailable due to unusually high network activity. To maintain uninterrupted service, we recommend upgrading to a paid plan: https://etherscan.io/apis`
I'm about this code:
```js
  const txList = await axios.get(`https://api.etherscan.io/v2/api?chainid=${config.public.CHAIN_ID_DECIMAL}&apikey=${config.public.BSCSCAN_API_KEY}&module=account&action=txlist&address=${config.public.CONTRACT_ADDRESS}&startblock=0&endblock=99999999`)
```
Can you recommend another way to get this value to avoid restrictions of etherscan?
Give me a list of alternatives with their cost and limits for free?
