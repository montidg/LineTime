<script>
    export let img = false;
    export let name = 'Placeholder';
    export let url = '#';
    export let background = '/favicon.svg';
    export let date = 'Released';
</script>

<style>
    .project {
        border-radius: 15px;
        width: 64vmin;
        height: 36vmin;
        display: flex;
        flex-direction: column;
        box-shadow: 0 0px 5px 3px rgba(0,0,0,0.2);
        overflow: hidden;
        margin: 10px;

        background-color: white;

        background-size: cover, cover; 
        background-position: center, center;

        font-size: 2.5vmin;
    }

    .hs {
        width: 50%;
    }

    .hs:last-child {
        text-align: right;
    }

    h2 {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0;
    }

    h2 a {
        text-decoration: none;
        color: var(--dark-1);
    }

    img {
        height: 30px;
        width: 30px;

        margin: 5px;

        border-radius: 100%;
    }

    .menu {
        background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.5));
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        padding: 10px;
        color: white;
        display: none;
    }

    .project:hover .menu {
        display: block;
    }
</style>

<div class='project' style='background-image: url({background}); '>
    <div class='menu'>
        <h2>
            <div class='hs'>
                {#if img}
                    <img src={img} alt='{name} Icon'>
                {/if}
                <a href={url}>{name}</a>
            </div>
            <div class='hs'>{date}</div>
        </h2>
        <slot />
    </div>
 
</div>
