import { IEvent } from '../../server/types';

const Event = ({
    data,
    extended,
    onClick,
    selected,
    onEnroll,
    onCancel,
    loadstate,
}: {
    data: IEvent;
    extended: boolean;
    selected: string;
    onClick: () => void;
    onEnroll: (id: string) => void;
    onCancel: () => void;
    loadstate: boolean;
}) => {
    return (
        <div
            onClick={onClick}
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
            className='mt-3 hover:dark:border-zinc-500 hover:bg-zinc-200 dark:bg-back-highlight p-2 rounded-md border-l-[12px] border border-zinc-200 dark:border-zinc-700'
        >
            {!extended ? (
                <>
                    <div className='flex justify-between'>
                        <div>
                            <div className='text-lg font-semibold overflow-hidden'>{data.title}</div>
                            <div>
                                {data.guest} &#183; {data.location}
                            </div>
                        </div>
                        <div className='flex items-center text-blue-500 font-bold'>
                            {data.occupied}/{data.capacity}
                        </div>
                    </div>
                    <div className='text-right'>
                        <i className='fa-solid fa-angle-down'></i>
                    </div>
                </>
            ) : (
                <>
                    <div className='text-lg font-semibold overflow-hidden'>{data.title}</div>
                    <div className='py-2.5  text-base'>{data.description}</div>
                    <div className='flex justify-between'>
                        <div className='py-2 text-sm sm:text-base'>
                            <div>
                                <span className='text-zinc-400 dark:text-zinc-500'>Előadó:</span> {data.guest}
                            </div>
                            <div>
                                <span className='text-zinc-400 dark:text-zinc-500'>Helyszín:</span> {data.location}
                            </div>
                            <div className=''>
                                <span className='text-zinc-400 dark:text-zinc-500'>Szabad helyek:</span>{' '}
                                <span className='text-blue-500 font-bold'>
                                    {data.occupied}/{data.capacity}
                                </span>
                            </div>
                        </div>
                        <div className='flex items-end p-1'>
                            <button
                                style={loadstate ? { opacity: '50%' } : {}}
                                onClick={() => (selected === data.id ? onCancel() : onEnroll(data.id))}
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
