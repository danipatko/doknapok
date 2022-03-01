import { IEvent } from '../server/types';
import { isWhite } from '../server/util';

const Event = ({ data }: { data: IEvent }) => {
    return (
        <div>
            <div style={{ background: data.color, color: isWhite(data.color) ? '#fff' : '#000' }} className={`rounded-t-md px-5 pt-5'`}>
                <div className='text-xl p-2'>{data.title}</div>
                <div className='p-2'>{data.guest}</div>
            </div>
            <div className='rounded-b-md px-2 pb-2 border-b border-zinc-500'>
                <div className='p-2 text-sm'>{data.description.substring(0, 100)}</div>
                <div className='p-2'></div>
            </div>
        </div>
    );
};

export default Event;
