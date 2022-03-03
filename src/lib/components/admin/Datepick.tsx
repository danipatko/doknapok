const DatePick = ({ date, onSubmit }: { date: Date; onSubmit: (date: string) => void }) => {
    return (
        <div className='md:flex md:justify-evenly p-3 border border-zinc-200 rounded-md dark:border-zinc-700 dark:bg-back-highlight'>
            <div className='mb-3 md:m-0 md:p-2 text-lg font-semibold'>Időpont</div>
            <div className='my-3 md:m-0 flex gap-4 '>
                <input
                    className='outline-none border-2 focus:border-indigo-400 rounded-sm p-2 dark:text-black'
                    type='date'
                    defaultValue={date.toISOString().slice(0, 10)}
                />
                <input
                    className='outline-none border-2 focus:border-indigo-400 rounded-sm p-2 dark:text-black'
                    type='time'
                    defaultValue={date.toISOString().slice(11, 16)}
                />
            </div>
            <div className='mt-3 md:m-0 align-middle flex items-center'>
                <button className='p-2 font-semibold text-white outline-none bg-indigo-500 hover:bg-indigo-400 transition-colors rounded-md'>
                    Mentés
                </button>
            </div>
        </div>
    );
};

export default DatePick;
