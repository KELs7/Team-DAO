<script>
	import { fly } from 'svelte/transition';
	
	export let resultMessage = '';
	export let errorInfo = '';
	export let show = false;
  	export let link = '';
</script>

{#if show}
    <div transition:fly='{{y:20, duration: 600}}' class='container'>
	{#if link}
		<p style>sucess!</p>
	{#if resultMessage}
		<p class='result-container'>{resultMessage}</p>
	{/if}
		<a href={link}>view transaction</a>
	{/if}
	{#if errorInfo}
		<p style='padding: 0.8em 0; text-align: center; width:80%; overflow-x:scroll; color: red; border: 1px solid white'>{errorInfo}</p>
	{/if}
    </div>
{/if}

<style>
	.container {
		display: flex;
		z-index: 100;
		padding: 0.5em 0 0.8em 0;
    	flex-direction: column;
		justify-content: center;
		align-items: center;
    	font-size: 0.68em;
		color: #000000;
		position: fixed;
		height: 15%;
		width: 100vw;
		left: 0;
		bottom: 0;
		background-color: #24ffbd;
		line-height: 0.5em;
	}
	.result-container{
		margin-top: -0.2em; 
		font-size: 0.68em;
		width: 80%;
		overflow: hidden;
	}
	
</style>