import { useRef } from 'react';

const MAX_HEX = 16777215;

const ColorPicker = () => {
    const input = useRef<HTMLInputElement>(null as any);
    const colorRef = useRef<HTMLDivElement>(null as any);

    const handleChange = () => {
        const s = input.current.value;
        if (s.match(/^\#[\dabcdef]{3,6}/gm)) colorRef.current.style.backgroundColor = s;
    };

    const randomColor = () => {
        const newColor = `#${Math.floor(Math.random() * MAX_HEX).toString(16)}`;
        input.current.setAttribute('value', newColor);
        colorRef.current.style.backgroundColor = newColor;
    };

    return (
        <div className='p-2'>
            <div className='text-sm text-zinc-400 px-1 '>Szín</div>
            <div className='flex'>
                <div ref={colorRef} className='px-5 border border-main-highlight mr-2'></div>
                <input
                    id='color'
                    onChange={handleChange}
                    ref={input}
                    type='text'
                    className='px-2 pb-2 w-full text-white transition-colors focus:border-b-fore outline-none bg-main border-b-2 border-b-main-highlight'
                />
                <div onClick={randomColor} className='ml-2 p-2 text-white hover:text-fore-highlight' title='Random szín'>
                    <i className='fa fa-dice'></i>
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;
