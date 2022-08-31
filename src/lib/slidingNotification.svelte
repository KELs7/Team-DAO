<script>
	import { fly } from 'svelte/transition';
	
	export let resultMessage = '';
	export let errorInfo = '';
	export let show = false;
  	export let link = '';
</script>

{#if show}
    <!--div transition:fly='{{y:20, duration: 600}}' class='container'-->
	<div transition:fly='{{x:100, duration: 600}}' class="container {errorInfo?'error-toast':''}">
		{#if link}
			<p>sucess!</p>
		{/if}
		{#if resultMessage}
			<p class='result-container'>{resultMessage}</p>
		{/if}
		{#if link}
			<a style='color: var(--flat-secondary)' href={link}>view transaction</a>
		{/if}
		{#if errorInfo}
			<p class = "err">{errorInfo}</p>
		{/if}
    </div>
{/if}

<style>
	/* .container {
		display: flex;
		z-index: 100;
		padding: 0.5em 0 0.8em 0;
    	
		justify-content: center;
		align-items: center;
    	font-size: 0.7em;
		color: #000000;
		position: fixed;
		height: 15%;
		width: 100vw;
		left: 0;
		bottom: 0;
		background-color: #24ffbd;
		line-height: 0.5em;
	} */
	.container {
        display: flex;
		flex-direction: column;
        justify-content: center;
        align-items: center;
        outline: 0.1px solid grey;
        background-color: var(--panel-background-color);
		margin-top: 8em;
        font-size: 0.68em;
        position: fixed; 
        z-index: 99;
        border-left: 7px solid var(--flat-primary);
        border-radius: 2px;
        height: 7em;
        width: 14em;
        right: 0.7em;    
    }
	.result-container{
		margin-top: -0.2em; 
		font-size: 0.68em;
		width: 80%;
		overflow: hidden;
	}
	.err {
		padding: 0.8em 0; 
		text-align: center; 
		width:80%; 
		overflow-x:scroll; 
		color: red; 
		/* border: 1px solid white */
	}
	.err::-webkit-scrollbar{
        height: 2px;
    }   
    .err::-webkit-scrollbar-thumb{
        background-color: var(--flat-primary);
        border-radius: 5px;
    }
    .err::-webkit-scrollbar-corner{
        display: none;
    }
	.error-toast {

		border-left: 10px solid red;
	}
	
</style>