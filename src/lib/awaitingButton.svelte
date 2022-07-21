<script>
	export let btnLabel = 'click';
	export let btnType = 'button';
	//export let result;
	let btn;

	async function chng(){
		btnLabel = '. . .';	
		
		setTimeout(()=>{
			btnLabel = 'submit';
			btn.addEventListener('click', chng);
		}, 4500)
		
	}
</script>

<button type={btnType} on:click|once={chng} bind:this={btn}>
	{btnLabel}
</button>

<style>
	button {
        font-size: 0.8rem; 
        font-weight: bold;
        color: white;
        border-width: 2px;
        border-radius: 5px;
        /* margin-right: 0.15rem; */
        background-image: var(--gradient-secondary);
        cursor: pointer;
    }
</style>
