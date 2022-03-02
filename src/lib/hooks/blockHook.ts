import { useState } from 'react';
import { IEvent } from '../server/types';

// Custom hook for events
export const useEvents = (
    block: boolean
): [
    {
        events: IEvent[];
        loading: boolean;
        error?: string;
    },
    () => void,
    () => void
] => {
    const [opened, setOpened] = useState<boolean>(false);
    const [state, setState] = useState<{
        events: IEvent[];
        loading: boolean;
        error?: string;
    }>({
        events: [],
        loading: true,
        error: '',
    });

    /**
     * Use this function to fetch only once
     */
    const open = () => {
        if (opened) return;
        setOpened(true);
        update();
    };

    /**
     * Fetch the block events and data from the server
     */
    const update = () => {
        console.log('FETCH CALLED');
        fetch(`/api/admin/events/block/${block ? 0 : 1}`).then(async (res) => {
            if (!res.ok) {
                setState({ events: [], loading: false, error: `[${res.status}] ${res.statusText}` });
                return;
            }
            setState({ events: await res.json(), loading: false, error: '' });
        });
    };

    return [state, open, update];
};
