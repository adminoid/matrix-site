<template lang="pug">
div(v-if="storage")
  statistics-wrapper
div(v-else) Please connect wallet
</template>

<script lang="ts" setup>
import StatisticsWrapper from '~/components/pages-components/statistics/StatisticsWrapper.vue'
import { useStorage } from '@vueuse/core'

const storage = useStorage('connected-wallet', '')
</script>
