<script context="module">
	
	export function load({ error}) {
		return {
			props: { message: error.message}
		};
	}
</script>

<script>
	
	export let message;
	console.log(message)

</script>

<div class="err">
	{message=="request to http://localhost:3535/current/all/multi_sign/ failed, reason: connect ECONNREFUSED 127.0.0.1:3535"?"cannot reach block service":message}
</div>

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
