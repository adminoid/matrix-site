<template lang="pug">

div(v-if="isRegistered")
  referral-link
div(v-else) Please register first

</template>

<script setup>
import ReferralLink from '~/components/pages-components/statistics/ReferralLink.vue'

const { $B } = useNuxtApp()
const isRegistered = ref(false)
// check if wallet registered
onMounted(async () => {
  if ($B) {
    // todo: get wallet value
    const data = await $B.getCoreUser()
    if (!data) {
      isRegistered.value = false
    } else if (data.isValue) {
      console.log(data)
      isRegistered.value = true
    }
  }
})
</script>