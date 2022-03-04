import { useEffect, useRef, useState } from 'react';

let events: number[] = [
    new Date('2022-03-12 9:30').getTime(),
    new Date('2022-03-12 11:10').getTime(),
    new Date('2022-03-12 15:30').getTime(),
    new Date('2022-03-12 23:00').getTime(),
    new Date('2022-03-13 18:45').getTime(),
    new Date('2022-03-13 19:35').getTime(),
    new Date('2022-03-13 20:45').getTime(),
    new Date('2022-03-13 21:25').getTime(),
    new Date('2022-03-13 22:15').getTime(),
];

const lerp = (a: number, b: number, t: number): number => {
    return a + t * (b - a);
};

const Stats = ({}: {}) => {
    const canvas = useRef<HTMLCanvasElement>(null as any);
    const [width, setWidth] = useState<number>(0);

    const render = () => {
        events = events.sort();
        const W = canvas.current.width - 4; // padding
        const H = canvas.current.height;

        // get scale multiplier
        const scaleX = W / (events[events.length - 1] - events[0]);
        const scaleY = H / (events.length - 1);

        const ctx = canvas.current.getContext('2d');
        if (!ctx) return;
        // fill background
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.current.width, H);

        // purple line
        ctx.strokeStyle = '#000';
        ctx.font = '100 12px Arial';

        let d = new Date();
        let text = '';
        const len = 5;
        for (let i = 1; i < len; i++) {
            d = new Date(lerp(events[0], events[events.length - 1], i / len));
            ctx.fillStyle = '#e2e2e2';
            ctx.fillRect(i * (W / len), 0, 2, H);
            ctx.fillStyle = '#111111';
            text = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
            ctx.fillText(text, i * (W / len) - ctx.measureText(text).width / 2, H - 10);
        }

        ctx.strokeStyle = '#6c43de';
        ctx.fillStyle = '#6c43de';
        ctx.lineWidth = 2;

        let p = { x: 0, y: 0 };
        // create lines
        for (let i = 0; i < events.length; i++) {
            ctx.beginPath();
            // starting point
            ctx.moveTo(p.x, p.y);
            p = { x: Math.floor((events[i] - events[0]) * scaleX), y: H - i * scaleY };
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
            ctx.fillRect(p.x, p.y, 4, 4);
        }
    };

    const resize = () => {
        setWidth(window.innerWidth * (window.innerWidth > 768 ? (window.innerWidth > 1024 ? (window.innerWidth > 1280 ? 0.6 : 0.8) : 0.9) : 0.98));
    };

    // render once
    useEffect(() => {
        resize();
        render();
        window.onresize = resize;
    }, [render]);

    return (
        <div className='p-5 dark:bg-back-highlight rounded-lg border border-zinc-300 dark:border-zinc-700'>
            <h1 className='text-2xl mb-5'>Eddigi jelentkezések</h1>
            <div className='p-2'></div>

            <div className='overflow-x-hidden'>
                <canvas width={`${width}px`} height='400px' ref={canvas}></canvas>
            </div>
        </div>
    );
};

export default Stats;
