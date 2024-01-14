<template lang="pug">
h3 Descendants
.wrapper
  h4 Your descendants
  .row
    binary-tree(:descendants="descendants")
</template>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import BinaryTree from '~/components/pages-components/statistics/BinaryTree.vue'

const web3Store = useWeb3Store()

const getChildForElement = (index: number, plateau: number) => {
  console.warn('index', index)
  console.log('plateau', plateau)

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
  console.log('total', total)
  // uint plateau = log2(IndicesTotal.add(2));
  return Math.ceil(Math.log2(total + 2))
}

const descendants = ref({})
const fillDescendants = async () => {
  const matrices = await web3Store.getDescendants()

  const testMx = matrices[0]
  console.log("testMx", testMx)

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

  let plateau = 4
  const
      start = 11,
      // lastEl = 49,
      lastEl = 99

  const obj = {
    i: start,
    left: {},
    right: {},
  }

  descendants.value = recursive(obj, plateau, lastEl)
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
