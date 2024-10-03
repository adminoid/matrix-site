# Run dev fast server

`bun --bun run dev`

# Find events in history

`getPastEvents`   

# Code description

Is there two entry points to initiate blockchain logic
1. `stores/useWeb3.js` - proxy for `libs/blockchain/classes.ts`
2. `components/ConnectButton.vue` - when press connect button
3. `pages/main.vue` - when loading page wrapper

