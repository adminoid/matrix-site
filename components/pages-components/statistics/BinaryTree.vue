<template lang="pug">
ul
  li(v-if="descendants.i || descendants.i == 0")
    div {{ descendants.i }}
    ul(v-if="descendants.left || descendants.right")
      binary-tree(v-if="descendants.left" :descendants="descendants.left")
      binary-tree(v-if="descendants.right" :descendants="descendants.right")
</template>

<script lang="ts" setup>
// TODO: use case for d3 tree: https://codepen.io/katzkode/pen/ZegQQB
type TNode = {
  i: number,
  left: any,
  right: any,
}
const props = defineProps({
  descendants: {
    type: Object as PropType<TNode>
  }
})
</script>
