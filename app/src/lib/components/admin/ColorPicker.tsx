import { useEffect, useRef } from 'react';

const MAX_HEX = 16777215;

const ColorPicker = ({ value }: { value?: string }) => {
    const input = useRef<HTMLInputElement>(null as any);
    const colorRef = useRef<HTMLDivElement>(null as any);

    const handleChange = () => {
        const s = input.current.value;
        if (s.match(/^\#[\dabcdef]{3,6}/gm)) colorRef.current.style.backgroundColor = s;
    };

    const randomColor = () => {
        const newColor = `#${Math.floor(Math.random() * MAX_HEX)
            .toString(16)
            .toUpperCase()}`;
        input.current.setAttribute('value', newColor);
        colorRef.current.style.backgroundColor = newColor;
    };

    return (
        <div className='p-2'>
            <div className='text-sm text-zinc-400 px-1 '>Szín</div>
            <div className='flex'>
                <div ref={colorRef} style={{ backgroundColor: value }} className='p-5 border dark:border-zinc-600 border-zinc-300 mr-2'></div>
                <input
                    id='color'
                    onChange={handleChange}
                    ref={input}
                    type='text'
                    className='px-2 pb-2 w-full transition-colors focus:border-b-fore focus:dark:border-b-fore outline-none dark:bg-back-highlight border-b-2 dark:border-zinc-600 border-zinc-300'
                />
                <div onClick={randomColor} className='ml-2 p-2 hover:text-fore-highlight' title='Random szín'>
                    <i className='fa fa-dice'></i>
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;
