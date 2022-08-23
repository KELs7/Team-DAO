<script>
    export let proposal;
</script>

<div class="background">

    <div class="container">
        <p style="font-size: 1.2em;">Proposal</p>
        <textarea rows="8">
            
            {JSON.stringify(proposal)}
            
        </textarea>
    </div>
</div>


<style>
    .background {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0,0,0,0.7);
    }
    .container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 1em;
        font-size: 0.8em;
        background-color: var(--panel-background-color);
        border-radius: 5px;
        width: 70vw;
        /* height: 50vh; */
        overflow: scroll;
    }
    textarea {
        width: 98%; 
        background-color: #000000; 
        color: var(--primary-color-dim);
        font-size: 0.8em;
        border-style: none;
    }
</style>