<script>
    import { onMount } from 'svelte';
    import { lwc } from '$lib/stores/controllerStore.js';
    import { resultMessage, errorInfo, link, showNotification } from '$lib/stores/toasterInfo.js';
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
                resultMessage.set(txBlockResult.result);
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

    //ptype , action-btn

</script>

<div class='container'>

    <!-- <ul class="inside-container">

        {#each proposals as proposal}

        <li>
            <div style="display: flex; justify-content:space-around; align-content: center;">
            <div style="display:grid; grid-template-columns: 1fr 1fr 2fr">
                <div style="grid-column: 1/2; margin-left: 0.88em; outline: 2px solid blue">{proposal.id}</div>
                <div style="grid-column: 2/3; outline: 2px solid blue">{proposal.type}</div>
                <div style="grid-column: 3/5; outline: 2px solid blue">

                    <button 
                        class="outlined primary white"
                        id = {proposal.id}
                        on:click={()=>{
                            view==proposal.id?viewStateBtn='view':viewStateBtn='close';
                            if(view==proposal.id){
                                view=0;
                            }else{
                                view=proposal.id;
                            }
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
                </div>        
            </div> 
        </li>

        {#if view == proposal.id}
            <div transition:fly='{{y:-5, duration: 600}}' class='proposal-view'>
                {proposal.proposal}
            </div>
        {/if}
        {/each}
    </ul> -->

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
        width: 80%;
        margin: auto;
        margin-top: 0.1em;
        user-select: none;
        overflow-x: scroll;
    }
    /* thead th {
        border-bottom: 1px solid #000000;
    } */
    .inside-container {
        display: flex;
        flex-direction: column;
        justify-content:space-around;
        align-content: center; 
        width: 100%;
        box-sizing: border-box;
        margin: auto;
        font-size: 0.7em;
        color: white;
        background-color: var(--panel-background-color);
        padding: 0.98em 0 0 0;
    }
    .proposal-view{
        width: 100%;
        margin: 0;
        padding: 2em 1em;
        /*margin-top: 0.5rem;*/
        background-color: #000000;
        font-family: 'Segoe UI';
        font-size: 1em;
        color: var(--flat-primary);
        border: 0.125em solid var(--flat-primary);
        box-sizing: border-box;
        overflow:scroll;

    }
    button {
        font-size: 0.77em;
        margin-right: 1em;
    }
    li {
        /* display: inline-block; */
        list-style: none;
        padding: 0.88em 0 0.88em 0;
        border-bottom: 0.0625em solid #000000;
    }
    @media (max-width: 480px) {
        .inside-container{
            width: 160vw; 

        }
    }
</style>
