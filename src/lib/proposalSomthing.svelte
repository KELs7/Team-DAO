<script>
    import { createEventDispatcher } from 'svelte';
    import { confirmProposal, revokeProposal} from '../js/funcs.js'
    import { fly } from 'svelte/transition';
    import Button from '$lib/awesomeButton.svelte';

    const dispatch = createEventDispatcher();

    export let confirmed = false;
    export let proposalId = '';
    export let proposals = '';

    let view = 0;
    let viewStateBtn = 'view';
    let revokeBtnLabel = 'revoke';
    let resultMessage = '';
    let errorInfo = '';
    let link = '';
    let cBtn;
    let rBtn;
    //let proposalView;

    const confirmBtn = async ()=> {

        const txInfo =  confirmProposal(proposalId);
        confirmBtnLabel = '. . .';

       // const result = await sendProposal(txInfo);

        if (result.hash){
            resultMessage = result.result
            link ='https://www.tauhq.com/transactions/'+ result.hash
        } else {
            errorInfo = result.error;
        }
        dispatch('message', {
			resultMessage: resultMessage,
            errorInfo: errorInfo,
            notification: true,
            link: link
		});

        setTimeout(()=>{
            dispatch('message', {
                notification: false,
		    });
            confirmBtnLabel = `confirm ${proposals.confirmNum}`;
            //console.log(`confirm: ${confirmNum}`)
            //confirmed = true;
            cBtn.addEventListener('click', confirmBtn);
        }
        , 3800) 
    }

    const revokeBtn = async ()=> {
        const txInfo =  revokeProposal(proposalId);
        revokeBtnLabel = '. . .';

        const result = await sendProposal(txInfo)

        if (result.hash){
            resultMessage = result.result
            link ='https://www.tauhq.com/transactions/'+ result.hash
        } else {
        errorInfo = result.error;
        }

        dispatch('message', {
			resultMessage: resultMessage,
            errorInfo: errorInfo,
            notification: true,
            link: link
		});

        setTimeout(()=>{
            dispatch('message', {
                notification: false,
		    });
            revokeBtnLabel = 'revoke';
            //console.log(`revoke: ${confirmNum}`)
            confirmed=false;
            rBtn.addEventListener('click', revokeBtn);
        }
        , 3800) 
        
    }
    const handleOutput = (e)=>{
        console.log(e)
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
                    >{viewStateBtn}</button>

                    

                    <!--button on:click|once={confirmBtn} bind:this={cBtn}>{confirmBtnLabel}</button-->
                    
                    <Button 
                        on:output={handleOutput}
                        btnLabel={`confirm ${proposal.confirmNum}`}
                        returnBtnLabel='confirm'
                        error=''
                        awaitMode=true
                        fn={confirmBtn}/>
                    
                    {#if proposal.iSubmitted}
                        <!--button on:click|once={revokeBtn} bind:this={rBtn}>{revokeBtnLabel}</button-->
                        <Button 
                            on:output={handleOutput}
                            btnLabel='revoke'
                            returnBtnLabel='revoke'
                            error=''
                            awaitMode=true
                            fn={revokeBtn}/>
                    
                    {/if} 
                </div>        
            </div> 
        </li>
        {#if view == proposal.id}
            <div transition:fly='{{y:-5, duration: 600}}' class='proposal-view'>
                {proposal.proposal}
            </div>
        {/if}
        <!--div bind:this={proposalView} class="proposal-view">
            {proposal.proposal}
        </div-->
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
