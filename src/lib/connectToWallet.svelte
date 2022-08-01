<script>
    
    import { connectionRequest, lwc, walletAddress} from '$lib/stores/controllerStore.js';
    import { errorInfo, showNotification } from '$lib/stores/toasterInfo.js';
    import WalletController from '../js/walletController';
    import { createEventDispatcher, onMount } from 'svelte';

    const dispatch = createEventDispatcher();

    onMount(()=>{
        const lamdenWalletController = new WalletController($connectionRequest)
        lwc.set(lamdenWalletController)

        const handleWalletInfo = (wInfo) => {
            if (wInfo.errors){
                wInfo.errors.forEach(err => {
                    //dispatch('walletInfo', err)
                    errorInfo.set(err);
                    showNotification.set(true);

                    setTimeout(()=>{
                        showNotification.set(false);
                    }, 4000)
                })
            }else{
                walletAddress.set(wInfo.wallets[0])
                dispatch('walletInfo', wInfo.wallets[0].substring(0,7) + ' . . . ' + wInfo.wallets[0].substring(60,64))
            }        
        }

        lamdenWalletController.events.on('newInfo', handleWalletInfo)

        lamdenWalletController.walletIsInstalled()
        .then(installed=>{
            if(!installed){
                dispatch('walletInfo', 'wallet not installed') 
            }
        })

    })

</script>