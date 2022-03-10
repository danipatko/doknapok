import { useRef, useState } from 'react';
import Overlay from '../shared/Overlay';

const ExportCSV = ({ id, onExit, shown }: { id: string; onExit: () => void; shown: boolean }) => {
    const [separator, setSeparator] = useState<string>(',');
    const input = useRef<HTMLInputElement>(null as any);

    const handleChange = () => {
        var val = input.current.value;
        if (val.length > 1) val = val[1];
        setSeparator(val);
        input.current.value = val;
    };

    return (
        <Overlay onExit={onExit} shown={shown}>
            <div className='bg-white dark:bg-back-highlight p-5 rounded-md dark:border dark:border-zinc-600'>
                <div className='text-xl mb-4'>Exportálás CSV fájlként</div>
                <div className='p-2 flex gap-4 items-center'>
                    <div>Elválasztó karakter:</div>
                    <input
                        onChange={handleChange}
                        ref={input}
                        type='text'
                        className='outline-none p-1 border-b-2 bg-white dark:bg-back-highlight transition-colors border-b-zinc-300 dark:border-b-zinc-600 border-transparent focus:border-green-500 focus:dark:border-green-500'
                        defaultValue={separator}
                    />
                </div>
                <div className='flex justify-evenly mt-5'>
                    <button onClick={onExit} className='bg-fore text-white p-2 rounded-md hover:bg-fore-highlight'>
                        Mégse
                    </button>
                    <a
                        onClick={onExit}
                        href={`/api/admin/events/download?id=${id}&separator=${separator}`}
                        className='bg-green-600 text-white p-2 rounded-md hover:bg-green-500'
                    >
                        Export
                    </a>
                </div>
            </div>
        </Overlay>
    );
};

export default ExportCSV;
