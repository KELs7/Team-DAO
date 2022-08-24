
<!--sliding menu component-->
<script>
	import Header from '$lib/header.svelte';
	import LeftMenu from '$lib/leftMenu.svelte';
	import Menu from '$lib/menu.svelte';
	import { resultMessage, errorInfo, link, showNotification } from '$lib/stores/toasterInfo.js';
	import SlidingNotification from '$lib/slidingNotification.svelte';
	
	//css imports
	import '$lib/css/flex.css';
	import '$lib/css/layout.css';

	let s = false;	

</script>

<Header on:click={()=>s=!s}/>
<LeftMenu />
<Menu bind:s/>

<main>
	<slot/>
</main>

<SlidingNotification 
    resultMessage = {$resultMessage}
    errorInfo = {$errorInfo} 
    show={$showNotification} 
    link={$link}
/>

<style>
	main {
		padding: 7vmax 5vw 15vw 10vw;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	} 
	@media (max-width: 1200px) {
		main {
			padding: 15vw 3vw 15vw 10vw;
		}
	}
	@media (max-width: 480px) {
		main {
			/* padding: 30vh 5vw 15vw; */
			padding: 25vh 3.3vw 10vw;
		}
		/* main.connected{
			padding: 27vh 5vw 15vw;
		} */
    }
</style>
	

