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
		/* font-size: 2vh; */
		/* font-size: 0.727em; */
		font-size: 0.8em;
		border: 0.125em solid var(--flat-secondary);
		position: relative;
		width: 48%;
		height: 4em;
		margin: auto;
		margin-top: 0.2em;
	}
	@media (max-width: 480px) {
		.layer{
			width: 78%;
			
		}
    }
</style>
