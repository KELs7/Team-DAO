<script>
    import { onMount } from 'svelte';
    import { lwc } from '$lib/stores/controllerStore.js';
    import { errorInfo, link, showNotification } from '$lib/stores/toasterInfo.js';
    import { confirmProposal, revokeProposal} from '../js/funcs.js'
    import { proposalsStore } from '$lib/stores/proposals.js';
    import Modal from './components/modal.svelte';
    import { fly } from 'svelte/transition';

    export let proposals = '';
    let view = 0;
    let viewStateBtn = 'view';
    //store individual button names
    let revokeBtnLabel = {};
    let confirmBtnLabel = {};

    //store individual buttons elements
    let confirmBtns = {};
    let revokeBtns = {};

    //store current proposal id
    let proposalId;

    let showModal = false;
   
    const handleTxResults = (txResults)=>{
        const { data } = txResults
        let txR = data
        const { errors, txBlockResult } = txR
        if (errors){
            errorInfo.set(errors);

            proposals.map(proposal =>{
                if(proposal.id===proposalId){
                    confirmBtnLabel[proposal.id] = `confirm ${proposal.confirmNum}`;
                    revokeBtnLabel[proposal.id] = 'revoke';
                    
                    confirmBtns[proposal.id].addEventListener("click", confirm);
                    revokeBtns[proposal.id].addEventListener("click", revoke);
                }
            })
            
            showNotification.set(true);
            
            setTimeout(()=>{
                
                showNotification.set(false)
            
            }, 6000)
        } else{
            
            if (txBlockResult && Object.keys(txBlockResult).length > 0){
                //resultMessage.set(txBlockResult.result);
                link.set('https://www.tauhq.com/transactions/'+ txBlockResult.hash);
                confirmBtnLabel = 'confirm';
                revokeBtnLabel = 'revoke';  
                
                showNotification.set(true);
                setTimeout(()=>{
                    
                    showNotification.set(false);
                   
                }, 6000)
            }
        }         
    }

    //lamdenWalletController listener here
    onMount(()=>{
        
        $lwc.events.on('txStatus', handleTxResults)
        
    })

    const confirm = (e)=>{
        proposalId = e.target.id;
        confirmBtnLabel[proposalId] = '. . .';
        const propslInfo = confirmProposal(proposalId)
        $lwc.sendTransaction(propslInfo);
    }

    const revoke = (e)=>{
        proposalId = e.target.id;
        revokeBtnLabel[proposalId] = '. . .';
        const propslInfo = revokeProposal(proposalId);
        $lwc.sendTransaction(propslInfo);
    }

</script>

<div class='container'>
    
    <table >
        <thead style="font-size: 0.8em; border-bottom: 2px solid black">
            <tr>
                <th>ID</th>
                <th>TYPE</th>
                <th>ACTIONS</th>
                
            </tr>
            <!--div style="width: 100%; height: 2px; background-color: #000000"></div-->
        </thead>
        <tbody style="font-size: 0.75em">
            {#each proposals as proposal}
                <tr>
                    <td>{proposal.id}</td>
                    <td>{proposal.type} </td>
                    <td>
                        <button 
                        class="outlined primary white"
                        id = {proposal.id}
                        on:click={()=>{
                            view=proposal.id;
                            showModal = true;
                        }}
                        >
                            <div><strong>{viewStateBtn}</strong></div>
                        </button>

                                        
                        <button 
                            class="outlined primary white"
                            
                            on:click|once={confirm}
                            bind:this={confirmBtns[proposal.id]}
                            ><div><strong id = {proposal.id}>{
                                confirmBtnLabel[proposal.id]?confirmBtnLabel[proposal.id]:`confirm ${proposal.confirmNum}`
                            }</strong></div>
                        </button>
                        
                        {#if true}
                            <button 
                                class="outlined primary white"
                                
                                on:click|once={revoke}
                                bind:this={revokeBtns[proposal.id]}
                            ><div><strong id = {proposal.id}>{
                                revokeBtnLabel[proposal.id]?revokeBtnLabel[proposal.id]:'revoke'
                                }</strong></div>
                            </button>
                        
                        {/if} 
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>

</div>

<Modal
    bind:showModal
    proposal = {$proposalsStore[view]}
/>

<style>
    .container {
        display: flex;
        justify-content: center;
        width: 80%;
        margin: auto;
        margin-top: 1em;
        user-select: none;
        overflow: scroll;
        scrollbar-color: var(--flat-primary) var(--panel-background-color); 
    }
    .container::-webkit-scrollbar{
        height: auto;
    }   
    .container::-webkit-scrollbar-thumb{
        background-color: var(--flat-primary);
        border-radius: 5px;
    }
    .container::-webkit-scrollbar-corner{
        display: none;
    }
    button {
        font-size: 0.77em;
        margin-right: 1em;
    }
    @media (min-width: 623px) {
        table{
            width: 420rem;

        }
    } 
    
</style>
