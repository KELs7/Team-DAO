<script context='module'>
	export async function load({fetch}){
        const res = await fetch('http://localhost:3535/current/all/multi_sign/');
        const blockServiceData = await res.json();
        if(res.ok){
            return {
                props: {blockServiceData}
            }
        }
    }
		
</script> 

<script>
	import ProposalList from '$lib/proposalSomthing.svelte';
	import { walletAddress } from '$lib/stores/controllerStore.js';
	import SlidingNotification from '$lib/slidingNotification.svelte';
    //import { Socket } from 'dgram';

	//import { io } from 'node_modules/socket.io/client-dist/socket.io.js';
	// import { io } from 'socket.io-client';

	// const socket = io("ws://localhost:3535");
	// socket.on("connect", ()=>{
	// 	socket.emit('join','new-state-changes-by-transaction');
	// })
	// socket.on('new-state-changes-by-transaction', (msg)=>{
	// 	console.log(msg);
	// })

	export let blockServiceData;
	const noData =false;

	const proposalsFromBlockService = blockServiceData.multi_sign.proposal;
	
	let resultMessage = '';
	let errorInfo = '';
	let showNotification = false;
  	let link = '';

	// get users wallet to check whether user has already confirmed a proposal
	//const w = $walletAddress;
	//console.log(w)

	const proposalFetch = [];

	if (proposalsFromBlockService){
		for (const i in proposalsFromBlockService){
			proposalFetch.push({
				id:i, 
				type: proposalsFromBlockService[i].type, 
				proposal:JSON.stringify(proposalsFromBlockService[i]),
				//confirmNum: c.multi_sign.owner_confirmed[i].length || confirmNum,
				confirmNum: blockServiceData.multi_sign.owner_confirmed[i].length,
				iSubmitted: blockServiceData.multi_sign.owner_confirmed[i].includes($walletAddress)
			})
		}
	};


	let n = 0;
	const forSlidingMenu = (event)=> {
		n++;
		resultMessage = event.detail.resultMessage;
		errorInfo = event.detail.errorInfo;
		showNotification = event.detail.notification;
		link = event.detail.link;
		
		if (n==2){
			setTimeout(()=>{
				location.reload(); 
				n = 0;	
			}, 3200)
		}
	}

</script>

<div class='head-bar'>
	<p >Id</p>
	<p style="justify-self: start">Type</p>
    <p>Actions</p>
</div>


<!--display only if there are proposals-->
{#if proposalsFromBlockService}

	<ProposalList proposals={proposalFetch}/>

{:else}
	<div class='no-pending'>No pending proposals</div>
{/if}

<SlidingNotification 
    {resultMessage}
    {errorInfo} 
    show={showNotification} 
    {link}
/> 

<style>
    .head-bar {
		display: flex;
		/* grid-template-columns: repeat(3,1fr); */
		justify-content:space-around;
		align-content: center;
		/* transition: all 500ms ease;  */
		background-color: var(--panel-background-color);
		border-radius: 8px 8px 0 0;
		position: relative;
		width: 81%;
		height: 2rem;
		margin: auto;
		margin-top: 1rem;
		font-size: 0.8rem;
		user-select: none;
		cursor: pointer;
	}
	.head-bar p {
		margin-right: 3.2rem;
	}
	.no-pending {
		color: grey;
		position: relative;
		text-align: center;
		width: 80%;
		height: 2rem;
		margin: auto;
		margin-top: 0.8rem;
		font-size: 0.8rem;
		user-select: none;
		cursor: pointer;
	}
	@media (min-width: 1022px){
        .head-bar p {
		margin-right: 4.2rem;
		}
    }
	@media (max-width: 480px) {
		.head-bar p {
			margin-right: 2.4rem;
		}
    }
</style>