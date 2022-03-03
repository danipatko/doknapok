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
                <div className='text-green-500 rounded-sm hover:dark:bg-zinc-700 hover:bg-zinc-200 text-lg py-1 px-3'>
                    <Link href={`/admin/events/${data.id}`}>
                        <i className=' fa-solid fa-file-csv'></i>
                    </Link>
                </div>
                <div className='text-indigo-500 rounded-sm hover:dark:bg-zinc-700 hover:bg-zinc-200 text-lg py-1 px-2 fa-solid fa-pen'></div>
                <div className='text-red-500 rounded-sm hover:dark:bg-zinc-700 hover:bg-zinc-200 text-lg py-1 px-2.5 fa-solid fa-trash'></div>
            </div>
        </div>
    );
};

const Events = ({
    events,
    onUpdate,
}: {
    events: {
        events: IEvent[];
        loading: boolean;
        error?: string;
        date: { start: string; end: string };
    };
    onUpdate: () => void;
}) => {
    if (events.loading) return <div className='h-[80vh] flex justify-center items-center animate-pulse'>Betöltés...</div>;
    return (
        <>
            <DatePick date={events.date} onSubmit={() => {}} />
            <div className='mt-3 md:mt-7'>
                <div className='text-lg flex border-b-zinc-200 dark:border-b-zinc-700 border-b justify-between p-2'>
                    <div>
                        Programok
                        <span onClick={onUpdate} className='pl-3 text-sm font-semibold text-indigo-400 cursor-pointer'>
                            <i className='hover:animate-spin fa-solid fa-arrows-rotate'></i> Frissítés
                        </span>
                    </div>
                    <Link href='/admin/events/create'>
                        <a className='font-semibold text-indigo-400 hover:underline'>+ Hozzáadás</a>
                    </Link>
                </div>
                {JSON.stringify(events)}
                {events.events.map((x) => (
                    <Event {...x} />
                ))}
            </div>
        </>
    );
};

export default Events;
