<template lang="pug">
h3 Descendants
.wrapper
  h4 Your descendants
  //pre {{ descendants }}
  .row
    binary-tree
</template>

<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import BinaryTree from '~/components/pages-components/statistics/BinaryTree.vue'

const web3Store = useWeb3Store()

const getChildForElement = (index: number, plateau: number) => {
  console.log('index', index)
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

const descendants = ref<number[][]>([])
const fillDescendants = async () => {
  const matrices = await web3Store.getDescendants()

  const testMx = matrices[0]
  console.log("testMx", testMx)

  let plateau = 4
  const
      start = 11,
      lastEl = 49,
      root = getChildForElement(start, plateau)

  let resultLeft = root.left
  let resultRight = root.right

  console.log('left, right')
  console.log(resultLeft, resultRight)

  const results = []
  while (lastEl >= resultLeft) {

    plateau++

    // const {left, right} = getChildForElement(testMx.user.index, testMx.user.plateau)
    console.info("resultLeft >= lastEl && resultRight < lastEl")
    console.log(resultLeft, lastEl, resultRight, lastEl)
    if (resultLeft <= lastEl && resultRight > lastEl) {
      console.info('left1, right1, plateau1')
      console.warn(resultLeft, lastEl, plateau)
      break
    } else {
      console.info('left, right, plateau')
      console.warn(resultLeft, resultRight, plateau)
    }

    results.push(processRow(resultLeft, resultRight))

    const nextElLeft = getChildForElement(resultLeft, plateau)
    const nextElRight = getChildForElement(resultRight, plateau)
    resultLeft = nextElLeft.left
    resultRight = nextElRight.right

  }
  results.push(processRow(resultLeft, resultRight))

  const totalPlateaus = getTotalPlateaus(47) // 4
  console.warn('totalPlateaus', totalPlateaus)

  descendants.value = results
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