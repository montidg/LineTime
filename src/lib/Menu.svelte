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

    .menu {
        position: absolute;
        padding: 5px;
        background: var(--light-2);
        border: var(--dark-2) solid 5px;
        z-index: -1;
    }

    .menu.right {
        right: 0;
    }

</style>

<script>
    export let img = '/info.svg';
    export let position = 'right';

    let hidden = true;

    let clickFunc = () => {
        hidden = !hidden
    }
</script>

<button class='main' on:click={clickFunc} style='cursor: pointer;'>
    <img class='img' src={img} alt='Menu button'>
</button>

<div hidden={hidden} class='menu {position}'>
    <slot />
</div>