<template lang="pug">
.col-9.mb-3 Account balance
.col-3.text-end {{ claimsBalanceDecimal }} BNB
br
</template>

<script setup>
// TODO: Need to be updated after claim balance withdrawing
const web3Store = useWeb3Store()

const claimsBalanceDecimal = ref(0)
const getData = async () => {
  const claimsBalance = await web3Store.getCoreUserClaimBalance()

  console.info('claimsBalance.1.1..1..')
  console.log(claimsBalance)

  if (claimsBalance) {
    claimsBalanceDecimal.value = Number(claimsBalance) / 10**18
  }
}

onMounted(async () => {
  await getData()
})
</script>
