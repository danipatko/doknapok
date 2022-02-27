import { useRef, useState } from 'react';

const Input = ({ type, placeholder }: { type: 'text' | 'number' | 'password'; placeholder: string }) => {
    return (
        <div className='p-2'>
            <div className='text-sm text-zinc-400 px-1 '>{placeholder}</div>
            <input
                type={type}
                className='px-2 pb-2 w-full text-white transition-colors focus:border-b-fore outline-none bg-main border-b-2 border-b-main-highlight'
            />
        </div>
    );
};

const Block = ({ onSelect }: { onSelect: (firstSelected: boolean) => void }) => {
    const [firstSelected, setFirstSelected] = useState<boolean>(true);

    const select = (first: boolean) => {
        setFirstSelected(first);
        onSelect(first);
    };

    return (
        <div className='border border-fore flex'>
            <div
                onClick={() => select(true)}
                className={`p-1 flex-1 text-center select-none cursor-pointer text-white ${
                    firstSelected ? 'bg-fore hover:bg-fore-highlight' : 'bg-main hover:bg-main-highlight'
                } `}
            >
                9:20 - 11:00
            </div>
            <div
                onClick={() => select(false)}
                className={`p-1 flex-1 text-center select-none cursor-pointer text-white ${
                    firstSelected ? 'bg-main hover:bg-main-highlight' : 'bg-fore hover:bg-fore-highlight'
                } `}
            >
                12:00 - 14:00
            </div>
        </div>
    );
};

const ColorPicker = () => {
    const input = useRef<HTMLInputElement>(null as any);
    const colorRef = useRef<HTMLDivElement>(null as any);

    const handleChange = () => {
        const s = input.current.value;
        if (s.match(/^\#[\dabcdef]{3,6}/gm)) {
            colorRef.current.style.backgroundColor = s;
            console.log('ok');
        }
    };

    const randomColor = () => {
        colorRef.current.style.backgroundColor = '#fff';
    };

    return (
        <div className='p-2'>
            <div className='text-sm text-zinc-400 px-1 '>Szín</div>
            <div className='flex'>
                <div ref={colorRef} className='px-5 border border-main-highlight mr-2'></div>
                <input
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

const AddEvent = () => {
    return (
        <div className='dark:bg-main rounded-lg px-10 py-5 w-[50vw]'>
            <h1 className='dark:text-zinc-200 text-3xl text-center mb-10'>Új program hozzáadása</h1>
            <Input type='text' placeholder='Cím' />
            <div className='my-5 grid gap-4 grid-cols-2 text-lg'>
                <Input type='text' placeholder='Előadó' />
                <Input type='text' placeholder='Helyszín' />
                <Input type='number' placeholder='Férőhelyek' />
                <ColorPicker />

                <div className='p-2 col-span-2'>
                    <div className='text-zinc-400 text-sm'>Leírás</div>
                    <textarea
                        rows={5}
                        className='w-full text-white p-2 outline-none bg-main focus:border-b-fore border-b-2 border-b-main-highlight'
                    ></textarea>
                </div>
                <div className='p-2'>
                    <div className='text-zinc-400 text-sm mb-1'>Időpont</div>
                    <Block onSelect={() => {}} />
                </div>
            </div>
            <div className='text-right'>
                <button className='p-2 rounded-md bg-fore hover:bg-fore-highlight text-white outline-none transition-colors'>Hozzáadás</button>
            </div>
        </div>
    );
};

export default AddEvent;
