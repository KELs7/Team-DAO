<script>
    import { createEventDispatcher } from 'svelte';
    import { confirmProposal, revokeProposal} from '../js/funcs.js'
    import { fly } from 'svelte/transition';
    import Button from '$lib/awesomeButton.svelte';

    const dispatch = createEventDispatcher();

    export let confirmed = false;
    //export let confirmNum = 0;
    //export let proposalSubmitted = '';
    //export let proposalType = '';
    export let proposalId = '';

    export let proposals = '';

    let confirmBtnLabel = `confirm ${proposals.confirmNum}`
    let view;
    let viewStateBtn = 'view';
    let revokeBtnLabel = 'revoke';
    let resultMessage = '';
	let errorInfo = '';
  	let link = '';
    let cBtn;
    let rBtn;

    //console.log(`begin: ${confirmNum}`)

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
    <!--div class='inside-container'>
        <div>{proposalId}</div>
        <div class='ptype'>{proposalType}</div>
        <div class='action-btn'>

            <button on:click={()=>{
                view?viewStateBtn='view':viewStateBtn='close';
                view=!view;
                }}
            >{viewStateBtn}</button>

            <Button 
                on:output={handleOutput}
                btnLabel='view'
                returnBtnLabel='view'
                error=''
                awaitMode=true
                fn={confirmBtn}/>

            <button on:click|once={confirmBtn} bind:this={cBtn}>{confirmBtnLabel}</button>
            
            <Button 
                on:output={handleOutput}
                btnLabel='confirm'
                returnBtnLabel='confirm'
                error=''
                awaitMode=true
                fn={confirmBtn}/>
            
            {#if confirmed}
                <button on:click|once={revokeBtn} bind:this={rBtn}>{revokeBtnLabel}</button>
                <Button 
                    on:output={handleOutput}
                    btnLabel='revoke'
                    returnBtnLabel='revoke'
                    error=''
                    awaitMode=true
                    fn={revokeBtn}/>
            
            {/if} 

        </div> 
    </div-->
    <ul class="inside-container">
        {#each proposals as proposal}
        <li>
            <div style="display: flex; justify-content:space-around; align-content: center;">
                <div>{proposal.id}</div>
                <div class='ptype'>{proposal.type}</div>
                <div class='action-btn'>

                    <!--button on:click={()=>{
                        view?viewStateBtn='view':viewStateBtn='close';
                        view=!view;
                        }}
                    >{viewStateBtn}</button-->

                    <Button 
                        on:output={handleOutput}
                        btnLabel='view'
                        returnBtnLabel='view'
                        error=''
                        awaitMode=true
                        fn={confirmBtn}/>

                    <!--button on:click|once={confirmBtn} bind:this={cBtn}>{confirmBtnLabel}</button-->
                    
                    <Button 
                        on:output={handleOutput}
                        btnLabel='confirm'
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
        {#if view}
            <div transition:fly='{{y:-20, duration: 900}}' class='proposal'>
                {proposal.proposal}
            </div>
        {/if}
        {/each}
    </ul>
</div>



<style>
    .container {
        width: 81%;
        /* height: 3rem; */
        margin: auto;
        margin-top: 0.1rem;
        overflow-x: scroll;
        /* padding: 1rem 0; */
    }
    .inside-container {
        display: flex;
        flex-direction: column;
        justify-content:space-around;
        align-content: center; 
        width: 100%;
        box-sizing: border-box;
        margin: auto;
        /* margin-top: 0.1rem; */
        font-size: 0.7rem;
        color: white;
        background-color: var(--panel-background-color);
        padding: 0.8rem 0 0 0;
        

    }
    .proposal {
        width: 80%;
        margin: auto;
        padding: 0.48rem 0;
        margin-top: 0.5rem;
        font-family: 'Segoe UI';
        font-size: 0.65rem;
        color: var(--flat-primary);
        border: 2px solid var(--flat-primary);

    }

    /* button {
        font-size: 0.5rem;
        font-weight: bold;
        color: white;
        border-width: 2px;
        border-radius: 5px;
        background-image: var(--gradient-secondary);
    } */
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