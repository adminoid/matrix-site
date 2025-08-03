# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server (using bun for faster performance)
bun --bun run dev

# Standard development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Generate static site
npm run generate

# Preview production build
npm run preview
```

## Architecture Overview

This is a Nuxt 3 application for a blockchain-based matrix system with Web3 integration.

### Key Architecture Components

**Blockchain Integration Layer:**
- `stores/useWeb3.js` - Main proxy/entry point for blockchain operations, manages External class singleton
- `libs/blockchain/classes.ts` - Core blockchain classes (External, Network, Common, CoreContract) with Web3 integration
- `config/runtime.js` - Runtime configuration for blockchain networks, contract addresses, and environment variables

**Entry Points for Blockchain Logic:**
1. `stores/useWeb3.js` - Primary proxy for `libs/blockchain/classes.ts`
2. `components/ConnectButton.vue` - Triggered when users connect wallet  
3. `pages/main.vue` - Initialized on page load

**Event System:**
- `libs/events-infura/abi-events.js` - Handles blockchain event retrieval via Infura API
- Uses event mapping for contract events (WhoseRegistered, ReferralEarn, ClaimsAppear, etc.)
- Event ABIs stored in `libs/events-infura/events-abi/` directory

**Smart Contract Integration:**
- Contract ABI: `artifacts/contracts/Core.json`
- Dual Web3 instances: MetaMask (MM) for transactions, RPC for read operations
- Singleton pattern for CoreContract instances

**Component Structure:**
- `components/pages-components/main/` - Main page specific components
- Matrix calculation logic in `stores/useWeb3.js` (getDescendantsProxy function)
- Reward/claims system components for blockchain interactions

**State Management:**
- Pinia stores in `stores/` directory
- `useLayout.js` and `useWeb3.js` for global state
- LocalStorage integration for wallet persistence

**Styling:**
- Sass with global styles in `assets/sass/global.sass`
- Component-specific Sass files in `assets/sass/components/`
- Bootstrap 5.3.2 integration

### Environment Configuration

The app expects these environment variables (configured in `config/runtime.js`):
- `CHAIN_ID`, `RPC_URL`, `CHAIN_NAME` - Blockchain network settings
- `CONTRACT_ADDRESS` - Smart contract address
- `INFURA_KEY` - For event history retrieval
- `ID_ADDRESS_0`, `ID_ADDRESS_1` - Special wallet addresses
- Currency settings (`CURRENCY_NAME`, `CURRENCY_SYMBOL`, `CURRENCY_DECIMALS`)

### Development Notes

- Uses TypeScript with Vue 3 composition API
- Web3.js v4 for blockchain interactions
- Hardcoded wallet address `0x2F9e33197Df28AAe0fB29Bec7EcFE08e8f03Bee3` for development
- Matrix system calculates user descendants using binary tree logic
- Event filtering and parsing for rewards/claims tracking