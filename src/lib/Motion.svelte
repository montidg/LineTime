<script>
    let w = 1/3000000;
    export let events = [];

    import Tree from '$lib/Tree.svelte';
    import Menu from '$lib/Menu.svelte';
    import AddMenu from '$lib/AddMenu.svelte';

    let area;
    let pos = [];
    let mpos = [0,0];
    let keys = [];
    let vel = [0,0];
    let translate = '';
    let width = 0;
    let height = 0;
    let center = [0,0];
    let lastPos = [0,0];
    let isMouse = false;
    let zoom = 3;

    function down(e) {
        if (e.target.nodeName == 'TEXTAREA') return;
        keys[e.key.toLowerCase()] = true;
    };

    function up(e) {
        if (e.target.nodeName == 'TEXTAREA') return;
        keys[e.key.toLowerCase()] = false;
    };
    
    function mouseMove(e) {
        lastPos = [e.clientX,e.clientY];
        if (!isMouse) return;
        mpos[0] += e.clientX - center[0];
        mpos[1] += e.clientY - center[1];
        center = lastPos;
    }

    function mouseUp(e) {
        isMouse = false;
    }

    function mouseDown(e) {
        isMouse = true;
        center = [e.clientX,e.clientY];
    }

    function wheel(e) {
        mpos[0] -= lastPos[0] - (width/2);
        mpos[1] -= lastPos[1] - (height/2);

        mpos[0] *= (1.005 ** -e.deltaY)
        mpos[1] *= (1.005 ** -e.deltaY)

        mpos[0] += lastPos[0] - (width/2);
        mpos[1] += lastPos[1] - (height/2);

        zoom *= (1.005 ** -e.deltaY)
    }

    function move() {
        var isShift = keys['q'];
        vel[0] += ((keys['a'] ? 1 : 0) - (keys['d'] ? 1 : 0)) * (isShift ? 5 : 1);
        vel[1] += ((keys['w'] ? 1 : 0) - (keys['s'] ? 1 : 0)) * (isShift ? 5 : 1);

        vel[0] *= 0.9;
        vel[1] *= 0.9;

        mpos[0] += vel[0];
        mpos[1] += vel[1];

        let ratio = ((keys['r'] ? 2 : 1) * (keys['f'] ? 0.5 : 1)) ** (isShift ? 0.3 : 0.1);
        w *= ratio;
        mpos[0] *= ratio;

        translate = `translate(${mpos[0] + (width/2)},${mpos[1] + (height/2)})`;
    }

    setInterval(move,10);
    
</script>

<svelte:window 
    on:keydown={down} 
    on:keyup={up} 
    on:wheel={wheel} 
    on:mousemove={mouseMove} 
    on:mousedown={mouseDown} 
    on:mouseup={mouseUp} 
/>

<style>
    #area-main {
        width: 100vw;
        overflow-y: visible;
        overflow-x: visible;
        height: 1000px;
        position: relative;
    }

    #ui-wrap {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        width: calc(100vw - 20px);
        margin-left: 10px;
        padding-top: 10px;

        position: relative;

        z-index: 10;
    }

    #ui-right {
        text-align: right;
    }
</style>

<div id='ui-wrap'>
    <div>
        <Menu img='/info.svg' position=''>
            <p>This experiment aims to document every event to have ever happened ever, regardless of significance.</p>
            <p>Anyone can add a contribution to the timeline automatically with the Plus button.</p>
            <p>Spam, blatant advertising, and questionable content will be removed.</p>
            <p>WASD or mouse to pan timeline, Q to speed up, and R/F/mouse wheel to zoom.</p>
        </Menu>
    </div>

    <div id='ui-right'>
        <Menu img='/add.svg'>
            <AddMenu />
        </Menu>
    </div>
</div> 

<div bind:clientWidth={width} bind:clientHeight={height}>
    <svg id='area-main' bind:this={area}>
        <g transform="{translate}, scale({zoom},{zoom})">
            <Tree events={events} w={w} />
        </g>
    </svg>
</div>
