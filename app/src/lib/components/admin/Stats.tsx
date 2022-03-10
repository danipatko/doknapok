import { useEffect, useRef, useState } from 'react';

const lerp = (a: number, b: number, t: number): number => {
    return a + t * (b - a);
};

const Stats = ({ dates: _dates, doneCount, userCount }: { dates: number[]; doneCount: number; userCount: number }) => {
    const canvas = useRef<HTMLCanvasElement>(null as any);
    const [width, setWidth] = useState<number>(0);

    const resize = () => {
        setWidth(
            window.innerWidth * (window.innerWidth > 768 ? (window.innerWidth > 1024 ? (window.innerWidth > 1280 ? 0.6 : 0.8) : 0.9) : 0.98) - 40
        );
    };

    const dates = useRef<number[]>(_dates);

    // render once
    useEffect(() => {
        const render = () => {
            const W = canvas.current.width - 4; // padding
            const H = canvas.current.height;

            // get scale multiplier
            const scaleX = W / (dates.current[dates.current.length - 1] - dates.current[0]);
            const scaleY = H / (dates.current.length - 1);

            const ctx = canvas.current.getContext('2d');
            if (!ctx) return;

            // fill background
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.current.width, H);
            ctx.fillStyle = '#000';

            if (dates.current.length < 3) {
                const txt = 'Nincs elég adat grafikon megjelenítéséhez';
                ctx.font = '100 20px Arial';
                ctx.fillText(txt, W / 2 - ctx.measureText(txt).width / 2, H / 2);
                return;
            }

            dates.current = dates.current.sort();

            // purple line
            ctx.strokeStyle = '#000';
            ctx.font = '100 12px Arial';

            let d = new Date();
            let text = '';
            const len = 5;
            for (let i = 1; i < len; i++) {
                d = new Date(lerp(dates.current[0], dates.current[dates.current.length - 1], i / len));
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
            for (let i = 0; i < dates.current.length; i++) {
                ctx.beginPath();
                // starting point
                ctx.moveTo(p.x, p.y);
                p = { x: Math.floor((dates.current[i] - dates.current[0]) * scaleX), y: H - i * scaleY };
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
                ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
            }
        };

        resize();
        render();
        window.onresize = resize;
    });

    return (
        <div className='p-5 dark:bg-back-highlight rounded-lg border border-zinc-300 dark:border-zinc-700'>
            <h1 className='text-2xl mb-5'>Eddigi jelentkezések</h1>
            <div className='mb-5 flex justify-between items-center'>
                <div className='p-2'>Jelentkezett: {doneCount}</div>
                <div className='p-2 grow'>
                    <div className='bg-zinc-400'>
                        <div style={{ width: `${(doneCount / userCount) * 100}%` }} className='h-2 bg-fore'></div>
                    </div>
                </div>
                <div className='p-2'>Regisztrált: {userCount}</div>
            </div>

            <div className='overflow-x-hidden'>
                <canvas width={`${width}px`} height='400px' ref={canvas}></canvas>
            </div>
        </div>
    );
};

export default Stats;
