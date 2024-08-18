// returns runtimeConfig property for nuxt.config.ts

export default () => ({
    public: {
        APP_LINK:
            (process.env.APP_LINK)
                ? process.env.APP_LINK
                : 'https://metamask.app.link/dapp/romb.ru/',
        QR_IMG:
            (process.env.QR_IMG)
                ? process.env.QR_IMG
                : 'qr.png',
        // 97(0x61) - testnet, 1337(0x7A69) - hardhat, 56(0x38) - mainnet
        CHAIN_ID:
            (process.env.CHAIN_ID)
                ? process.env.CHAIN_ID
                : '0x7A69',
        RPC_URL:
            (process.env.RPC_URL)
                ? process.env.RPC_URL
                : 'http://127.0.0.1:8545',
        CHAIN_NAME:
            (process.env.CHAIN_NAME)
                ? process.env.CHAIN_NAME
                : 'HardHat Network',
        CONTRACT_ADDRESS:
            (process.env.CONTRACT_ADDRESS)
                ? process.env.CONTRACT_ADDRESS
                : '0x5fbdb2315678afecb367f032d93f642f64180aa3',
        ID_ADDRESS_0:
            (process.env.ID_ADDRESS_0)
                ? process.env.ID_ADDRESS_0
                : '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
        CURRENCY_NAME:
            (process.env.CURRENCY_NAME)
                ? process.env.CURRENCY_NAME
                : 'Hardhat coin',
        CURRENCY_SYMBOL:
            (process.env.CURRENCY_SYMBOL)
                ? process.env.CURRENCY_SYMBOL
                : 'HH',
        CURRENCY_DECIMALS:
            (process.env.CHAIN_ID)
                ? process.env.CHAIN_ID
                : '18',
    }
})
