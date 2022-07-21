<!-- <script context='module'>
	export async function load({fetch}){
		const [propsl, confirms] = await Promise.all([
			fetch('http://localhost:3535/current/all/multi_sign/proposal'),
			fetch('http://localhost:3737/contracts/multi_sign/owner_confirmed?key=1')
			//fetch('http://localhost:3535/current/all/multi_sign/owner_confirmed')
		])
		
		const p = await propsl.json()
		const c = await confirms.json()

		
		return {
			props: {p, c}
		};
		
	}
</script> -->

<script>
	import ProposalList from '$lib/proposalSomthing.svelte';
	import { walletAddress } from '$lib/stores/controllerStore.js';
	import SlidingNotification from '$lib/slidingNotification.svelte';
    //import { Socket } from 'dgram';

	//import { io } from 'node_modules/socket.io/client-dist/socket.io.js';
	import { io } from 'socket.io-client';

	const socket = io("ws://localhost:3535");
	socket.on("connect", ()=>{
		socket.emit('join','new-state-changes-by-transaction');
	})
	socket.on('new-state-changes-by-transaction', (msg)=>{
		console.log(msg);
	})

	export let p = {
		proposal: {
			1:{add_owner: 'dog', type: 'state_update'}, 
			2:{add_owner: 'dog', type: 'state_update'}
		}};

	export let c = {value: [$walletAddress]};
	let resultMessage = '';
	let errorInfo = '';
	let showNotification = false;
  	let link = '';

	// placeholder for testing revoke button appearing for proposal submitted by this user
	const w = $walletAddress

	let proposalFetch = [];

	// if (p.multi_sign.proposal){
	// 	for (const i in p.multi_sign.proposal){
	// 		proposalFetch.push({
	// 			id:i, 
	// 			type:p.multi_sign.proposal[i].type || p.type, 
	// 			proposal:JSON.stringify(p.multi_sign.proposal[i]) || p.proposal,
	// 			//confirmNum: c.multi_sign.owner_confirmed[i].length || confirmNum,
	// 			confirmNum: c.value.length ,
	// 			iSubmitted: c.value.includes(w)
	// 			//iSubmitted: c.multi_sign.owner_confirmed[i].includes(w)
	// 		})
	// 	}
	// };

	if ( p.proposal){
		for (const i in p.proposal){
			proposalFetch.push({
				id:i, 
				type: p.proposal[i].type, 
				proposal:JSON.stringify(p.proposal[i]),
				//confirmNum: c.multi_sign.owner_confirmed[i].length || confirmNum,
				confirmNum: c.value.length ,
				iSubmitted: c.value.includes(w)
				//iSubmitted: c.multi_sign.owner_confirmed[i].includes(w)
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

	//console.log(`proposalsPage: ${c.value.length}`)
	// refecth confirmNum data and remove pending proposal when executed

</script>

<div class='head-bar'>
	<p >Id</p>
	<p style="justify-self: start">Type</p>
    <p>Actions</p>
</div>

{#if p}

	<!-- {#each proposalFetch as propsl}
		<ProposalList 
			on:message = {forSlidingMenu}
			proposalId={propsl.id} 
			proposalType={propsl.type} 
			proposalSubmitted={propsl.proposal}
			confirmNum={propsl.confirmNum}
			confirmed={propsl.iSubmitted}
		/>
	{/each} -->
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