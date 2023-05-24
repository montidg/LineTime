<script>
    import Slider from './Slider.svelte';
    import Text from './Text.svelte';

    export let data = [
        {
            "type": "slider",
            "key": "Test",
            "name": "test"
        }
    ];
    export let form = {};

    $: if (data[data.length - 1].name != 'submit') {
        data.push(
            {
                "type": "slider",
                "key": "Submit changes",
                "name": "submit"
            }
        );
    }

    $: if (form.submit === -1) {
        setTimeout(() => form.submit = false, 300);
    }
    
</script>
<style>
    .form {
        display: grid;
        width: min(500px,100vw);
        grid-template-columns: 1fr 1fr;
        justify-content: center;
        align-items: center;
    }

    .form .text {
        margin: 15px;
    }

    .form .input {
        display: flex;
        justify-content: flex-end;
        margin: 15px;
    }
</style>

<div class='form'>
    {#each data as slider}
        <div class='text'>{slider.key}</div>
        <div class='input'>
            {#if slider.type == 'slider'} 
                <Slider bind:form={form[slider.name]}></Slider>
            {:else if slider.type == 'text'}
                <Text bind:form={form[slider.name]}></Text>
            {/if}
        </div>
    {/each}

</div>