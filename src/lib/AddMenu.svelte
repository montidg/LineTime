<script>
    import Form from '$lib/Form.svelte';
    
    let exportSettings = {};

    $: if (exportSettings.submit === true) { 
        exportSettings.submit = -1;
        main();
    }

    let a;

    let status = 'Nothing submitted';

    async function main() {
        let data = await fetch("/api/add", {
            "method": "POST",
            "body": JSON.stringify(exportSettings)
        }).then(x => x.json());

        status = data.success;

        if (status == 'next') {
            status = '';
        }
    }

</script>

<style>
    :global(body) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>

<p>
    {status}
</p>

<Form data={[
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
bind:form={exportSettings}
/>