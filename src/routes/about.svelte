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
    import CollapsableBar from '$lib/collapsableBar.svelte';

    export let blockServiceData;

    const ownerList = blockServiceData.multi_sign.owners
    ownerList.forEach((address)=>{
        let index = ownerList.indexOf(address);
        let shortenedAddress = address.substring(0,7) + ' . . . ' + address.substring(60,64)
        ownerList[index] = shortenedAddress
    })

    const d ={
        owners: ownerList, 
        required: blockServiceData.multi_sign.required,
        //hardcoded because there's no initial registered action by multisig contract
        actions: {"actionAsset":"con_action"},
        daily_limit: blockServiceData.multi_sign.daily_limit
    }

    const proposalBarNames = [
        'Owners',
        'Registered actions',
        'Daily limit(s)',
        'Req. confirms'
    ];

    const owners = d.owners;
    
    let requiredConfirmations = d.required;

    let registeredActions = [];
    if (d.actions){
        for (const i in d.actions){
            registeredActions.push({action:i, contract:d.actions[i]})
        }
    }

    let dailyLimits = [];
    if (d.daily_limit){
        for (const i in d.daily_limit){
            dailyLimits.push({token:i, amount:d.daily_limit[i]})
        }
    }

</script>

{#each proposalBarNames as proposalName}
    <CollapsableBar barName={proposalName}>

        {#if proposalName=='Owners'}
            <div class='owner-list'>
                {#each owners as owner}
                    <ul>
                        <li>{owner}</li>
                    </ul>
                {/each}
            </div>
        {/if}

        {#if proposalName=='Registered actions'}
            <div class='actions'>
                <div style="grid-column: 1/2; color: var(--primary-color)">action</div>
                <div style="grid-column: 2/4; color: var(--primary-color)">contract</div>
                {#if d.actions}
                    {#each registeredActions as actionList}
                        <div style="grid-column: 1/2;">{actionList.action}</div>
                        <div style="grid-column: 2/4;">{actionList.contract}</div>
                    {/each}
                {/if}
            </div>
        {/if}

        {#if proposalName=='Daily limit(s)'}
            <div class='dailylimit'>
                <div style="grid-column: 1/2; color: var(--primary-color)">token</div>
                <div style="grid-column: 2/4; color: var(--primary-color)">contract</div>
                {#if d.daily_limit}
                    {#each dailyLimits as limitList}
                        <div style="grid-column: 1/2;">{limitList.token}</div>
                        <div style="grid-column: 2/4;">{limitList.amount.__fixed__}</div>
                    {/each}
                {/if}
                    
            </div>
        {/if}

        {#if proposalName=='Req. confirms'}
            <div class='owner-list' style="padding: 0.6rem 0 0.6rem 0;">
                {requiredConfirmations}
            </div>
        {/if}
    </CollapsableBar>
{/each}

<style>
    .owner-list {
        border: 2px solid var(--primary-color);
        position: relative;
        width: 58%;
        margin: auto;
        margin-top: 0.2rem;
        text-align: center;
        overflow: auto;
    }
    .actions {
        display: grid;
        grid-template-columns: repeat(2,1fr);
        border: 2px solid var(--flat-secondary);
        position: relative;
        width: 58%;
        padding: 0.6rem 0 0.6rem 0;
        margin: auto;
        margin-top: 0.2rem; 
    }
    .actions div {
        font-size: 0.65rem;
        justify-self: center;
    }
    .dailylimit {
        display: grid;
        grid-template-columns: repeat(2,1fr);
        border: 2px solid var(--flat-secondary);
        position: relative;
        width: 58%;
        padding: 0.6rem 0 0.6rem 0;
        margin: auto;
        margin-top: 0.2rem; 
    }
    .dailylimit div {
        font-size: 0.65rem;
        justify-self: center;
    }
    ul {
		padding: 0;
		list-style: none;
		line-height: 1.2rem;
		color: #ffffff;
		font-weight: bold;
	}
</style>
