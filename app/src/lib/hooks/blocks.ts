import { Dispatch, SetStateAction, StatelessComponent, useEffect, useState } from 'react';
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
        ongoing: boolean;
    },
    (id: string) => void,
    (id: string) => void,
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
        ongoing: boolean;
    }>({ ...data, error: '', ongoing: false });

    useEffect(() => {
        // move selected items to the front
        setState((s) => {
            s.events.block1.sort((a, b) => (a.id == s.selected1 ? -1 : b.id == s.selected1 ? 1 : 0));
            s.events.block2.sort((a, b) => (a.id == s.selected2 ? -1 : b.id == s.selected2 ? 1 : 0));
            return { ...s };
        });
    }, [setState]);

    /**
     * Enroll to an event
     */
    const enroll = async (id: string) => {
        setState((s) => {
            return { ...s, error: '', ongoing: true };
        });

        fetch(`/api/enroll`, { method: 'POST', body: JSON.stringify({ block, id }) }).then(async (res) => {
            // http errors
            if (!res.ok) {
                setState((s) => {
                    return { ...s, error: `Váratlan hiba történt (${res.status} - ${res.statusText})`, ongoing: false };
                });
                return;
            }
            // deadline expired
            const { ok, error, occupied } = await res.json();
            setState((s) => {
                if (!ok || occupied === undefined) s.error = error;
                else if (block) {
                    s.selected1 = id;
                    const obj = s.events.block1.find((x) => x.id === id);
                    if (obj) obj.occupied = occupied;
                } else {
                    s.selected2 = id;
                    const obj = s.events.block2.find((x) => x.id === id);
                    if (obj) obj.occupied = occupied;
                }

                return { ...s, ongoing: false };
            });
        });
    };

    /**
     * Enroll to an event
     */
    const unenroll = async (id: string) => {
        setState((s) => {
            return { ...s, error: '', ongoing: true };
        });

        fetch(`/api/unenroll`, { method: 'POST', body: JSON.stringify({ block, id }) }).then(async (res) => {
            // http errors
            if (!res.ok) {
                setState((s) => {
                    return { ...s, error: `Váratlan hiba történt (${res.status} - ${res.statusText})`, ongoing: false };
                });
                return;
            }
            // deadline expired
            const { ok, error, occupied } = await res.json();
            setState((s) => {
                if (!ok || occupied === undefined) s.error = error;
                else if (block) {
                    s.selected1 = '';
                    const obj = s.events.block1.find((x) => x.id === id);
                    if (obj) obj.occupied = occupied;
                } else {
                    s.selected2 = '';
                    const obj = s.events.block2.find((x) => x.id === id);
                    if (obj) obj.occupied = occupied;
                }

                return { ...s, ongoing: false };
            });
        });
    };

    return [state, enroll, unenroll, block, setBlock];
};
