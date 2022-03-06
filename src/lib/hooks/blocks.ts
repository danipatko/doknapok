import { Dispatch, SetStateAction, StatelessComponent, useState } from 'react';
import { IEvent } from '../server/types';

// Custom hook for events
export const useEvents = (data: {
    events: {
        block1: IEvent[];
        block2: IEvent[];
    };
    block1: { start: string; end: string };
    block2: { start: string; end: string };
    selected1: string;
    selected2: string;
}): [
    {
        events: {
            block1: IEvent[];
            block2: IEvent[];
        };
        block1: { start: string; end: string };
        block2: { start: string; end: string };
        selected1: string;
        selected2: string;
        error: string;
    },
    (id: string) => void,
    () => void,
    boolean,
    Dispatch<SetStateAction<boolean>>
] => {
    const [block, setBlock] = useState<boolean>(true);
    const [state, setState] = useState<{
        events: {
            block1: IEvent[];
            block2: IEvent[];
        };
        block1: { start: string; end: string };
        block2: { start: string; end: string };
        selected1: string;
        selected2: string;
        error: string;
    }>({ ...data, error: '' });

    /**
     * Enroll to an event
     */
    const enroll = async (id: string) => {
        setState((s) => {
            return { ...s, error: '' };
        });

        fetch(`/api/enroll`, { method: 'POST', body: JSON.stringify({ block, id }) }).then(async (res) => {
            // http errors
            if (!res.ok) {
                setState((s) => {
                    return { ...s, error: `Váratlan hiba történt (${res.status} - ${res.statusText})` };
                });
                return;
            }
            // deadline expired
            const { ok, error } = await res.json();
            if (!ok || error) {
                setState((s) => {
                    return { ...s, error };
                });
            }
        });
    };

    /**
     * Enroll to an event
     */
    const unenroll = async () => {
        setState((s) => {
            return { ...s, error: '' };
        });

        fetch(`/api/unenroll`, { method: 'POST', body: JSON.stringify({ block }) }).then(async (res) => {
            // http errors
            if (!res.ok) {
                setState((s) => {
                    return { ...s, error: `Váratlan hiba történt (${res.status} - ${res.statusText})` };
                });
                return;
            }
            // deadline expired
            const { ok, error } = await res.json();
            if (!ok || error) {
                setState((s) => {
                    return { ...s, error };
                });
            }
        });
    };

    return [state, enroll, unenroll, block, setBlock];
};
