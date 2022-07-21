<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	export let v = '';
	let err = '';
	let authShow = false;
	const pattern = /^[a-fA-F0-9]+$/;
	function check(){
		if(v.length>64){
			authShow = true;
			err = 'address greater than 64 chars!';
			dispatch('err', err)
		}
		if(v.length==64){
			authShow = false;
			dispatch('err', '')
		}
		if(v.length<64){
			authShow = true;
			err = 'address less than 64 chars!';
			dispatch('err', err)
		}
		if(!v.match(pattern)){
			authShow = true;
			err = 'character not hexadecimal!';
			dispatch('err', err)
		}
		if(!v){
			authShow = false;
			dispatch('err','inactive')
		}
		
	}
</script>

<input bind:value={v} on:input={check}/>
{#if authShow}
<p style='color:red'>{err}</p>
{/if}

<style>
	input {
		width: 80%;
        outline:none;
        background-color: transparent;
        font-size: small;
        border-top-style: hidden;
        color: var(--flat-primary); 
        border-left-style: hidden;
        border-right-style: hidden;
	}
	p {
		font-size: 0.56rem;
	}
</style>