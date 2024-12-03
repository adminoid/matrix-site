// returns runtimeConfig property for nuxt.config.ts

export default () => ({
    public: {
        APP_LINK:
            (process.env.APP_LINK)
                ? process.env.APP_LINK
                : '',
        QR_IMG:
            (process.env.QR_IMG)
                ? process.env.QR_IMG
                : '',
        // 97(0x61) - testnet, 1337(0x7A69) - hardhat, 56(0x38) - mainnet
        CHAIN_ID:
            (process.env.CHAIN_ID)
                ? process.env.CHAIN_ID
                : '',
        RPC_URL:
            (process.env.RPC_URL)
                ? process.env.RPC_URL
                : '',
        CHAIN_NAME:
            (process.env.CHAIN_NAME)
                ? process.env.CHAIN_NAME
                : '',
        CONTRACT_ADDRESS:
            (process.env.CONTRACT_ADDRESS)
                ? process.env.CONTRACT_ADDRESS
                : '',
        ID_ADDRESS_0:
            (process.env.ID_ADDRESS_0)
                ? process.env.ID_ADDRESS_0
                : '',
        ID_ADDRESS_1:
            (process.env.ID_ADDRESS_1)
                ? process.env.ID_ADDRESS_1
                : '',
        CURRENCY_NAME:
            (process.env.CURRENCY_NAME)
                ? process.env.CURRENCY_NAME
                : '',
        CURRENCY_SYMBOL:
            (process.env.CURRENCY_SYMBOL)
                ? process.env.CURRENCY_SYMBOL
                : '',
        CURRENCY_DECIMALS:
            (process.env.CHAIN_ID)
                ? process.env.CHAIN_ID
                : '18',
        INFURA_KEY:
            (process.env.CHAIN_ID)
                ? process.env.INFURA_KEY
                : '',
    }
})
