import { useEffect, useState } from 'react';

interface EventProps {
    title?: string;
    location?: string;
    capacity?: number;
    occupied?: number;
    guest?: string;
    description?: string;
    color: string;
    id: string;
}

const Event = (props: EventProps) => {
    const [showHide, setShowHide] = useState(false);
    const [apply, setApply] = useState(false);

    return (
        <div className='mt-5 border border-l-[12px] rounded-md flex justify-between p-2 relative' style={{ minWidth: 350, borderColor: props.color }}>
            <div className='w-full'>
                <div className='text-xl font-bold'>{props.title}</div>
                <div className='flex flex-row justify-start gap-4 font-medium pt-2'>
                    <div>Előadó: {props.guest}</div>
                    <div>Helyszín: {props.location}</div>
                    <span className='text-blue-400 font-bold'>
                        {props.occupied}/{props.capacity}
                    </span>
                </div>
                {showHide ? (
                    <div className='flex flex-col items-center justify-center'>
                        <div className='py-2 w-full'>{props.description}</div>
                        {apply ? (
                            <button className='p-2 border border-fore rounded-md bg-fore text-black font-medium'>Jelentkezve</button>
                        ) : (
                            <button
                                className='p-2 border border-fore rounded-md bg-fore text-black font-medium'
                                onClick={() => {
                                    setApply(true);
                                }}
                            >
                                Jelentkezés
                            </button>
                        )}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
            {showHide ? (
                <i
                    className='text-blue-400 fa-solid fa-arrow-up absolute bottom-0 right-0 p-2'
                    onClick={() => {
                        setShowHide(!showHide);
                    }}
                ></i>
            ) : (
                <i
                    className='text-blue-400 fa-solid fa-arrow-down absolute bottom-0 right-0 p-2'
                    onClick={() => {
                        setShowHide(!showHide);
                    }}
                ></i>
            )}
        </div>
    );
};

export default Event;
