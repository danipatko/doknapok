import { useState } from 'react';
import { IEvent } from '../../server/types';

const Event = ({
    data,
    selected,
    onEnroll,
    onCancel,
    loadstate,
}: {
    data: IEvent;
    selected: string;
    onEnroll: (id: string) => void;
    onCancel: (id: string) => void;
    loadstate: boolean;
}) => {
    const [extended, setExtended] = useState<boolean>(false);

    const onClick = () => {
        if (selected === data.id) onCancel(data.id);
        else onEnroll(data.id);
    };

    const onExtend = () => {
        setExtended((x) => !x);
    };

    return (
        <div
            onClick={onExtend}
            style={
                selected === data.id
                    ? {
                          borderColor: '#00ff00',
                          boxShadow: '0px 0px 10px 0px rgba(0,255,0,1)',
                          MozBoxShadow: '0px 0px 10px 0px rgba(0,255,0,1)',
                          WebkitBoxShadow: '0px 0px 10px 0px rgba(0,255,0,1)',
                      }
                    : { borderLeftColor: data.color }
            }
            className='mt-3 select-none hover:dark:border-zinc-500 border-l-[12px] hover:bg-zinc-200 dark:bg-back-highlight p-2 rounded-md border border-zinc-200 dark:border-zinc-700'
        >
            {!extended ? (
                <>
                    <div className='flex justify-between'>
                        <div>
                            <div className='text-base md:text-lg font-semibold overflow-hidden'>{data.title}</div>
                            <div className='text-sm'>
                                {data.guest} &#183; {data.location}
                            </div>
                        </div>
                        <div className='flex items-center text-blue-500 font-bold'>
                            {data.occupied}/{data.capacity}
                        </div>
                    </div>
                    <div className='flex flex-1 justify-between pt-2 items-center'>
                        <div className='text-sm italic text-zinc-400 dark:text-zinc-500'>{selected === data.id ? 'Kiválasztva' : null}</div>
                        <div className='fa-solid fa-angle-down'></div>
                    </div>
                </>
            ) : (
                <>
                    <div className='text-base md:text-lg font-semibold overflow-hidden'>{data.title}</div>
                    <div className='py-2.5 text-sm md:text-base break-words'>{data.description}</div>
                    <div className='flex justify-between'>
                        <div className='py-2 text-sm sm:text-base'>
                            <div>
                                <span className='text-zinc-400'>Előadó:</span> {data.guest}
                            </div>
                            <div>
                                <span className='text-zinc-400'>Helyszín:</span> {data.location}
                            </div>
                            <div className=''>
                                <span className='text-zinc-400'>Szabad helyek:</span>{' '}
                                <span className='text-blue-500 font-bold'>
                                    {data.occupied}/{data.capacity}
                                </span>
                            </div>
                            {selected === data.id ? <div className='text-zinc-400 italic'>Kiválasztva</div> : null}
                        </div>
                        <div className='flex items-end p-1'>
                            <button
                                style={loadstate ? { opacity: '50%' } : {}}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClick();
                                }}
                                className={`rounded-md p-2 font-semibold text-white ${
                                    selected === data.id ? 'bg-red-500 hover:bg-red-400' : 'bg-green-500 hover:bg-green-400'
                                }`}
                            >
                                {loadstate ? <span className='fa-solid fa-circle-notch animate-spin'></span> : null}{' '}
                                {selected === data.id ? 'Lemondás' : 'Jelentkezés'}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Event;
