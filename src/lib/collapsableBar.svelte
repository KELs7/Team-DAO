<script>

	export let barName = '';
	let secondLayer = false;
	let secondLayerEle;
	
</script>

<div class='collapsableBar' on:click={()=>{
	secondLayer=!secondLayer;
	if(secondLayerEle.style.maxHeight){
		secondLayerEle.style.maxHeight = null;
	}else{
		secondLayerEle.style.maxHeight = secondLayerEle.scrollHeight + 'px';
}}}>
	{barName}
	<img src='icons/arrow-down-circle-coloured.svg'
	 alt='arrow-down-icon' 
	 class="{secondLayer?'rotate-icon':''}" />
</div>

<!--grouping for items-->
<div bind:this={secondLayerEle} class="second-layer">
<!-- <div transition:fly='{{y:-20, duration: 900}}' class="second-layer"> -->
	<slot></slot>
</div>


<style>
	.collapsableBar {
		display: flex;
		justify-content: space-around;
		align-items: center;
		/* transition: all 500ms ease;  */
		background-color: var(--panel-background-color);
		color: white;
		position: relative;
		width: 60%;
		height: 3rem;
		margin: auto;
		border-radius: 8px;
		margin-top: 1rem;
		font-size: 2.2vh;
		user-select: none;
		cursor: pointer;
	}
	.second-layer {
		color: white; 
		overflow: hidden;  
		max-height: 0; 
		transition: max-height 0.7s ease-out; 
		font-size: 0.8rem;
		user-select: none;
		cursor: pointer;
	}
	img {
		position: absolute;
		right: 0;
		width: 30px;
		margin-right: 0.5rem;
		transition: transform 500ms ease; 
	}
	.rotate-icon {
		transform: rotate(-180deg);
	}
</style>
