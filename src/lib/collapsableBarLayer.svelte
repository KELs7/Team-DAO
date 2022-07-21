<script>
	export let layerName = ''
	let layerActive = false;
</script>

<div class="layer" on:click={()=>layerActive=!layerActive}>{layerName}</div>
{#if layerActive}
	<slot></slot>
{/if}

<style>
	.layer {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2vh;
		border: 2px solid var(--flat-secondary);
		position: relative;
		width: 58%;
		height: 3rem;
		margin: auto;
		margin-top: 0.2rem;
	}
</style>
