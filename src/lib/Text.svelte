<style>
    .main {
        border-radius: 10px;
        width: 200px;
        height: 100px;
        border: none;

        background: var(--dark-2);
    }
</style>

<script>
    export let form = 'No value specified';
</script>

<textarea class='main' bind:value={form}></textarea>