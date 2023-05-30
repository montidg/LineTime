<script>
    import Form from '$lib/Form.svelte';
</script>

<style>
    :global(body) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>

<Form 
    data={[
        {
            "type": "line",
            "key": "Username",
            "name": "username"
        },
        {
            "type": "line",
            "key": "Password",
            "name": "password"
        }
    ]}
    route='/api/account/auth'
/>