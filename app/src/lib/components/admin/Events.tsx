import Link from 'next/link';
import { useState } from 'react';
import { IEvent } from '../../server/types';
import Overlay from '../shared/Overlay';
import ConfirmRM from './ConfirmRM';
import { TimePicker } from './Datepick';
import Event from './Event';
import ExportCSV from './ExportCSV';

const Events = ({
    events,
    selected,
    onUpdate,
    onRemove,
    alrt,
}: {
    events: {
        events: IEvent[];
        loading: boolean;
        error?: string;
        date: { start: string; end: string };
    };
    selected: number;
    onUpdate: () => void;
    onRemove: (id: string) => void;
    alrt: (s: string, ok: boolean) => void;
}) => {
    const [deleteConfShown, showDeleteConf] = useState<boolean>(false);
    const [removeId, setRemoveId] = useState<string>('');
    const [exportShown, showExport] = useState<boolean>(false);
    const [exportId, setExportId] = useState<string>('');

    const warnRemove = (id: string) => {
        setRemoveId(id);
        showDeleteConf(true);
    };

    const exportContext = (id: string) => {
        setExportId(id);
        showExport(true);
    };

    const hideAndRemove = (id: string) => {
        onRemove(id);
        showDeleteConf(false);
    };

    const updateTime = async (date: { start: string; end: string }) => {
        const res = await fetch('/api/admin/events/block/setdate', { method: 'POST', body: JSON.stringify({ ...date, block: selected == 1 }) });
        if (!res.ok) {
            alrt(`Váratlan hiba történt - [${res.status}] ${res.statusText}`, false);
            return;
        }
        if (!(await res.json()).ok) {
            alrt(`Váratlan hiba történt`, false);
            return;
        }
        events.date = date;
        alrt('Változtatások mentve', true);
    };

    if (events.loading) return <div className='h-[80vh] flex justify-center items-center animate-pulse'>Betöltés...</div>;
    return (
        <>
            <ExportCSV id={exportId} onExit={() => showExport(false)} shown={exportShown} />
            <ConfirmRM id={removeId} onExit={() => showDeleteConf(false)} onRemove={hideAndRemove} shown={deleteConfShown} />
            <TimePicker date={events.date} onSubmit={updateTime} />
            <div className='mt-3 md:mt-7'>
                <div className='text-lg flex border-b-zinc-200 dark:border-b-zinc-700 border-b justify-between p-2'>
                    <div>
                        Programok
                        <span onClick={onUpdate} className='pl-3 select-none text-sm font-semibold text-indigo-400 cursor-pointer'>
                            <i className='hover:animate-spin fa-solid fa-arrows-rotate'></i> Frissítés
                        </span>
                    </div>
                    <Link href='/admin/events/create'>
                        <a className='font-semibold text-indigo-400 hover:underline select-none'>+ Hozzáadás</a>
                    </Link>
                </div>
                {events.events.map((x, i) => (
                    <Event onExport={(id) => exportContext(id)} onDelete={warnRemove} key={i} data={x} />
                ))}
            </div>
        </>
    );
};

export default Events;
