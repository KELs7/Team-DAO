
<!-- This component is no longer in use -->

<script>
	export let list;
	export let components;

	let selected = components[0]
	let s = false;
</script>


<div class="slideNav {s?'slide':''}">
	
	<img src='icons/arrow-right.svg' 
		alt='sliding menu' 
		class="{s?'rotate-icon':''}" 
		on:click={()=>s=!s}>
	
	<ul>
		{#each list as listItem}
			
			<li	style='display: block'
				on:click={()=> {
					selected=components[listItem.index];
					setTimeout(()=> s = false, 400);	
				}}
			>{listItem.item}</li>
			
		{/each}
	</ul>
</div>

<svelte:component this={selected.component}/>
	

<style>
	.slideNav {
		margin: 0;
		position: fixed;
		z-index: 10;
		width: 66.6%;
		left: -69%;
		height: 100vh;
		top: -1rem;
		background-color: var(--flat-secondary);
		transition: left 500ms ease;
	}
	ul {
		padding-left: 1rem;
		list-style: none;
		line-height: 4rem;
		color: #ffffff;
		font-weight: bold;
	}
	li {
		user-select: none;
		cursor: pointer;
	}
	.slide {
		left: -1%;
	}
	.rotate-icon {
		transform: rotate(-180deg);
	}
	img {
		position: absolute;
		width: 2.5rem;
		height: 3rem;
		top: 50%;
		right: -2.5rem;
		border-radius: 0 3rem 3rem  0;
		background-color: var(--flat-primary);
		transition: transform 500ms ease; 
		transform: translateY(-50%);
		user-select: none;
		cursor: pointer;	 
	}
</style>
