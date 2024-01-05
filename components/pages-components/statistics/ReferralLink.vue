<template lang="pug">
p Ref link: {{ refLink }}
</template>

<script setup>
import {useWeb3Store} from "~/stores/useWeb3.js";
import { useStorage } from '@vueuse/core'

const web3Store = useWeb3Store()
const storage = useStorage("connected-wallet", "")
const refLink = ref(storage.value)

</script>
