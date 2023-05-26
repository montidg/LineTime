<script>
    import Motion from '$lib/Motion.svelte';

    /** @type {import('./$types').PageData} */    
    export let data;
    
    let events = data.res.map(x => x = {
        name: x.name,
        space: [x.start * 1, x.end * 1]
    });
</script>

<style>
    .wrapper {
    }
</style>

<div class='wrapper'> 
    <Motion events={events} />
</div>
