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
    return (
        <div className='flex basis-1/5 h-72 flex-col border border-zinc-200 rounded-lg' style={{ minWidth: 280 }}>
            <div
                className='h-1/3 rounded-t-lg'
                style={{
                    backgroundColor: props.szin,
                    color: parseInt('ffffff', 16) / 2 > parseInt(props.szin.slice(1), 16) ? 'rgb(228 228 231)' : 'rgb(0,0,0)',
                }}
            >
                <div className='h-2/4 px-4 text-2xl font-bold'>
                    <p className='relative top-1/2 -translate-y-1/2'>{props.cim}</p>
                </div>
                <div className='h-1/4 px-4 text-base font-medium'>{props.eloado}</div>
                <div className='h-1/4 font-medium px-4'>Helyszín: {props.helyszin}</div>
            </div>
            <div className='h-1/2 p-3'>
                <p>{props.leiras}</p>
            </div>
            <div className='h-1/6 border-t flex flex-row w-full justify-between'>
                <div className='font-medium p-3'>
                    Férőhelyek: {props.jelentkezok}/{props.ferohelyek}
                </div>
                <div className='p-3'>Továbbiak...</div>
            </div>
        </div>
    );
};

export default Event;
