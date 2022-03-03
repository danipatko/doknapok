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
}: {
    events: {
        events: IEvent[];
        loading: boolean;
        error?: string;
    };
}) => {
    if (events.loading) return <div className='h-[80vh] flex justify-center items-center animate-pulse'>Loading...</div>;
    return (
        <>
            <DatePick date={new Date()} onSubmit={() => {}} />
            <div className='mt-3 md:mt-7'>
                <div className='text-lg flex border-b-zinc-200 dark:border-b-zinc-700 border-b justify-between p-2'>
                    <div>Programok</div>
                    <Link href='/admin/events/new'>
                        <a className='font-semibold text-indigo-400'>+ Hozzáadás</a>
                    </Link>
                </div>
                <Event
                    id='heheehha'
                    color='#23679f'
                    guest='John Doe'
                    location='I. 34'
                    title='An interesting title here'
                    capacity={40}
                    occupied={13}
                />
                <Event
                    id='heheehha'
                    color='#67239f'
                    guest='John Doe'
                    location='I. 34'
                    title='An interesting title here'
                    capacity={40}
                    occupied={13}
                />
                <Event
                    id='heheehha'
                    color='#23967f'
                    guest='John Doe'
                    location='I. 34'
                    title='An interesting title here'
                    capacity={40}
                    occupied={13}
                />
            </div>
        </>
    );
};

export default Events;
