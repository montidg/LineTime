<style>
    .main {
        width: 200px;
        border: none;

        font-family: monospace;
        font-size: 12px;

        background: var(--dark-2);
    }
</style>

<script>
    export let form = 'No value specified';
</script>

<input type='text' class='main' bind:value={form}>