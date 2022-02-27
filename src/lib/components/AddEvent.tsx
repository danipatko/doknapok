import { useEffect, useRef, useState } from 'react';

const MAX_HEX = 16777215;

const Input = ({
    type,
    placeholder,
    id,
    className,
}: {
    type: 'text' | 'number' | 'password';
    placeholder: string;
    id: string;
    className?: string;
}) => {
    return (
        <div className={`p-2 ${className ?? ''}`}>
            <div className='text-sm text-zinc-400 px-1 '>{placeholder}</div>
            <input
                id={id}
                type={type}
                className='px-2 pb-2 w-full text-white transition-colors focus:border-b-fore outline-none bg-main border-b-2 border-b-main-highlight'
            />
        </div>
    );
};

const Block = ({ selected, onSelect }: { selected: boolean; onSelect: (firstSelected: boolean) => void }) => {
    const select = (first: boolean) => onSelect(first);

    return (
        <div className='border border-fore flex'>
            <div
                onClick={() => select(true)}
                className={`p-1 flex-1 text-center select-none cursor-pointer text-white ${
                    selected ? 'bg-fore hover:bg-fore-highlight' : 'bg-main hover:bg-main-highlight'
                } `}
            >
                9:20 - 11:00
            </div>
            <div
                onClick={() => select(false)}
                className={`p-1 flex-1 text-center select-none cursor-pointer text-white ${
                    selected ? 'bg-main hover:bg-main-highlight' : 'bg-fore hover:bg-fore-highlight'
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

const AddEvent = ({
    values,
    mode,
}: {
    values?: {
        [key: string]: boolean | string | number;
        title: string;
        guest: string;
        location: string;
        capacity: number;
        description: string;
        color: string;
        block: boolean;
        id: string;
    };
    mode: 'create' | 'edit';
}) => {
    const [selectedBlock, selectBlock] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (values === undefined) return;
        for (const key in values) {
            if (key == 'id') continue;
            if (key == 'block') selectBlock(values[key]);
            else if (key == 'description') (document.getElementById(key) as HTMLTextAreaElement).innerText = values[key].toString();
            else (document.getElementById(key) as HTMLInputElement | HTMLTextAreaElement).setAttribute('value', values[key].toString());
        }
    }, [selectBlock]);

    const submit = async () => {
        setError('');

        const values: { [key: string]: number | string | boolean } = {
            title: (document.getElementById('title') as HTMLInputElement).value,
            guest: (document.getElementById('guest') as HTMLInputElement).value,
            location: (document.getElementById('location') as HTMLInputElement).value,
            capacity: parseInt((document.getElementById('capacity') as HTMLInputElement).value),
            description: (document.getElementById('description') as HTMLInputElement).value,
            color: (document.getElementById('color') as HTMLInputElement).value,
            block: selectedBlock,
        };

        for (const key in values) {
            if (values[key] === undefined || !values[key].toString().length) {
                setError(`Kérlek töltsd ki a '${key}' mezőt is!`);
                return;
            }
        }

        const response = await fetch(`/api/admin/events/${mode}`, { method: 'POST', body: JSON.stringify(values) });
        if (!response.ok) setError(`Váratlan hiba történt | [${response.status}] ${response.statusText}`);
        const { error, ok } = await response.json();

        if (!ok || error) setError(error);

        console.log(error);
        console.log(ok);
    };

    const setBlock = (b: boolean) => selectBlock(b);

    return (
        <div className='dark:bg-main rounded-lg px-10 py-5 w-[50vw]'>
            <h1 className='dark:text-zinc-200 text-3xl text-center mb-10'>{mode == 'create' ? 'Új program hozzáadása' : 'Program szerkesztése'}</h1>
            <div className='my-5 grid gap-4 grid-cols-2 text-lg'>
                <Input className='col-span-2' id='title' type='text' placeholder='Cím' />
                <Input id='guest' type='text' placeholder='Előadó' />
                <Input id='location' type='text' placeholder='Helyszín' />
                <Input id='capacity' type='number' placeholder='Férőhelyek' />
                <ColorPicker />
                <div className='p-2 col-span-2'>
                    <div className='text-zinc-400 text-sm'>Leírás</div>
                    <textarea
                        id='description'
                        rows={5}
                        className='w-full text-white p-2 outline-none transition-colors bg-main focus:border-b-fore border-b-2 border-b-main-highlight'
                    ></textarea>
                </div>
                <div className='p-2'>
                    <div className='text-zinc-400 text-sm mb-1'>Időpont</div>
                    <Block onSelect={setBlock} selected={selectedBlock} />
                </div>
            </div>
            {error.length ? <div className='p-2 border-l-4 border-l-red-600 text-white text-lg'>{error}</div> : null}
            <div className='text-right'>
                <button onClick={submit} className='p-2 rounded-md bg-fore hover:bg-fore-highlight text-white outline-none transition-colors'>
                    {mode == 'create' ? 'Hozzáadás' : 'Mentés'}
                </button>
            </div>
        </div>
    );
};

export default AddEvent;
