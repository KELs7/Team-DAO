<script context="module">
	
	export function load({ error}) {
		return {
			props: { message: error.message}
		};
	}
</script>

<script>
	
	export let message;

</script>

<div class="err">{message}</div>

<style>
    .err {
		font-size: 0.7em;
		color: red;
       	text-align: center;
        margin: auto;
		width: 80%;
		box-sizing: border-box;
		/* outline: 0.8px solid whitesmoke; */
		overflow: scroll; 
    }
</style>
