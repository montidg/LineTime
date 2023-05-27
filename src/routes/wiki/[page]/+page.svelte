<style>
    :global(body) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .wrapper {
        width: min(100vw,500px);
    }
</style>

<script>
    /** @type {import('./$types').PageData} */    
    export let data = {};

    let name = data.res.name;

    let start = new Date(data.res.start * 1);
    let end = new Date(data.res.end * 1);
    let desc = data.res.desc;
    let categories = data.res.categories;
</script>


<div class='wrapper'>
    <h1><a href='/'>LineTime Wiki</a></h1>
    {#if name}
        <h1>{name}</h1>
        <p>
            {desc}
        </p>
        <h2>Metadata</h2>
        <p> 
            <i>Categories: {categories}</i>
        </p>
        <p>
            <i>Start: {start}</i>
        </p>
        <p>
            <i>End: {end}</i>
        </p>
    {:else}
        <h1>Data not found</h1>
    {/if}
</div>