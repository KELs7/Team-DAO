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
		<p style='margin-top: -0.2rem; font-size: 0.72rem'>{resultMessage}</p>
	{/if}
		<a href={link}>view transaction</a>
	{/if}
	{#if errorInfo}
		<p style='color: red'>{errorInfo}</p>
	{/if}
    </div>
{/if}

<style>
	.container {
		display: flex;
		z-index: 800;
		padding: 0.5rem 0 0.8rem 0;
    	flex-direction: column;
		justify-content: center;
		align-items: center;
    	font-size: 0.76rem;
		color: #000000;
		position: fixed;
		height: 15%;
		width: 100vw;
		left: 0;
		bottom: 0;
		background-color: #24ffbd;
		line-height: 0.5rem;
	}
	
	
</style>