<script>
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { errorInfo, link, showNotification } from '$lib/stores/toasterInfo.js';
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
                //resultMessage.set(txBlockResult.result);
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

        if($lwc){
            $lwc.events.on('txStatus', handleTxResults)
        }
    })
    
    const submitAddOwnerPropsl = ()=>{
        btnl = '. . .'
        const propslInfo = buildTxInfo('addOwner', addOwner_address)
        $lwc.sendTransaction(propslInfo);
        //clear input
        addOwner_address = '';
    }

    const submitRemoveOwnerPropsl = ()=>{
        btnl = '. . .'
        const propslInfo = buildTxInfo('removeOwner', removeOwner_address)
        $lwc.sendTransaction(propslInfo);
        //clear input
        removeOwner_address = '';
    }

    const submitReplaceOwnerPropsl = ()=>{
        btnl = '. . .'
        const propslInfo = buildTxInfo('replaceOwner', [replaceOwner_newOwner, replaceOwner_existing])
        $lwc.sendTransaction(propslInfo);
        //clear input
        replaceOwner_newOwner = ''; replaceOwner_existing = '';
    }

    const submitRegisterActionPropsl = ()=>{
        btnl = '. . .'
        const propslInfo = buildTxInfo('registerAction', [registerAction_action, registerAction_contract])
        $lwc.sendTransaction(propslInfo);
        //clear input
        registerAction_action = ''; registerAction_contract = '';
    }

    const submitUnregisterActionPropsl = ()=>{
        btnl = '. . .'
        const propslInfo = buildTxInfo('unregisterAction', unregisterAction_action)
        $lwc.sendTransaction(propslInfo);
        //clear input
        unregisterAction_action = '';
    }

    const submitConfirmsPropsl = ()=>{
        btnl = '. . .'
        const propslInfo = buildTxInfo('confirms', changeConfirms)
        $lwc.sendTransaction(propslInfo);
        //clear input
        changeConfirms = '';
    }

    const submitDailyLimitPropsl = ()=>{
        btnl = '. . .'
        const propslInfo = buildTxInfo('dailyLimit', [changeDailyLimit_token, changeDailyLimit_amount])
        $lwc.sendTransaction(propslInfo);
        //clear input
        changeDailyLimit_token = ''; changeDailyLimit_amount = '';
    }

    const submitTransferPropsl = ()=>{
        btnl = '. . .'
        const propslInfo = buildTxInfo('transfer', [transfer_tokenName, transfer_amount, transfer_to])
        $lwc.sendTransaction(propslInfo);
        //clear input
        transfer_tokenName = ''; transfer_amount = ''; transfer_to = '';
    }

    const submitApprovePropsl = ()=>{
        btnl = '. . .'
        const propslInfo = buildTxInfo('approve', [approve_tokenName, approve_amount, approve_to])
        $lwc.sendTransaction(propslInfo);
        //clear input
        approve_tokenName = ''; approve_amount = ''; approve_to = '';
    }

    const submitTransferFromPropsl = ()=>{
        btnl = '. . .'
        const propslInfo = buildTxInfo('approve', [transferFrom_tokenName, transferFrom_amount, transferFrom_to, transferFrom_mainAccount])
        $lwc.sendTransaction(propslInfo);
        //clear input
        transferFrom_tokenName = ''; transferFrom_amount = ''; transferFrom_to = ''; transferFrom_mainAccount = '';
    }

    const submitActionPropsl = ()=>{
        action_bulk==1?action_bulk='False':action_bulk='True';
        action_payload[2]?action_payload=JSON.parse(action_payload):action_payload=null;

        btnl = '. . .'
        const propslInfo = buildTxInfo('action', [action_action, action_bulk, action_payload])
        $lwc.sendTransaction(propslInfo);
        //clear input
        action_action = ''; action_payload = '';
        // set to default value
        action_bulk = 1
    }

    const submitExtActionPropsl = ()=>{
        extAction_payload?extAction_payload=JSON.parse(extAction_payload):extAction_payload=null;

        // clear input
        i1 = '';i2 = '';i3 = '';

        btnl = '. . .'
        const propslInfo = buildTxInfo('extAction', [extAction_actionCore, extAction_action, extAction_payload])
        $lwc.sendTransaction(propslInfo);
        //clear input
        extAction_actionCore = ''; extAction_action = ''; extAction_payload = '';
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
                    <div class='form'  id='replaceOwner'transition:fly='{{y:-20, duration: 600}}'
                    >
                    	<div style="grid-column: 1/2">
	                    <label for='replaceOwner_newOwner'>
	                        new owner
                            <InputAV
                                    on:err={grabInputError}
                                    bind:v={replaceOwner_newOwner}
                            />
	                    </label>

	                    <label for='replaceOwner_existing'>
	                        exist. owner
                            <InputAV
                                    on:err={grabInputError}
                                    bind:v={replaceOwner_existing}
                            />
	                    </label>
                        </div>

                        <div style="grid-column: 2/3; justify-self: end">
                            <SubmitButton 
                                btnLabel={btnl}
                                error={inputError}
                                on:click={submitReplaceOwnerPropsl}/>
                        </div>
                    </div>
                    {/if}

                    {#if stateProposal == 'remove owner'}
                    <div  class='form' id='removeOwner' transition:fly='{{y:-20, duration: 600}}'
                    >
                    	<div style="grid-column: 1/2">
                            <label for='removeOwner_address'>
                                owner wallet
                                <InputAV
                                    on:err={grabInputError}
                                    bind:v={removeOwner_address}
                            />
                            </label>
                       </div>
                       
                        <div style="grid-column: 2/3; justify-self: end">
                            <SubmitButton 
                                btnLabel={btnl}
                                error={inputError}
                                on:click={submitRemoveOwnerPropsl}/>
                        </div>
                    </div>
                    {/if}

                    {#if stateProposal == 'register action'}
                    <div class='form' id='registerAction' transition:fly='{{y:-20, duration: 600}}'
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
                                btnLabel={btnl}
                                on:click={submitRegisterActionPropsl}/>
                        </div>
                    </div>
                    {/if}

                    {#if stateProposal == 'unregister action'}
                    <div class='form' id='unregisterAction' transition:fly='{{y:-20, duration: 600}}'
                    >
                    	<div style="grid-column: 1/2">
                            <label>
                                action contract
                                <input bind:value={unregisterAction_action}/>
                            </label>
                        </div>
                        
                        <div style="grid-column: 2/3; justify-self: end">
                            <SubmitButton 
                                btnLabel={btnl}
                                on:click={submitUnregisterActionPropsl}/>
                        </div>
                    </div>
                    {/if}

                    {#if stateProposal == 'change requirement'}
                    <div class='form' transition:fly='{{y:-20, duration: 600}}'>
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
                    <div class='form' transition:fly='{{y:-20, duration: 600}}'>
                    	<div style="grid-column: 1/2">
                            <label for="tokenDailyLimit">
                                token
                                <input bind:value={changeDailyLimit_token}/>
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
                    <div class='form' id='transfer' transition:fly='{{y:-20, duration: 600}}'
                    >
                    	<div style='display: grid; grid-column: 1/2'>
                            <label for='transfer_tokenName'>
                                token
                                <input bind:value={transfer_tokenName}>
                            </label>
                        
                            <label for='transfer_amount'>
                                amount
                                <InputDV
                                    on:err={grabInputError}
                                    bind:v={transfer_amount}
                                />
                            </label>

                            <label for='transfer_to'>
                                to
                                <input bind:value={transfer_to}>
                            </label>
			            </div>
			
                        <div style="grid-column: 2/3; justify-self: end">
                            <SubmitButton 
                                btnLabel={btnl}
                                error={inputError}
                                on:click={submitTransferPropsl}/>
                        </div>
                    </div>
                    {/if}
                    
                    {#if lst001Proposal == 'approve'}
                    <div class='form'  id='approve' transition:fly='{{y:-20, duration: 600}}'
                    >
                    	<div style="grid-column: 1/2">
				            <label for='approve_tokenName'>
				                token
				                <input bind:value={approve_tokenName}>
				            </label>
				
                            <label for='approve_amount'>
                                amount
                                <InputDV
                                    on:err={grabInputError}
                                    bind:v={approve_amount}
                                />
                            </label>

                            <label for='approve_to'>
                                to
                                <input bind:value={approve_to}>
                            </label>
                        </div>

                        <div style="grid-column: 2/3; justify-self: end">
                            <SubmitButton 
                                btnLabel={btnl}
                                error={inputError}
                                on:click={submitApprovePropsl}/>
                        </div>
                    </div>
                    {/if}

                    {#if lst001Proposal == 'transfer_from'}
                    <div  class='form' id='transferFrom' transition:fly='{{y:-20, duration: 600}}'>
                    	<div style="grid-column: 1/2">
                            <label for='transferFrom_tokenName'>
                                token
                                <input bind:value={transferFrom_tokenName}/>
                            </label>
                            
                            <label for='transferFrom_amount'>
                                amount
                                <InputDV
                                    on:err={grabInputError}
                                    bind:v={transferFrom_amount}
                                />
                            </label>

                            <label for='transferFrom_to'>
                                to
                                <input bind:value={transferFrom_to}/>
                            </label>

                            <label for='transferFrom_mainAccount'>
                                main account
                                <input bind:value={transferFrom_mainAccount}>
                            </label>
			            </div>
			
                        <div style="grid-column: 2/3; justify-self: end">
                            <SubmitButton 
                                btnLabel={btnl}
                                error={inputError}
                                on:click={submitTransferFromPropsl}/>
                        </div>
                    </div>
                    {/if}
            </CollapsableBarLayer>
            {/each}
        {/if}

        {#if proposalName == 'Action'}
        <div class='form' id='action' transition:fly='{{y:-20, duration: 600}}'
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
                    btnLabel={btnl}
                    on:click={submitActionPropsl}/>
            </div>
        </div>
        {/if}

        {#if proposalName == 'External Action'}
        <div class='form' id='extAction' transition:fly='{{y:-20, duration: 600}}'
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
                    btnLabel={btnl}
                    on:click={submitExtActionPropsl}/>
            </div>
        </div>
        {/if}
    </CollapsableBar>
{/each}



<style>
    .form{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: space-between;
        align-items: flex-end;
        width: 42%;
        font-size: 0.75em;
        margin: auto;
        border: 0.125em solid var(--flat-primary);
        margin-top: 2em;
        margin-bottom: 2em;
        padding: 1.5em;
    }
    .form input {
        width: 80%;
        outline:none;
        background-color: transparent;
        font-size: small;
        border-top-style: hidden;
        color: var(--flat-primary); 
        border-left-style: hidden;
        border-right-style: hidden;
    }
    .form input[type='radio'] {
        width: auto;
        margin-left: 0;
    }
    .form label{
        display: flex;
        flex-direction: column;
        margin-top: 0.4em;
    }
    .bulk-options label{
        display: inline;
        font-size: 0.6em;
    }
    @media (max-width: 480px) {
		.form{
			width: 70%;	
		}
    }
   
</style>
