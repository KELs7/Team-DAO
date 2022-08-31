<!-- <script context='module'>
    export async function load({fetch}){
        const res = await fetch('http://localhost:3535/current/all/multi_sign/');
        const blockServiceData = await res.json();
        if(res.ok){
            return {
                props: {blockServiceData}
            }
        }
    }
</script>  -->

<script>
    import CollapsableBar from '$lib/collapsableBar.svelte';
    //import json for testing purpose instead of pulling data from block service
    import blockServiceData from '$lib/config/mockDataForAboutPage.json'
    //const blockServiceDataU;
    //export let blockServiceData;

    const ownerList = blockServiceData.multi_sign.owners
    ownerList.forEach((address)=>{
        let index = ownerList.indexOf(address);
        let shortenedAddress = address.substring(0,7);
        shortenedAddress += ' . . . ' + address.substring(60,64);
        ownerList[index] = shortenedAddress;
    })

    const d = {
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
                        <div class="action-table">{actionList.action}</div>
                        <div class="action-table2" >{actionList.contract}</div>
                    {/each}
                {/if} 
            </div>
        {/if}

        {#if proposalName=='Daily limit(s)'}
            <div class='dailylimit'>
                <div style="grid-column: 1/2; color: var(--primary-color)">token</div>
                <div style="grid-column: 2/4; color: var(--primary-color)">limit</div>
                    {#if d.daily_limit}
                        {#each dailyLimits as limitList}
                            <div class="daily-table">{limitList.token}</div>
                            <div class="daily-table2" >{limitList.amount.__fixed__}</div>
                        {/each}
                    {/if}
                
                    
            </div> 
        {/if}

        {#if proposalName=='Req. confirms'}
            <div class='owner-list' style="padding: 0.6em 0">
                {requiredConfirmations}
            </div>
        {/if}
    </CollapsableBar>
{/each}

<style>
    .owner-list {
        border: 0.125em solid var(--primary-color);
        position: relative;
        /* width: 78%; */
        width: 48%;
        margin: auto;
        margin-top: 0.2em;
        text-align: center;
        overflow: auto;
        scrollbar-color: var(--flat-primary) var(--panel-background-color); 
    }
    .owner-list::-webkit-scrollbar{
        height: auto;
    }   
    .owner-list::-webkit-scrollbar-thumb{
        background-color: var(--flat-primary);
        border-radius: 5px;
    }
    .owner-list::-webkit-scrollbar-corner{
        display: none;
    }
    .actions {
        display: grid;
        grid-template-columns: repeat(2,1fr);
        border: 0.125em solid var(--flat-secondary);
        position: relative;
        /* width: 78%; */
        width: 48%;
        padding: 0.6em 0 0.6em 0;
        margin: auto;
        margin-top: 0.2em; 
    }
    .actions div {
        /* font-size: 0.65em; */
        font-size: 0.8em;
        justify-self: center;
    }
    .action-table{
        grid-column: 1/2;  
        padding: 0.2em 0.8em 0.5em 0.8em; 
        width: 70%; 
        text-align:center; 
        overflow-x:scroll;
        scrollbar-color: var(--flat-primary) var(--panel-background-color); 
    }
    .action-table::-webkit-scrollbar{
        height: auto;
    }   
    .action-table::-webkit-scrollbar-thumb{
        background-color: var(--flat-primary);
        border-radius: 5px;
    }
    .action-table::-webkit-scrollbar-corner{
        display: none;
    }
    .action-table2{
        grid-column: 2/4;  
        padding: 0.2em 0.8em 0.5em 0.8em; 
        border-left: 1px solid grey;
        width: 70%; 
        text-align:center; 
        overflow-x:scroll;
        scrollbar-color: var(--flat-primary) var(--panel-background-color); 
    }
    .action-table2::-webkit-scrollbar{
        height: auto;
    }   
    .action-table2::-webkit-scrollbar-thumb{
        background-color: var(--flat-primary);
        border-radius: 5px;
    }
    .action-table2::-webkit-scrollbar-corner{
        display: none;
    }
    
    .dailylimit {
        display: grid;
        grid-template-columns: repeat(2,1fr);
        border: 2px solid var(--flat-secondary);
        position: relative;
        /* width: 78%; */
        width: 48%;
        padding: 0.6em 0 0.6em 0;
        margin: auto;
        margin-top: 0.2em; 
    }
    .dailylimit div {
        font-size: 0.8em;
        justify-self: center;
    }
    .daily-table{
        grid-column: 1/2;  
        padding: 0.2em 0.8em 0.5em 0.8em; 
        width: 70%; 
        text-align:center; 
        overflow-x:scroll;
        scrollbar-color: var(--flat-primary) var(--panel-background-color); 
    }
    .daily-table::-webkit-scrollbar{
        height: auto;
    }   
    .daily-table::-webkit-scrollbar-thumb{
        background-color: var(--flat-primary);
        border-radius: 5px;
    }
    .daily-table::-webkit-scrollbar-corner{
        display: none;
    }
    .daily-table2{
        grid-column: 2/4;  
        padding: 0.2em 0.8em 0.5em 0.8em; 
        /* border-left: 1px solid grey; */
        border-left: 0.0625em solid grey;
        width: 70%; 
        text-align:center; 
        overflow-x:scroll;
        scrollbar-color: var(--flat-primary) var(--panel-background-color); 
    }
    .daily-table2::-webkit-scrollbar{
        height: auto;
    }   
    .daily-table2::-webkit-scrollbar-thumb{
        background-color: var(--flat-primary);
        border-radius: 5px;
    }
    .daily-table2::-webkit-scrollbar-corner{
        display: none;
    }
    ul {
		padding: 0;
		list-style: none;
		line-height: 1.2em;
		color: #ffffff;
		font-weight: bold;
	}
    @media (max-width: 480px) {
		.owner-list { 
			width: 78%;
		}
        .actions {
            width: 78%;
        }
        .dailylimit {
            width: 78%;
        }
    }
</style>
