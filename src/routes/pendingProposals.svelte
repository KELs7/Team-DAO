<!-- <script context='module'>
	export async function load({fetch}){
        const res = await fetch('http://localhost:3535/current/all/multi_sign/');
        const blockServiceData = await res.json();
        if(res.ok){
            return {
                props: {blockServiceData}
            }
        }
    }
		
</script>  -->

<script>
	import ProposalList from '$lib/proposalSomthing.svelte';
	import { walletAddress } from '$lib/stores/controllerStore.js';
	import { proposalsStore } from '$lib/stores/proposals.js';
	import blockServiceData from'$lib/config/mockDataForPendingPage.json';

	// import { io } from 'socket.io-client';

	// const socket = io("ws://localhost:3535");
	// socket.on("connect", ()=>{
	// 	socket.emit('join','new-state-changes-by-transaction');
	// })
	// socket.on('new-state-changes-by-transaction', (msg)=>{
	// 	console.log(msg);
	// })

	//export let blockServiceData;
	const noData =false;

	const proposalsFromBlockService = blockServiceData.multi_sign.proposal;

	// write proposals to svelte store
	proposalsStore.set(proposalsFromBlockService)

	let resultMessage = '';
	let errorInfo = '';
	let showNotification = false;
  	let link = '';

	const proposalFetch = [];

	if (proposalsFromBlockService){
		for (const i in proposalsFromBlockService){
			proposalFetch.push({
				id:i, 
				type: proposalsFromBlockService[i].type, 
				proposal:JSON.stringify(proposalsFromBlockService[i]),
				confirmNum: blockServiceData.multi_sign.owner_confirmed[i].length,
				iSubmitted: blockServiceData.multi_sign.owner_confirmed[i].includes($walletAddress)
			})
		}
	};




</script>
<!--div class="container">
	<div class='head-bar'>
		<div style="grid-column: 1/2; margin-left: 0.8em">Id</div>
		<p style="justify-self: start">Type</p>
		<div id="proposal-type" style="grid-column: 2/3">Type</div>
		<div id="proposal-buttons" style="grid-column: 3/5">Actions</div>
	</div>
</div-->

	<!--display only if there are proposals-->
	{#if proposalsFromBlockService}

		<ProposalList proposals={proposalFetch}/>

	{:else}
		<div class='no-pending'>No pending proposals</div>
	{/if}


<style>
	.container {
		margin-top: 0.2em;
	}
    .head-bar {
		display:grid; 
		grid-template-columns: 1fr 1fr 2fr;
		align-items: center;
		background-color: var(--panel-background-color); 
		/* border-radius: 8px 8px 0 0;  */
		border-radius: 0.5em 0.5em 0 0;
		width: 80%;
		margin: auto; 
		font-size: 0.8em; 
		height: 2em;
		margin-top: 0.8em;
		user-select: none;
		cursor: pointer;
	}
	/* .head-bar div {
		margin-right: 3.2rem;
	} */
	.no-pending {
		color: grey;
		position: relative;
		text-align: center;
		width: 80%;
		height: 2em;
		margin: auto;
		margin-top: 0.8em;
		font-size: 0.8em;
		user-select: none;
		cursor: pointer;
	}
	
	@media (max-width: 480px) {
		.head-bar #proposal-type {
			text-align:center;
		}
		.head-bar #proposal-buttons {
			text-align:center;
		}
    }
</style>