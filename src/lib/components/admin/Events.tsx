import Link from 'next/link';
import { IEvent } from '../../server/types';
import DatePick from './Datepick';

const Event = (data: { id: string; title: string; guest: string; location: string; color: string; capacity: number; occupied: number }) => {
    return (
        <div
            style={{ borderLeftColor: data.color }}
            className='mt-3 dark:bg-back-highlight p-2 rounded-md border-l-[12px] border border-zinc-200 dark:border-zinc-700 flex justify-between'
        >
            <div>
                <div className='text-lg font-semibold overflow-hidden'>{data.title}</div>
                <div className='text-sm'>
                    {data.guest} &#183; {data.location} &#183;{' '}
                    <span className='text-blue-400 font-bold'>
                        {data.occupied}/{data.capacity}
                    </span>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <Link href={`/admin/events/${data.id}`}>
                    <div className='text-green-500 rounded-sm hover:dark:bg-zinc-700 hover:bg-zinc-200 text-lg py-1 px-3'>
                        <i className='fa-solid fa-file-csv'></i>
                    </div>
                </Link>
                <Link href={`/admin/events/${data.id}`}>
                    <div className='text-indigo-500 rounded-sm hover:dark:bg-zinc-700 hover:bg-zinc-200 text-lg py-1 px-2'>
                        <i className='fa-solid fa-pen'></i>
                    </div>
                </Link>
                <div className='text-red-500 rounded-sm hover:dark:bg-zinc-700 hover:bg-zinc-200 text-lg py-1 px-2.5 fa-solid fa-trash'></div>
            </div>
        </div>
    );
};

const Events = ({
    events,
    selected,
    onUpdate,
}: {
    events: {
        events: IEvent[];
        loading: boolean;
        error?: string;
        date: { start: string; end: string };
    };
    selected: number;
    onUpdate: () => void;
}) => {
    const updateTime = async (date: { start: string; end: string }) => {
        const res = await fetch('/api/admin/events/block/setdate', { method: 'POST', body: JSON.stringify({ ...date, block: selected == 1 }) });
        if (!res.ok) {
            console.log(`[${res.status}] ${res.statusText}`);
            return;
        }
        if (!(await res.json()).ok) {
            console.error('An error occured when setting time');
            return;
        }
        events.date = date;
    };

    if (events.loading) return <div className='h-[80vh] flex justify-center items-center animate-pulse'>Betöltés...</div>;
    return (
        <>
            <DatePick date={events.date} onSubmit={updateTime} />
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
                    <Event key={i} {...x} />
                ))}
            </div>
        </>
    );
};

export default Events;
