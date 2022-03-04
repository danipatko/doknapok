import Router from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Block from './Block';
import ColorPicker from './ColorPicker';
import Input from './Input';

const EventEditor = ({
    values,
    mode,
    block1,
    block2,
    onRemove,
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
    block1: { start: string; end: string };
    block2: { start: string; end: string };
    onRemove: () => void;
}) => {
    const [selectedBlock, selectBlock] = useState<boolean>(true);
    const setBlock = (b: boolean) => selectBlock(b);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (values === undefined) return;
        for (const key in values) {
            if (key == 'block') selectBlock(values[key]);
            else if (key == 'description') (document.getElementById(key) as HTMLTextAreaElement).innerText = values[key].toString();
            else (document.getElementById(key) as HTMLInputElement)?.setAttribute('value', values[key].toString());
        }
    }, [selectBlock]);

    const submit = async () => {
        setError('');

        const vals: { [key: string]: number | string | boolean } = {
            title: (document.getElementById('title') as HTMLInputElement).value,
            guest: (document.getElementById('guest') as HTMLInputElement).value,
            location: (document.getElementById('location') as HTMLInputElement).value,
            capacity: parseInt((document.getElementById('capacity') as HTMLInputElement).value),
            description: (document.getElementById('description') as HTMLInputElement).value,
            color: (document.getElementById('color') as HTMLInputElement).value,
            block: selectedBlock,
        };

        for (const key in vals) {
            if (vals[key] === undefined || !vals[key].toString().length) {
                setError(`Kérlek töltsd ki a '${key}' mezőt is!`);
                return;
            }
        }

        if (mode == 'edit' && values) vals['id'] = values.id;

        const response = await fetch(`/api/admin/events/${mode}`, { method: 'POST', body: JSON.stringify(vals) });
        if (!response.ok) setError(`Váratlan hiba történt [${response.status}] ${response.statusText}`);
        const { error, ok } = await response.json();

        if (!ok || error) {
            setError(error);
            return;
        }
        Router.push('/admin');
    };

    return (
        <div className='dark:bg-back-highlight border border-zinc-200 dark:border-zinc-700 rounded-lg px-10 py-5 xl:w-[50vw] lg:w-[65vw] w-[98vw] md:w-[80vw]'>
            <h1 className='dark:text-zinc-200 text-2xl px-2 mb-5'>{mode == 'create' ? 'Új program hozzáadása' : 'Program szerkesztése'}</h1>
            <div className='my-5 md:grid md:gap-4 text-lg md:grid-cols-2'>
                <Input className='col-span-2' id='title' type='text' placeholder='Cím' />
                <Input id='guest' type='text' placeholder='Előadó' />
                <Input id='location' type='text' placeholder='Helyszín' />
                <Input id='capacity' type='number' placeholder='Férőhelyek' />
                <ColorPicker value={values?.color} />
                <div className='p-2 col-span-2'>
                    <div className='text-zinc-400 text-sm'>Leírás</div>
                    <textarea
                        id='description'
                        rows={5}
                        className='w-full p-2 outline-none transition-colors dark:bg-back-highlight focus:border-b-fore dark:focus:border-b-fore border-b-2 border-b-zinc-300 dark:border-b-zinc-600'
                    ></textarea>
                </div>
                <div className='p-2'>
                    <div className='text-zinc-400 text-sm mb-1'>Időpont</div>
                    <Block block1={block1} block2={block2} onSelect={setBlock} selected={selectedBlock} />
                </div>
            </div>
            {error?.length ? <div className='p-2 border-l-4 border-l-red-600 text-white text-lg'>{error}</div> : null}
            <div className='flex gap-4 justify-end'>
                <button onClick={onRemove} className='p-2 rounded-md select-none text-white bg-red-500 hover:bg-red-400'>
                    Törlés
                </button>
                <button onClick={submit} className='p-2 rounded-md bg-fore hover:bg-fore-highlight text-white outline-none transition-colors'>
                    {mode == 'create' ? 'Hozzáadás' : 'Mentés'}
                </button>
            </div>
        </div>
    );
};

export default EventEditor;
