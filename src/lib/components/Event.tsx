import { useEffect, useState } from 'react';

interface EventProps {
    blokk?: number;
    cim?: string;
    helyszin?: string;
    ferohelyek?: number;
    jelentkezok?: number;
    eloado?: string;
    leiras?: string;
    szin: string;
}

const Event = (props: EventProps) => {
    const [showHide, setShowHide] = useState(false);
    const [apply, setApply] = useState(false);

    return (
        <div className='mt-5 border border-l-[12px] rounded-md flex justify-between p-2 relative' style={{ minWidth: 350, borderColor: props.szin }}>
            <div>
                <div className='text-xl font-bold'>{props.cim}</div>
                <div className='flex flex-row justify-start gap-4 font-medium pt-2'>
                    <div>Előadó: {props.eloado}</div>
                    <div>Helyszín: {props.helyszin}</div>
                    <span className='text-blue-400 font-bold'>
                        {props.jelentkezok}/{props.ferohelyek}
                    </span>
                </div>
                {showHide ? (
                    <div className='flex flex-col items-center justify-center'>
                        <div className='py-2'>{props.leiras}</div>
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
