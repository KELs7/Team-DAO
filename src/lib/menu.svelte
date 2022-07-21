<script>
	import WalletConnect from '$lib/connectToWallet.svelte';
	import { page } from '$app/stores';
	

	let walletInfo = 'connect'
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

	const handleConnectionInfo=(e)=>{
		walletInfo = e.detail
	}
</script>

<WalletConnect on:walletInfo={handleConnectionInfo}/>

<div class="mobile slideNav {s?'slide':''}">
	
	<ul>
		{#each menuItems as menuItem}
			
			<li
				class="flex align-center"
				class:text-gradient-primary={$page.url.pathname == menuItem.route}
				on:click={()=> {
					setTimeout(()=> s = false, 400);	
				}}
			>
			
			{#if menuItem.label=='Pending Proposals' || 'About'}
				<a sveltekit:prefetch href={menuItem.route} class="flex align-center">
					{#if $page.url.pathname == menuItem.route}
						<img src={menuItem.iconColor} alt={menuItem.label}>
						{menuItem.label}
					{:else}	
						<img src={menuItem.icon} alt={menuItem.label}>
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
		<li><div class='walletConnect'>{walletInfo}</div></li>
	</ul>
	<div class="socials flex align-center space-between">
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

<style>
	.slideNav {
		margin: 0;
		position: fixed;
		z-index: 10; 
		width: 69.6vw;
		left: -72vw;
		height: 100vh;
		top: 14vh; 
		font-size: 2.5vh;
		font-weight: 600;
		background-color: var(--panel-background-color);
		transition: left 500ms ease;
	}
	.socials{
        padding: 0 20vw;
        box-sizing: border-box;
		margin-left: -1rem;
    }
    .socials > a > img{
        width: 7vh;
    }
    .socials > a > img.logo_medium{
        width: 8vh;
    }
	ul {
		padding-left: 1.2rem;
		list-style: none;
		line-height: 4rem;
		
	}
	li {
		user-select: none;
		cursor: pointer;
		padding: 0;
		margin: 0;
		
	}
    li a {
		padding: 1.5vh 2.5vw;
        text-decoration: none;
		margin-right: 3vw;
    }
	li:hover > a{
		width: 100%;
        text-decoration: underline;
        background-color: var(--panel-background-highlight);
    }
	.slide {
		left: -1vh;
	}
	
	img {
		width: 5vh;
		margin-right: 2.5vw;
	}
	.walletConnect{
		background-color: var(--flat-primary);
		border-radius: 10px;
		width: 50vw;
		line-height: 1rem; 
		text-align: center;
		color: var(--panel-background-color);
		padding: 0.5rem;
	}
	.walletConnect:hover{
		color: var(--secondary-color);
	}
</style>