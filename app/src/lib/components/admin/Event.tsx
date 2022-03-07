import Link from 'next/link';

const Event = ({
    data,
    onDelete,
    onExport,
}: {
    data: { id: string; title: string; guest: string; location: string; color: string; capacity: number; occupied: number };
    onDelete: (id: string) => void;
    onExport: (id: string) => void;
}) => {
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
                <div title='Exportálás CSV fájlként' onClick={() => onExport(data.id)}>
                    <div className='text-green-500 rounded-sm hover:dark:bg-zinc-700 hover:bg-zinc-200 text-lg py-1 px-3'>
                        <i className='fa-solid fa-file-csv'></i>
                    </div>
                </div>
                <Link href={`/admin/events/${data.id}`} passHref>
                    <div title='Szerkesztés' className='text-indigo-500 rounded-sm hover:dark:bg-zinc-700 hover:bg-zinc-200 text-lg py-1 px-2'>
                        <i className='fa-solid fa-pen'></i>
                    </div>
                </Link>
                <div
                    title='Törlés'
                    onClick={() => onDelete(data.id)}
                    className='text-red-500 rounded-sm hover:dark:bg-zinc-700 hover:bg-zinc-200 text-lg py-1 px-2.5 fa-solid fa-trash'
                ></div>
            </div>
        </div>
    );
};

export default Event;
