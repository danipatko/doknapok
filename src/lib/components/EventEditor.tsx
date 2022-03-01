import { useEffect, useRef, useState } from 'react';
import Block from './options/Block';
import ColorPicker from './options/ColorPicker';
import Input from './options/Input';
import Overlay from './Overlay';

const EventEditor = ({
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
    const setBlock = (b: boolean) => selectBlock(b);
    const [editorShown, showEditor] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    /* useEffect(() => {
        if (values === undefined) return;
        for (const key in values) {
            if (key == 'block') selectBlock(values[key]);
            else if (key == 'description') (document.getElementById(key) as HTMLTextAreaElement).innerText = values[key].toString();
            else (document.getElementById(key) as HTMLInputElement)?.setAttribute('value', values[key].toString());
        }
    }, [selectBlock]);*/

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
        if (!response.ok) setError(`Váratlan hiba történt [${response.status}] ${response.statusText}`);
        const { error, ok } = await response.json();

        if (!ok || error) setError(error);
    };

    return (
        <div>
            <button onClick={() => showEditor(true)}>Edit</button>
            <Overlay onExit={() => showEditor(false)} shown={editorShown}>
                <div className='dark:bg-main rounded-lg px-10 py-5 xl:w-[50vw] lg:w-[65vw] w-[98vw] md:w-[80vw]'>
                    <h1 className='dark:text-zinc-200 text-3xl text-center mb-10'>
                        {mode == 'create' ? 'Új program hozzáadása' : 'Program szerkesztése'}
                    </h1>
                    <div className='my-5 md:grid md:gap-4 text-lg md:grid-cols-2'>
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
            </Overlay>
        </div>
    );
};

export default EventEditor;
