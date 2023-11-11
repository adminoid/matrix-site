<template lang="pug">
h1 Your statistics
</template>

<script setup>
const publicConfig = useRuntimeConfig()

onMounted(() => {
  console.info(publicConfig)
})
</script>