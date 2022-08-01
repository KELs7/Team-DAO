<script>
    import { onMount } from 'svelte';
    import { lwc } from '$lib/stores/controllerStore.js';
    import { resultMessage, errorInfo, link, showNotification } from '$lib/stores/toasterInfo.js';
    import { confirmProposal, revokeProposal} from '../js/funcs.js'
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
                
                showNotification = true;
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

    <ul class="inside-container">

        {#each proposals as proposal}

        <li>
            <div style="display: flex; justify-content:space-around; align-content: center;">
                <div>{proposal.id}</div>
                <div class='ptype'>{proposal.type}</div>
                <div class='action-btn'>

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
                    
                    {#if proposal.iSubmitted}
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
    </ul>
</div>

<style>
    .container {
        width: 81%;
        margin: auto;
        margin-top: 0.1rem;
        overflow-x: scroll;
    }
    .inside-container {
        display: flex;
        flex-direction: column;
        justify-content:space-around;
        align-content: center; 
        width: 100%;
        box-sizing: border-box;
        margin: auto;
        font-size: 0.7rem;
        color: white;
        background-color: var(--panel-background-color);
        padding: 0.8rem 0 0 0;
    }
    .proposal-view{
        width: 100%;
        margin: 0;
        padding: 0.5rem;
        /*margin-top: 0.5rem;*/
        background-color: #000000;
        font-family: 'Segoe UI';
        font-size: 0.65rem;
        color: var(--flat-primary);
        border: 2px solid var(--flat-primary);
        box-sizing: border-box;
        overflow:scroll;

    }
    li {
        list-style: none;
        padding: 0.8rem 0 0.8rem 0;
        border-bottom: 1px solid #000000;
    }
    @media (max-width: 480px) {
        .inside-container{
            width: 100vw; 

        }
    }
</style>
