import {External} from "~/libs/blockchain/classes"
import {useNuxtApp} from "#app"
import {getGlobalThis} from "@vue/shared"
import {isClient} from "@vueuse/core"

export let BC = ref({})

// todo: init External class based on connected wallet, save as singleton
//  check registered and save as singleton
//  reinit when wallet changed (two above)
//  update localStorage wallet value

/**
 * This is must be the only one entry point to create External() instance
 * Must run once at site loading
 * @returns {Promise<void>}
 * @constructor
 */
export const InitializeExternal = async () => {
    // todo:
    //  If init/constructor executed with wallet that is not equal stored wallet (can be zero) - init again
    //  else return just stored instance of External (BC.value)

    // todo: where is from wallet can be come here?

    // console.error('InitializeExternal()()')

    if (Object.keys(BC.value).length === 0) {
        console.info('make instance of External class')
        // make instance of External class
        const B = new External(useNuxtApp().$emit)
        const glob = getGlobalThis()
        await B.init(glob)
        await B.connect()
        BC.value = B
        BC.value.Emit('initialized', true)
    }
}

export const getBC = () => {
    if (Object.keys(BC.value).length === 0) {
        return false
    }
    return isClient ? BC : false
}

// todo: check metamask installed
export const checkInstalled = () => {
    const glob = getGlobalThis()
    return !!glob['ethereum']
}

// TODO: add reinitialization if wallet is updated
// export const isInitialized = ref(false)
export const initBC = async () => {
    if (
        Object.keys(BC.value).length === 0
        && isClient
    ) {
        await InitializeExternal()
        // emit event about blockchain classes are initialized
        // isInitialized.value = true
    }

    return isClient ? BC : false
}

const countLevelChildren = (leftChild, rightChild, lastIndex) => {
    let count = 0
    if (leftChild <= lastIndex) {
        // if lastIndex less than rightChild, but equal leftChild then count == 1
        if (leftChild === lastIndex) {
            count = 1
        } else {
            // if lastIndex is more or equal with rightChild then count == 2
            // count = 2 and more
            count = rightChild - leftChild + 1
        }
    }

    return count
}

export const getDescendantsProxy = async () => {
    const matrixData = []

    if (Object.keys(BC.value).length > 0) {
        const maxLevel = await BC.value.getMaxLevel()

        // todo -- check i <= maxLevel
        for (let i = 0; i <= maxLevel; i++) {
            // response from getMatrixUser() contains user and total
            const matrixReceivedData = await BC.value.getMatrixUser(i)
            let matrixDataLevels
            if (!matrixReceivedData) {
                return matrixData
            } else {
                const userIndex = Number(matrixReceivedData?.user.index)
                const lastIndex = Number(matrixReceivedData?.total) - 1

                // calc down * 2 children, repeat levelsDown times
                // calculate child level left (first) item
                // (X*2)+1=Y [(9*2)+1=19] (left/first)

                let leftChild = (userIndex * 2) + 1
                let rightChild = (userIndex * 2) + 2

                matrixDataLevels = {
                    matrixIndex: i,
                    userIndex,
                    lastIndex,
                    levels: [],
                }

                const levelsChildCount = countLevelChildren(leftChild, rightChild, lastIndex)

                if (levelsChildCount > 0) {
                    matrixDataLevels.levels.push({
                        left: leftChild,
                        right: rightChild,
                        count: levelsChildCount,
                    })
                }

                while (rightChild <= lastIndex) {

                    // check right is more or less lastIndex
                    //  if less than lastIndex, use lastIndex as right border
                    //  if more than lastIndex go to next iteration
                    rightChild = (rightChild * 2) + 2
                    if (rightChild > lastIndex) {
                        rightChild = lastIndex
                    }

                    leftChild = (leftChild * 2) + 1

                    const levelsChildCount = countLevelChildren(leftChild, rightChild, lastIndex)
                    if (levelsChildCount > 0) {
                        matrixDataLevels.levels.push({
                            left: leftChild,
                            right: rightChild,
                            count: levelsChildCount,
                        })
                    } else {
                        break
                    }
                }
            }

            matrixData[i] = matrixDataLevels
        }
    }

    return matrixData
}
