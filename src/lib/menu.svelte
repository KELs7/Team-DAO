<script>
	import { onMount } from 'svelte';
	import { lwc, walletAddress} from '$lib/stores/controllerStore.js';
	import { errorInfo, showNotification } from '$lib/stores/toasterInfo.js';
	import WalletController from '../js/walletController';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	
	let walletInfo = 'connect';
	let lamdenWalletController;

	onMount(()=>{
        lamdenWalletController = new WalletController()
        lamdenWalletController.storeConnectionRequest(connectionRequest)
        lamdenWalletController.events.on('newInfo', handleWalletInfo);
    })

    const connectionRequest = {
        appName: 'RocketSwap Team DAO', 
        version: '1.0.1', 
        logo: '../static/icons/logo.png', 
        contractName: 'multi_sign', 
        networkType: "marvinnet"
    };

    const handleWalletInfo = (wInfo) => {
        if (wInfo.errors){
            wInfo.errors.forEach(err => {
				walletInfo = 'connect';
                errorInfo.set(err);
                showNotification.set(true);

                setTimeout(()=>{
                    showNotification.set(false);
                }, 4000)
            })
        }else{
			let w = wInfo.wallets[0];
            walletAddress.set(w);
            walletInfo = w.substring(0,7) + ' . . . ' + w.substring(60,64);
            
        }        
    };

	const attemptConnect = ()=>{

        lamdenWalletController.walletIsInstalled()
        .then(installed=>{
			lwc.set(lamdenWalletController)
            if(!installed){
                errorInfo.set('wallet not installed')
            }
        })
    }
	

	export let s = false;

    const menuItems = [
        {
			label:'Submit Proposal', 
			route:'/submitProposal',
			icon: 'icons/mail-forward.svg',
			iconColor: 'icons/mail-forward-color.svg'
		},
        {
			label:'Pending Proposals', 
			route:'/pendingProposals',
			icon: 'icons/stack-2.svg',
			iconColor: 'icons/stack-2-color.svg'
		},
        {
			label:'About', 
			route:'/about',
			icon: 'icons/info-circle.svg',
			iconColor: 'icons/info-circle-color.svg'
		} 
    ]

</script>

{#if s}

<div transition:fly='{{x:-100, duration: 600}}' class="mobile slideNav">
	
	<ul>
		{#each menuItems as menuItem}
			
			<li
				class="flex align-center"
				class:text-gradient-primary={$page.url.pathname == menuItem.route}
				on:click={()=> {
					setTimeout(()=> s = false, 350);	
				}}
			>
			
			{#if menuItem.label=='Pending Proposals' || 'About'}
				<a href={menuItem.route} class="flex align-center">
					{#if $page.url.pathname == menuItem.route}
						<img src={menuItem.iconColor} alt={menuItem.label}>
						{menuItem.label}
					{:else}	
						<img src={menuItem.icon} alt="{menuItem.label}">
						{menuItem.label}
					{/if}
				</a>
				{:else}
				<a href={menuItem.route} class="flex align-center">
					{#if $page.url.pathname == menuItem.route}
						<img src={menuItem.iconColor} alt={menuItem.label}>
						{menuItem.label}
					{:else}	
						<img src={menuItem.icon} alt={menuItem.label}>
						{menuItem.label}
					{/if}
				</a>
			{/if}
		
			</li>
			
		{/each}
		<!--li><button class='walletConnect' on:click={attemptConnect}>{walletInfo}</button></li-->
		<div style="display: flex; width: 100%; justify-content:center;">
			<button class='walletConnect' on:click={attemptConnect}>{walletInfo}</button>
		</div>
	</ul>
	<div class="socials flex align-center space-around">
		<a href="https://twitter.com/RSwapOfficial" >
			<img src="icons/logo-telegram.svg" alt="Telegram" />
		</a>
		<a href="https://twitter.com/RSwapOfficial">
			<img class="logo_medium" src="icons/logo-medium.svg" alt="Medium" />
		</a>
		<a href="https://twitter.com/RSwapOfficial">
			<img src="icons/logo-twitter.svg" alt="Twitter" />
		</a>
	</div>
</div>

{/if}

<style>
	.slideNav {
		margin: 0;
		position: fixed;
		z-index: 10; 
		width: 69.6vw;
		/* left: -72vw; */
		height: 100vh;
		top: 14vh; 
		/* font-size: 2.5vh; */
		font-size: 0.8em;
		font-weight: 600;
		background-color: var(--panel-background-color);
		/* transition: left 500ms ease; */
	}
	.socials{
        /* padding: 0 20vw; */
		padding: 0 3em;
        box-sizing: border-box;
		margin-left: -1em;
    }
    .socials > a > img{
        width: 7vh;
    }
    .socials > a > img.logo_medium{
        width: 8vh;
    }
	ul {
		/* padding-left: 1.2rem; */
		padding-left: 1.2em;
		list-style: none;
		/* line-height: 4rem; */
		line-height: 4em;
		
	}
	li {
		user-select: none;
		cursor: pointer;
		padding: 0;
		margin: 0;
		
	}
    li a {
		/* padding: 1.5vh 2.5vw; */
		padding: 0.48em 0.375em;
        text-decoration: none;
		/* margin-right: 3vw; */
		margin-right: 0.45em;
    }
	li:hover > a{
		width: 100%;
        text-decoration: underline;
        background-color: var(--panel-background-highlight);
    }
	
	img {
		width: 5vh;
		/* margin-right: 2.5vw; */
		margin-right: 0.375em;
	}
	.walletConnect{
		background-color: var(--flat-primary);
		/* border-radius: 10px; */
		font-size: 1em;
		border-radius: 1em;
		/* width: 50vw; */
		/* width: 7.5em; */
		/* line-height: 1rem;  */
		line-height: 1em;
		text-align: center;
		color: var(--panel-background-color);
		/* padding: 0.5rem; */
		padding: 0.8em 2.8em;
	}
	.walletConnect:hover{
		color: var(--secondary-color);
	}
</style>