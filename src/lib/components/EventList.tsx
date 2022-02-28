import { IEvent } from '../server/types';
import Event from './Event';

const events: IEvent[] = [
    {
        title: 'Tutel',
        block: 1,
        capacity: 69,
        color: '696969',
        description: 'Lorem ipsum dolor shit amet',
        guest: 'John DOe',
        location: 'I. 34',
        occupied: 2,
    },
];

const EventList = (/* { events }: { events: IEvent[] }*/) => {
    return (
        <div className='md:grid md:grid-flow-row md:gap-4'>
            {events.map((x) => (
                <Event data={x} />
            ))}
        </div>
    );
};

export default EventList;
