import { writable} from 'svelte/store';

export const connectionRequest = writable({
    appName: 'RocketSwap Team DAO', 
    version: '1.0.0', 
    logo: '../static/icons/logo.png', 
    contractName: 'multi_sign', 
    networkType: "marvinnet"
});

export let lwc = writable(null)

export let walletAddress = writable(null)


