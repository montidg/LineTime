<style>
    .main {
        background: var(--dark-1);
        border-radius: 100%;

        padding: 0;
        margin: 0;
        border: none;
    }

    .img, .main {
        width: 75px;
        height: 75px;
        object-fit: cover;
    }

</style>

<script>
    export let img = '/info.svg';

    let hidden = true;

    let clickFunc = () => {
        hidden = !hidden
    }
</script>

<button class='main' on:click={clickFunc}>
    <img class='img' src={img} alt='Menu button'>
</button>

<div hidden={hidden} class='menu'>
    <slot />
</div>