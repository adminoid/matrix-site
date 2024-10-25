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

export const getDescendantsProxy = async () => {
    const matrixData = []

    if (Object.keys(BC.value).length > 0) {
        const maxLevel = await BC.value.getMaxLevel()

        // todo -- check i <= maxLevel
        for (let i = 0; i < maxLevel; i++) {
            // response from getMatrixUser() contains user and total
            const matrixReceivedData = await BC.value.getMatrixUser(i)
            let matrixDataLevels
            if (matrixReceivedData) {

                const userIndex = Number(matrixReceivedData?.user.index)
                const lastIndex = Number(matrixReceivedData?.total) - 1

                // todo: calc down * 2 children, repeat levelsDown times
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
                const levelsChildCount = rightChild - leftChild + 1
                matrixDataLevels.levels.push({
                    left: leftChild,
                    right: rightChild,
                    count: levelsChildCount,
                })
                while (rightChild < lastIndex) {

                    leftChild = (leftChild * 2) + 1
                    rightChild = (rightChild * 2) + 2

                    // check right is more or less lastIndex
                    //  if less than lastIndex, use lastIndex as right border
                    //  if more than lastIndex go to next iteration

                    if (rightChild > lastIndex) {
                        rightChild = lastIndex
                    }

                    if (leftChild <= lastIndex) {
                        const levelsChildCount = rightChild - leftChild + 1
                        matrixDataLevels.levels.push({
                            left: leftChild,
                            right: rightChild,
                            count: levelsChildCount,
                        })
                    }
                }
            } else {
                return matrixData
            }

            matrixData[i] = matrixDataLevels
        }
    }

    return matrixData
}
