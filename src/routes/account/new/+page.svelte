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
        },
        {
            "type": "line",
            "key": "Confirm password",
            "name": "password2"
        }
    ]}
    route='/api/account/new'
/>