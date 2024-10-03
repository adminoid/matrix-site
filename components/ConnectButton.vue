<template lang="pug">
button.btn.btn-cpink.main-button(
  type="button"
  @click.prevent="connectWallet"
) {{ buttonText }}
</template>

<script setup>
import { initBC } from "~/stores/useWeb3.js";

const buttonText = ref('Connect')
let BC

// todo => restore mark
const connectWallet = async () => {
  BC = await initBC()
}

</script>
