<script>
    import Form from '$lib/Form.svelte';
</script>

<Form 
    data={[
        {
            "type": "line",
            "key": "Title",
            "name": "name"
        },
        {
            "type": "line",
            "key": "Start date",
            "name": "start"
        },
        {
            "type": "line",
            "key": "End date",
            "name": "end"
        },
        {
            "type": "line",
            "key": "Categories (comma separated)",
            "name": "categories"
        },
        {
            "type": "text",
            "key": "Description",
            "name": "desc"
        }
    ]}
    route={'/api/add'}
/>