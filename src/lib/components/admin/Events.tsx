import { useEffect, useState } from 'react';
import { IEvent } from '../../server/types';

const Events = ({
    events,
}: {
    events: {
        events: IEvent[];
        loading: boolean;
        error?: string;
    };
}) => {
    if (events.loading) return <div>Loading...</div>;
    return <div className=''>{JSON.stringify(events)}</div>;
};

export default Events;
