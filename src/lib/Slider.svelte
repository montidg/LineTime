<style>
    .main, .inner {
        border-radius: 30px;
        width: 30px;
        height: 30px;
    }
    .main {
        padding: 5px;
        padding-right: 75px;
        background: var(--red-1);
        transition: background-color ease-in-out 0.2s, padding ease-in-out 0.2s;
    }
    .inner {
        background: var(--light-1);
    }
    .main.clicked-true, .main.clicked--1 {
        padding: 5px;
        padding-left: 75px;

        background: var(--green-1);
    }
</style>

<script>
    export let form = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class='main clicked-{form}' on:click={() => form = !form}>
    <div class='inner'></div>
</div>