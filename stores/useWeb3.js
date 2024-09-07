import {External} from "~/libs/blockchain/classes";
import {useNuxtApp} from "#app";
import {getGlobalThis} from "@vue/shared";

let BC = ref({})
const Wallet = ref('0x4D7fc3A131B9530996593e098EAAC5f43a7179A1')

if (import.meta.client && !import.meta.server) {

    console.info('THIS IS A CLIENT')

    if (Object.keys(BC.value).length === 0) {

        console.info('updating BC ref...')

        // make instance of External class
        const B = new External(useNuxtApp(), Wallet.value)
        const glob = getGlobalThis()
        await B.init(glob)
        BC.value = B
    }

    // todo: run getWhoseOfUser() of classes
}

export async function useWeb3Store() {
    console.info('..useWeb3Store..')
    console.log(BC.value)
}
