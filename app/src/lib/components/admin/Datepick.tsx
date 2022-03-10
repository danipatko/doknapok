import { useEffect, useState } from 'react';

export const TimePicker = ({
    date,
    onSubmit,
}: {
    date: { start: string; end: string };
    onSubmit: (date: { start: string; end: string }) => void;
}) => {
    useEffect(() => {
        (document.getElementById('from') as HTMLInputElement).value = date.start;
        (document.getElementById('to') as HTMLInputElement).value = date.end;
    });

    const submit = () => {
        onSubmit({
            start: (document.getElementById('from') as HTMLInputElement).value,
            end: (document.getElementById('to') as HTMLInputElement).value,
        });
    };

    return (
        <div className='md:flex md:justify-evenly p-3 border border-zinc-200 rounded-md dark:border-zinc-700 dark:bg-back-highlight'>
            <div className='mb-3 md:m-0 md:p-2 text-lg font-semibold'>Időpont</div>
            <div className='my-3 md:m-0 flex gap-4 '>
                <input
                    id='from'
                    className='outline-none border-2 focus:border-fore rounded-sm p-2 dark:text-black'
                    type='time'
                    defaultValue={date.start}
                />
                <input
                    id='to'
                    className='outline-none border-2 focus:border-fore rounded-sm p-2 dark:text-black'
                    type='time'
                    defaultValue={date.end}
                />
            </div>
            <div className='mt-3 md:m-0 align-middle flex items-center'>
                <button onClick={submit} className='p-2 font-semibold text-white outline-none bg-fore hover:bg-fore transition-colors rounded-md'>
                    Mentés
                </button>
            </div>
        </div>
    );
};

export const DatePicker = ({ date, time, onSubmit }: { date: string; time: string; onSubmit: (date: string, time: string) => void }) => {
    useEffect(() => {
        console.log(time);
    });

    const submit = async () => {
        onSubmit((document.getElementById('date') as HTMLInputElement).value, (document.getElementById('time') as HTMLInputElement).value);
    };

    return (
        <div className='mb-5 md:flex md:justify-evenly p-3 border border-zinc-200 rounded-md dark:border-zinc-700 dark:bg-back-highlight'>
            <div className='mb-3 md:m-0 md:p-2 text-lg font-semibold'>Határidő</div>
            <div className='my-3 md:m-0 flex gap-4 '>
                <input defaultValue={date} id='date' className='outline-none border-2 focus:border-fore rounded-sm p-2 dark:text-black' type='date' />
                <input defaultValue={time} id='time' className='outline-none border-2 focus:border-fore rounded-sm p-2 dark:text-black' type='time' />
            </div>
            <div className='mt-3 md:m-0 align-middle flex items-center'>
                <button
                    onClick={submit}
                    className='p-2 font-semibold text-white outline-none bg-fore-highlight hover:bg-fore transition-colors rounded-md'
                >
                    Mentés
                </button>
            </div>
        </div>
    );
};
