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
        <div className='flex flex-crow border rounded-lg' style={{ minWidth: 280, borderColor: props.szin }}>
            <div
                className='w-1/4 rounded-l-lg'
                style={{
                    backgroundColor: props.szin,
                    color: parseInt('ffffff', 16) / 2 > parseInt(props.szin.slice(1), 16) ? 'rgb(228 228 231)' : 'rgb(0,0,0)',
                }}
            >            
            </div>
            <div className='flex flex-col'>
                <div className='flex px-4 text-2xl font-bold justify-center text-center items-center'>
                        {props.cim}
                </div>
                <div className=' px-4 text-base font-medium'>{props.eloado}</div>
                <div className=' font-medium px-4'>Helyszín: {props.helyszin}</div>
                <div className=' border-t flex flex-row w-full justify-between'>
                    <div className='font-medium p-3'>
                        Férőhelyek: {props.jelentkezok}/{props.ferohelyek}
                    </div>                
                </div>
            </div>
        </div>
    );
};

export default Event;
