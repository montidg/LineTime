<script>
    const colors = [
        'rgb(105,118,115)',
        'rgb(235, 95, 80)',
        'rgb(209, 134, 69)',
        'rgb(150, 160, 102)',
        'rgb(131, 214, 126)',
        'rgb(135, 214, 210)',
        'rgb(87, 134, 235)',
        'rgb(194, 151, 230)',
        'rgb(227, 134, 171)'
    ]

    let hasSpace = (area, space) => {
        let available = area.findIndex(x => {
            return x[0] <= space[0] && x[1] >= space[1]
        });
        return available;
    }
    
    let allocSpace = (event) => {
        let currSpace = event.space;

        let available = spaces.findIndex(x => hasSpace(x, currSpace) != -1);

        if (available == -1) {
            spaces.push([[-Infinity,Infinity]]);
            available = spaces.length - 1;
        }

        let availableSpace = spaces[available];
        let portion = hasSpace(availableSpace, currSpace);
        let oldSpace = availableSpace[portion];

        let pushArr = [];
        if (oldSpace[0] != currSpace[0]) pushArr.push([oldSpace[0],currSpace[0]]);
        if (oldSpace[1] != currSpace[1]) pushArr.push([currSpace[1],oldSpace[1]]);

        spaces[available].splice(
            portion,
            1,
            ...pushArr
        );


        return available;
    }

    let spaces = [
    ];

    let outputSpaces;

    export let events = [
        
    ];

    export let w = 1/300000;

    let scale = {
        x: -(new Date()),
        y: 0,
        w: 1/300000,
        h: 30
    };

    $: {
        scale.w = w;

        outputSpaces = outputSpaces.map((event,i) => {
            event.translate = `translate(${event.space[0]*scale.w + scale.x * scale.w},${event.index*scale.h + scale.y*scale.h })`;
            event.index = i;
            return event;
        })
    }
    
    for (let i = 0; i < events.length; i++) {
        events[i].index = allocSpace(events[i]);
        events[i].color = colors[i % colors.length];
    }

    outputSpaces = events.sort((a,b) => a.space[0] - b.space[0]);
</script>

<style>
    text {
        pointer-events: none;
    }
</style>

<!-- todo: clean this up -->
{#each outputSpaces as event}
    <g transform={event.translate}>
        <a href='/wiki/{encodeURIComponent(event.name)}'>
            <rect 
                class='event' 
                width='{Math.max((event.space[1] - event.space[0]) * scale.w,60)}'
                height='{scale.h * 0.9}'
                fill='{event.color}'
                opacity='0.5'
            ></rect>
            <rect 
                class='event' 
                width='{(event.space[1] - event.space[0]) * scale.w}'
                height='{scale.h * 0.9}'
                fill='{event.color}'
            ></rect>
        </a>
    </g>
{/each}

{#each outputSpaces as event}
    <g transform={event.translate}>
        <text x='0' y={scale.h * 0.45} font-size=8 fill='white' stroke='black' stroke-width='0.5' paint-order="stroke" >{event.name}</text>
        <text x='0' y={scale.h * 0.7} font-size=4 fill='black'>
            {(new Date(event.space[0]) + '').split('GMT')[0]}
        </text>
        <text x='0' y={scale.h * 0.85} font-size=4 fill='black'>
            {(new Date(event.space[1]) + '').split('GMT')[0]}
        </text>
    </g>
{/each}