import {defineStore} from "pinia";
import {core} from "web3";

export const useWeb3Store = defineStore('web3_store', () => {
    const { $B } = useNuxtApp()
    // const connectedWallet = ref('')
    const checkConnected = async () => {
        // if mm is not installed
        if (!$B.Ethereum) {
            $B.Nuxt.$emit('disabled', {
                cause: 'Please install Metamask and reload the page 0',
                status: true,
            })
        }
        $B.Nuxt.$emit('update-whose')
    }

    const connectWallet = async () => {
        await $B.connect()
        await checkConnected()
    }

    let coreUser
    const checkRegister = async () => {
        if ($B.Wallet.value) {
            coreUser = await $B.getUserFromCore()
            if (coreUser) {
                return true
            }
        }
        return false
    }

    const getAddressesGlobalTotal = async () => {
        if ($B.Wallet.value) {
            const resp = await $B.getAddressesGlobalTotal()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getWhoseOfUser = async () => {
        if ($B.Wallet.value) {
            const resp = await $B.getWhoseOfUser()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getReferralEarn = async () => {
        if ($B.Wallet.value) {
            const resp = await $B.getReferralEarn()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getClaimsAppear = async () => {
        if ($B.Wallet.value) {
            const resp = await $B.getClaimsAppear()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getBelowTwoAppear = async () => {
        if ($B.Wallet.value) {
            const resp = await $B.getBelowTwoAppear()
            if (resp) {
                return resp
            }
            return false
        }
    }

    let totalBnb
    const getDirectTransfers = async () => {
        if ($B.Wallet.value) {
            const resp = await $B.getDirectTransfers()
            if (resp) {
                totalBnb = resp
                return resp
            }
            return false
        }
    }

    const getClaimSpent = async () => {
        if ($B.Wallet.value) {
            const resp = await $B.getClaimSpent()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getGiftsAccrued = async () => {
        if ($B.Wallet.value) {
            const resp = await $B.getGiftsAccrued()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getGiftsSpent = async () => {
        if ($B.Wallet.value) {
            const resp = await $B.getGiftsSpent()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getDescendants = async () => {
        // index: 0n
        // isRight: false
        // isValue: true
        // parent: 0n
        // plateau: 1n
        const matrixData = []
        if (!coreUser) {
            await checkRegister()
        }

        const maxLevel = Number(coreUser.level)
        // todo -- check i <= maxLevel
        for (let i = 0; i < maxLevel; i++) {
            // response from getMatrixUser() contains user and total
            const matrixReceivedData = await $B.getMatrixUser(i)
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
        if (coreUser) {
            const matrixUser = await $B.getMatrixUser(0)
            if (matrixUser) {
                return {
                    core: coreUser,
                    matrix: matrixUser?.user,
                }
            }
        }
        return false
    }

    const getFirstUsers = async (total) => {
        const wallets = []
        for (let i = 0; i < total; i++) {
            wallets.push(await $B.getWalletByIndexFromMatrix(0, i))
        }
        return wallets
    }

    const withdrawClaims = async amount => await withdrawClaims(amount)

    const getCoreUserClaimBalance = async () => {
        if (coreUser) {
            return coreUser ? coreUser : false
        }

        // getting coreUser from SC
        const coreUserLocal = await $B.getUserFromCore()
        return coreUserLocal.claims
    }

    const getWithdraws = async () => {
        if ($B.Wallet.value) {
            const resp = await $B.getWithdraws()
            if (resp) {
                return resp
            }
            return false
        }
    }

    const getTotalFromMatrix = async (matrixIndex) => {
        const resp = await $B.getTotalFromMatrix(matrixIndex)
        if (resp) {
            return resp
        }
        return false
    }

    return {
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
    }
})

// todo: when going to auth protected page - need to run authorization
