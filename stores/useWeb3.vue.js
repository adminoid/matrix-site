import {getGlobalThis} from "@vue/shared"
import { External } from '~/libs/blockchain/classes'

export const useWeb3Store = (() => {

    const connectedWallet = ref('')
    const coreUser = ref({})

    watch(connectedWallet, async (newWallet) => {
        console.info('watch connectedWallet -> newWallet')
        console.log(newWallet)

        // TODO: set walletData to coreUser and connected wallet address
        // todo -- maybe move it in useWeb3Store?
        const walletData = '0x0ABC...'
        const $BC = new External(useNuxtApp(), walletData)
        const glob = getGlobalThis()
        await $BC.init(glob)
    })

    console.info('connectedWallet.11', connectedWallet.value)

    const checkConnected = async () => {
        // if mm is not installed
        if (!$BC.Ethereum) {
            $BC.Nuxt.$emit('disabled', {
                cause: 'Please install Metamask and reload the page 0',
                status: true,
            })
        }
        $BC.Nuxt.$emit('update-whose')
    }

    // todo: move to level up component
    const connectWallet = async () => {
        await $BC.connect()
        await checkConnected()
    }

    const checkRegister = async () => {
        if ($BC.Wallet.value) {
            coreUser.value = await $BC.getUserFromCore()
            if (coreUser.value) {
                return true
            }
        }
        return false
    }

    const getAddressesGlobalTotal = async () => {
        if ($BC.Wallet.value) {
            const resp = await $BC.getAddressesGlobalTotal()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getWhoseOfUser = async () => {
        if ($BC.Wallet.value) {
            const resp = await $BC.getWhoseOfUser()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getReferralEarn = async () => {
        if ($BC.Wallet.value) {
            const resp = await $BC.getReferralEarn()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getClaimsAppear = async () => {
        if ($BC.Wallet.value) {
            const resp = await $BC.getClaimsAppear()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getBelowTwoAppear = async () => {
        if ($BC.Wallet.value) {
            const resp = await $BC.getBelowTwoAppear()
            if (resp) {
                return resp
            }
            return false
        }
    }

    let totalBnb
    const getDirectTransfers = async () => {
        if ($BC.Wallet.value) {
            const resp = await $BC.getDirectTransfers()
            if (resp) {
                totalBnb = resp
                return resp
            }
            return false
        }
    }

    const getClaimSpent = async () => {
        if ($BC.Wallet.value) {
            const resp = await $BC.getClaimSpent()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getGiftsAccrued = async () => {
        if ($BC.Wallet.value) {
            const resp = await $BC.getGiftsAccrued()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getIncomesForId = async (wallet) => {
        if ($BC.Wallet.value) {
            const amount = await $BC.getIncomesForId(wallet)
            if (amount) {
                return amount
            }
            return false
        }
    }

    const getGiftsSpent = async () => {
        if ($BC.Wallet.value) {
            const resp = await $BC.getGiftsSpent()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getDescendants = async () => {

        if (!connectedWallet.value) {
            return false
        }
        // index: 0n
        // isRight: false
        // isValue: true
        // parent: 0n
        // plateau: 1n
        const matrixData = []
        // if (!coreUser.value) {
        //     // todo: remove this. Get user data from store
        //     await checkRegister()
        // }

        const maxLevel = Number(coreUser.value.level)
        // todo -- check i <= maxLevel
        for (let i = 0; i < maxLevel; i++) {
            // response from getMatrixUser() contains user and total
            const matrixReceivedData = await $BC.getMatrixUser(i)
            const userIndex = Number(matrixReceivedData?.user.index)
            const lastIndex = Number(matrixReceivedData?.total) - 1

            // todo: calc down * 2 children, repeat levelsDown times
            // calculate child level left (first) item
            // (X*2)+1=Y [(9*2)+1=19] (left/first)

            let leftChild = (userIndex * 2) + 1
            let rightChild = (userIndex * 2) + 2

            const matrixDataLevels = {
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

            matrixData[i] = matrixDataLevels
        }

        return matrixData
    }

    const getUserData = async () => {
        if (coreUser.value) {
            const matrixUser = await $BC.getMatrixUser(0)
            if (matrixUser) {
                return {
                    core: coreUser.value,
                    matrix: matrixUser?.user,
                }
            }
        }
        return false
    }

    const getFirstUsers = async (total) => {
        const wallets = []
        for (let i = 0; i < total; i++) {
            wallets.push(await $BC.getWalletByIndexFromMatrix(0, i))
        }
        return wallets
    }

    const withdrawClaims = async amount => await withdrawClaims(amount)

    const getCoreUserClaimBalance = async () => {
        if (coreUser.value) {
            return coreUser.value ? coreUser.value : false
        }

        // getting coreUser from SC
        // todo: remove method, get user data from store in checkRegister() method in this file
        const coreUserLocal = await $BC.getUserFromCore()
        return coreUserLocal.claims
    }

    const getWithdraws = async () => {
        if ($BC.Wallet.value) {
            const resp = await $BC.getWithdraws()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getTotalFromMatrix = async (matrixIndex) => {
        const resp = await $BC.getTotalFromMatrix(matrixIndex)
        if (resp) {
            return resp
        }
        return false
    }

    return {
        $BC,
        coreUser,
        connectedWallet,
        connectWallet,
        checkRegister,
        checkConnected,
        getAddressesGlobalTotal,
        getWhoseOfUser,
        getReferralEarn,
        getClaimsAppear,
        getBelowTwoAppear,
        totalBnb,
        getDirectTransfers,
        getClaimSpent,
        getGiftsAccrued,
        getGiftsSpent,
        getDescendants,
        getUserData,
        getFirstUsers,
        withdrawClaims,
        getCoreUserClaimBalance,
        getWithdraws,
        getTotalFromMatrix,
        getIncomesForId,
    }
})

export default useWeb3Store

// todo: when going to auth protected page - need to run authorization
