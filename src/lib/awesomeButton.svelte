<script>
	import {createEventDispatcher} from 'svelte';
	const dispatch = createEventDispatcher();
	
	export let btnLabel='';

	//for returning button name after received results
    $: returnedBtnLabel = btnLabel;

	export let inputVal='';
	export let awaitMode = false;	
	
	//for deciding when to make button inactive
	export let error='';
	
	//for passing a function to the button 
	export let fn;

    let btn;
	
	async function handleFn(){
		if (awaitMode){
			btnLabel  = '. . .';
			let result = await fn(inputVal) 
			if(result){
				dispatch('output',{
					result: result
				});
				btnLabel = returnedBtnLabel;
                btn.addEventListener('click', handleFn)
			}
		}else{
			let result = fn(inputVal) 
			dispatch('output',{
				result: result
			})
            btn.addEventListener('click', handleFn)
		}
	}
</script>

<!-- class={error?'inactive':''} -->

<button class="outlined primary white {error?'inactive':''}" on:click|once={handleFn}>
	<div><b>{btnLabel}</b></div>
</button>

<style>
    /* button{
        font-size: 0.8rem; 
        font-weight: bold;
        color: white;
        border-width: 2px;
		border-style: solid;
		border-image: var(--primary-gradient);
        border-radius: 5px;
        background-image: var(--secondary-gradient) ;
		cursor: pointer;
	} */
	button{
		margin: 0;
		font-size: 0.58rem;
	}
	.inactive{
		opacity: 0.5;
		pointer-events: none;
		user-select: none
	}
</style>