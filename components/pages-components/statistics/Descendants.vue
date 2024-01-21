<template lang="pug">
h3 Descendants
.wrapper
  h4 Your descendants
  .row(v-for="dsds of descendants")
    binary-tree(:descendants="dsds")
    hr
</template>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import BinaryTree from '~/components/pages-components/statistics/BinaryTree.vue'

const web3Store = useWeb3Store()

const getChildForElement = (index: number, plateau: number) => {
  const indexToFirstElPlateau = (pl: number) => (2 ** (pl - 1)) - 1
  const indexToPlateau = indexToFirstElPlateau(plateau)
  const elNumInPlateau = index - indexToPlateau + 1
  const nextPlateauStart = indexToFirstElPlateau(plateau + 1)
  const leftChildEl = (elNumInPlateau * 2) - 2 + nextPlateauStart
  return {
    left: leftChildEl,
    right: leftChildEl + 1,
  }

}

const getTotalPlateaus = (total: number) => {
  return Math.ceil(Math.log2(total + 2))
}

const recursive = (obj: any, pl: number, last: number) => {
  const {left, right} = getChildForElement(obj.i, pl + 1)

  if (left <= last) {
    obj.left = {
      i: left,
    }
    obj.left = recursive(obj.left, pl + 1, last)
  }

  if (right <= last) {
    obj.right = {
      i: right,
    }
    obj.right = recursive(obj.right, pl + 1, last)
  }

  return obj
}

const descendants = ref<any[]>([])
const fillDescendants = async () => {
  const matrices = await web3Store.getDescendants()
  for (const mxNum in matrices) {
    let plateau = getTotalPlateaus(matrices[mxNum].total)
    const
        start = matrices[mxNum].user.index,
        lastEl = matrices[mxNum].total
    const obj = {
      i: start,
      left: {},
      right: {},
    }
    descendants.value[mxNum] = recursive(obj, plateau, lastEl)
  }
}

const processRow = (left: number, right: number) => {
  const result = []
  for (let i = left; i <= right; i++) {
    result.push(i)
  }
  return result
}

onMounted(async () => {
  await fillDescendants()
})

const storage = useStorage('connected-wallet', '')
watch(storage, async () => {
  await fillDescendants()
})
</script>
