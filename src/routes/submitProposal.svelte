<script>
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { resultMessage, errorInfo, link, showNotification } from '$lib/stores/toasterInfo.js';
    import { buildTxInfo } from '../js/funcs.js';
    import {proposalBarNames, stateUpdateProposals, lst001Proposals} from '$lib/config/submitPageLayout.js'
    import { lwc } from '$lib/stores/controllerStore.js';
    import CollapsableBar from '$lib/collapsableBar.svelte';
    import CollapsableBarLayer from '$lib/collapsableBarLayer.svelte';
    import { inputValidators } from '$lib/components/inputValidators/inputValidators.js';
    import SubmitButton from '$lib/anotherBtn.svelte';

    const { InputAV, InputDV, InputTKV, InputWNV } = inputValidators
    
    //inputs
    let addOwner_address = '';
    let replaceOwner_existing = '';
    let replaceOwner_newOwner = '';
    let removeOwner_address = '';
    let registerAction_action = '';
    let registerAction_contract = '';
    let unregisterAction_action = '';
    let changeConfirms = '';
    let changeDailyLimit_token = '';
    let changeDailyLimit_amount = '';

    let transfer_tokenName = '';
    let transfer_amount = '';
    let transfer_to = '';
    let approve_tokenName = '';
    let approve_amount = '';
    let approve_to = '';
    let transferFrom_tokenName = '';
    let transferFrom_amount = '';
    let transferFrom_to = '';
    let transferFrom_mainAccount = '';

    let action_action = '';
    let action_bulk = 1;
    let action_payload = '';

    let extAction_actionCore = '';
    let extAction_action = '';
    let extAction_payload = '';

    let inputError = 'inactive';
    let btnl = 'submit';

    //lamdenWallet event handler here
    const handleTxResults = (txResults)=>{
        const { data } = txResults
        let txR = data
        const { errors, txBlockResult } = txR
        if (errors){
            errorInfo.set(errors);
            btnl = 'submit';
            showNotification.set(true);
            setTimeout(()=>{
                showNotification.set(false);
            }, 6000)
        } else{
            
            if (txBlockResult && Object.keys(txBlockResult).length > 0){
                resultMessage.set(txBlockResult.result);
                link.set('https://www.tauhq.com/transactions/'+ txBlockResult.hash);
                btnl = 'submit';  
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
    
    const submitAddOwnerPropsl = ()=>{
        btnl = '. . .'
        const propslInfo = buildTxInfo('addOwner', addOwner_address)
        $lwc.sendTransaction(propslInfo);
        //clear input
        addOwner_address = '';
    }

    const submitRemoveOwnerPropsl = ()=>{
        // clear input
        i1 = '';
        return sendPropsl('removeOwner', in1)
    }

    const submitReplaceOwnerPropsl = ()=>{
        // clear input
        i1 = '';i2 = '';
        return sendPropsl('replaceOwner', in2) 
    }

    const submitRegisterActionPropsl = ()=>{
        // clear input
        i1 = '';i2 = '';
        return sendPropsl('registerAction', in2)
    }

    const submitUnregisterActionPropsl = ()=>{
        // clear input
        i1 = '';
        return sendPropsl('unregisterAction', in1)
    }

    const submitConfirmsPropsl = ()=>{
        
        // clear input
        i1 = '';
        return sendPropsl('confirms', in1)
    }

    const submitDailyLimitPropsl = ()=>{
        
        // clear input
        i1 = '';i2 = '';
        return sendPropsl('dailyLimit', in2)
    }

    const submitTransferPropsl = ()=>{
        
        // clear input
        i1 = '';i2 = '';i3 = '';
        return sendPropsl('transfer', in3)
    }

    const submitApprovePropsl = ()=>{
        
        // clear input
        i1 = '';i2 = '';i3 = '';
        return sendPropsl('approve', in3)
    }

    const submitTransferFromPropsl = ()=>{
        
        // clear input
        i1 = '';i2 = '';i3 = '';i4 = '';
        return sendPropsl('transferFrom', in4)
    }

    const submitActionPropsl = ()=>{
        args = inS;
        args[1]==1?args[1]='False':args[1]='True';
        args[2]?args[2]=JSON.parse(args[2]):args[2]=null;

        
        // clear input
        i1 = '';i2 = '';
        return sendPropsl('action', args)
    }

    const submitExtActionPropsl = ()=>{
        args = in3;
        args[2]?args[2]=JSON.parse(args[2]):args[2]=null;

        
        // clear input
        i1 = '';i2 = '';i3 = '';

        return sendPropsl('extAction', args)
    }

    const grabInputError = (e)=>{
	  inputError = e.detail
	}

    

</script>

{#each proposalBarNames as proposalName}
    <CollapsableBar barName={proposalName}>
        {#if proposalName == 'State Update'}
            {#each stateUpdateProposals as stateProposal}
                <CollapsableBarLayer layerName={stateProposal}>
                    {#if stateProposal == 'add owner'}
                    <div class='form' transition:fly='{{y:-20, duration: 600}}'>
                    	 <div style="grid-column: 1/2">
                            <label for='addNewOwner'>
                                owner wallet
                                <InputAV
                                    on:err={grabInputError}
                                    bind:v={addOwner_address}
                                />
	                        </label>
	                    </div>
                        <div style="grid-column: 2/3; justify-self: end">
                            <SubmitButton 
                                btnLabel={btnl}
                                error={inputError} 
                                on:click={submitAddOwnerPropsl}/>
                        </div>
                    </div>
                    {/if}

                    {#if stateProposal == 'replace owner'}
                    <form  id='replaceOwner'transition:fly='{{y:-20, duration: 600}}'
                    >
                    	<div style="grid-column: 1/2">
	                    <label>
	                        new owner
	                        <input bind:value={replaceOwner_newOwner}/>
	                    </label>

	                    <label>
	                        exist. owner
	                        <input bind:value={replaceOwner_existing}/>
	                    </label>
                        </div>

                        <div style="grid-column: 2/3; justify-self: end">
                            <SubmitButton 
                                btnType='submit'
                                btnLabel='submit'/>
                        </div>
                    </form>
                    {/if}

                    {#if stateProposal == 'remove owner'}
                    <form  id='removeOwner'transition:fly='{{y:-20, duration: 600}}'
                    >
                    	<div style="grid-column: 1/2">
                            <label>
                                owner wallet
                                <input bind:value={removeOwner_address}/>
                             </label>
                       </div>
                       
                        <div style="grid-column: 2/3; justify-self: end">
                            <SubmitButton 
                                btnType='submit'
                                btnLabel='submit'/>
                        </div>
                    </form>
                    {/if}

                    {#if stateProposal == 'register action'}
                    <form  id='registerAction' transition:fly='{{y:-20, duration: 600}}'
                    >
                        <div style="grid-column: 1/2">
                            <label>
                                action 
                                <input bind:value={registerAction_action}/>
                            </label>

                            <label>
                                contract
                                <input bind:value={registerAction_contract}/>
                            </label>
                        </div>
                        
                        <div style="grid-column: 2/3; justify-self: end">
                            <SubmitButton 
                                btnType='submit'
                                btnLabel='submit'/>
                        </div>
                    </form>
                    {/if}

                    {#if stateProposal == 'unregister action'}
                    <form  id='unregisterAction' transition:fly='{{y:-20, duration: 600}}'
                    >
                    	<div style="grid-column: 1/2">
                            <label>
                                action contract
                                <input bind:value={unregisterAction_action}/>
                            </label>
                        </div>
                        
                        <div style="grid-column: 2/3; justify-self: end">
                            <SubmitButton 
                                btnType='submit'
                                btnLabel='submit'/>
                        </div>
                    </form>
                    {/if}

                    {#if stateProposal == 'change requirement'}
                    <div class='form'>
                    	<div style="grid-column: 1/2">
                            <label for='confirms'>
                                confirm no.
                                <InputWNV
                                    on:err={grabInputError}
                                    bind:v={changeConfirms}
                                />
                            </label>
                       </div>
                       
                        <div style="grid-column: 2/3; justify-self: end">
                            <SubmitButton 
                                btnLabel={btnl}
                                error={inputError} 
                                on:click={submitConfirmsPropsl}/>
                        </div>
                    </div>
                    {/if}

                    {#if stateProposal == 'change daily limit'}
                    <div class='form'>
                    	<div style="grid-column: 1/2">
                            <label for="tokenDailyLimit">
                                token
                                <InputTKV
                                    on:err={grabInputError}
                                    bind:v={changeDailyLimit_token}
                                />
                            </label>

                            <label for='dailyLimit'>
                                amount
                                <InputDV
                                    on:err={grabInputError}
                                    bind:v={changeDailyLimit_amount}
                                />
                            </label>
			            </div>
			
                        <div style="grid-column: 2/3; justify-self: end">
                            <SubmitButton 
                                btnLabel={btnl}
                                error={inputError} 
                                on:click={submitDailyLimitPropsl}/>
                        </div>
                    </div>
                    {/if}    
                </CollapsableBarLayer>
            {/each}
        {/if}

        {#if proposalName == 'LST001'}
            {#each lst001Proposals as lst001Proposal}
            <CollapsableBarLayer layerName={lst001Proposal}>
                {#if lst001Proposal == 'transfer'}
                    <form  id='transfer' transition:fly='{{y:-20, duration: 600}}'
                    >
                    	<div style='display: grid; grid-column: 1/2'>
                            <label>
                                token
                                <input bind:value={transfer_tokenName}>
                            </label>
                        
                            <label>
                                amount
                                <input bind:value={transfer_amount}>
                            </label>

                            <label>
                                to
                                <input bind:value={transfer_to}>
                            </label>
			            </div>
			
                        <div style="grid-column: 2/3; justify-self: end">
                            <SubmitButton 
                                btnType='submit'
                                btnLabel='submit'/>
                        </div>
                    </form>
                    {/if}
                    
                    {#if lst001Proposal == 'approve'}
                    <form  id='approve' transition:fly='{{y:-20, duration: 600}}'
                    >
                    	<div style="grid-column: 1/2">
				            <label>
				                token
				                <input bind:value={approve_tokenName}>
				            </label>
				
                            <label>
                                amount
                                <input bind:value={approve_amount}>
                            </label>

                            <label>
                                to
                                <input bind:value={approve_to}>
                            </label>
                        </div>

                        <div style="grid-column: 2/3; justify-self: end">
                            <SubmitButton 
                                btnType='submit'
                                btnLabel='submit'/>
                        </div>
                    </form>
                    {/if}

                    {#if lst001Proposal == 'transfer_from'}
                    <form  id='transferFrom' transition:fly='{{y:-20, duration: 600}}'
                    >
                    	<div style="grid-column: 1/2">
		                <label>
		                    token
		                    <input bind:value={transferFrom_tokenName}/>
		                </label>
		                
		                <label>
		                    amount
		                    <input bind:value={transferFrom_amount}/>
		                </label>

		                <label>
		                    to
		                    <input bind:value={transferFrom_to}/>
		                </label>

		                <label >
		                    main account
		                    <input bind:value={transferFrom_mainAccount}>
		                </label>
			            </div>
			
                        <div style="grid-column: 2/3; justify-self: end">
                            <SubmitButton 
                                btnType='submit'
                                btnLabel='submit'/>
                        </div>
                    </form>
                    {/if}
            </CollapsableBarLayer>
            {/each}
        {/if}

        {#if proposalName == 'Action'}
        <form  id='action' transition:fly='{{y:-20, duration: 600}}'
        >
        	<div style="grid-column: 1/2">
		    <label>
		        action
		        <input bind:value={action_action}>
		    </label>
		</div>
		
            	<div class='bulk-options' style="grid-column: 1/2" >
                <p style="margin-bottom: 0;">bulk</p>
                <label>
                    
                    <input  type='radio' bind:group={action_bulk} value={1}/>
                    False
                </label>
                <label>
                    <input type='radio' bind:group={action_bulk} value={2}/>
                    True
                </label>
            </div>

            <label style="grid-column: 1/2" >
                payload
                <input bind:value={action_payload}>
            </label>

            <div style="grid-column: 2/3; justify-self: end">
                <SubmitButton 
                    btnType='submit'
                    btnLabel='submit'/>
            </div>
        </form>
        {/if}

        {#if proposalName == 'External Action'}
        <form id='extAction' transition:fly='{{y:-20, duration: 600}}'
        >
        	<div style="grid-column: 1/2">
		    <label>
		        action core
		        <input bind:value={extAction_actionCore}>
		    </label>

		    <label >
		        action
		        <input bind:value={extAction_action}>
		    </label>

		    <label>
		        payload
		        <input bind:value={extAction_payload}>
		    </label>
		</div>
		
            <div style="grid-column: 2/3; justify-self: end">
                <SubmitButton 
                    btnType='submit'
                    btnLabel='submit'/>
            </div>
        </form>
        {/if}
    </CollapsableBar>
{/each}



<style>
    form {
	    display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: space-between;
        align-items: flex-end;
        width: 50%;
        font-size: 2vh;
        margin: auto;
        border: 2px solid var(--flat-primary);
        margin-top: 2rem;
        margin-bottom: 2rem;
        padding: 1.5rem;
	}

    .form{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: space-between;
        align-items: flex-end;
        width: 50%;
        font-size: 2vh;
        margin: auto;
        border: 2px solid var(--flat-primary);
        margin-top: 2rem;
        margin-bottom: 2rem;
        padding: 1.5rem;
    }
    
    form input {
        width: 80%;
        outline:none;
        background-color: transparent;
        font-size: small;
        border-top-style: hidden;
        color: var(--flat-primary); 
        border-left-style: hidden;
        border-right-style: hidden;
    }
    form input[type='radio'] {
        width: auto;
        margin-left: 0;
    }
    form label{
        
        display: flex;
        flex-direction: column;
        margin-top: 0.4rem;
    }
    .bulk-options label{
        display: inline;
        font-size: 0.6rem;
    }
   
</style>
