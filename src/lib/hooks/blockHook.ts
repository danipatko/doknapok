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
        date: { start: string; end: string };
    },
    () => void,
    () => void,
    (id: string) => void
] => {
    const [opened, setOpened] = useState<boolean>(false);
    const [state, setState] = useState<{
        events: IEvent[];
        loading: boolean;
        error?: string;
        date: { start: string; end: string };
    }>({
        events: [],
        loading: true,
        error: '',
        date: { start: '', end: '' },
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
        setState((s) => {
            return { ...s, loading: true };
        });

        fetch(`/api/admin/events/block/${block ? 0 : 1}`).then(async (res) => {
            if (!res.ok) {
                setState({ events: [], loading: false, error: `[${res.status}] ${res.statusText}`, date: { end: '', start: '' } });
                return;
            }
            setState({ ...((await res.json()) as { events: IEvent[]; date: { start: string; end: string } }), loading: false, error: '' });
        });
    };

    const remove = async (id: string): Promise<void> => {
        const res = await fetch(`/api/admin/events/remove`, { method: 'POST', body: JSON.stringify({ id }) });
        if (!res.ok) {
            console.log(`[${res.status}] ${res.statusText}`);
            return;
        }
        // remove from frontend
        setState((s) => {
            s.events = s.events.filter((x) => x.id != id);
            return { ...s };
        });
    };

    return [state, open, update, remove];
};
