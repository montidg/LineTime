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
            window.location.href = '/';
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
        "type": "text",
        "key": "Title",
        "name": "name"
    },
    {
        "type": "text",
        "key": "Start date",
        "name": "start"
    },
    {
        "type": "text",
        "key": "End date",
        "name": "end"
    }
]}
bind:form={exportSettings}
/>