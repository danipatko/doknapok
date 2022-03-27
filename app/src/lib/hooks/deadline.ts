import { useEffect, useState } from 'react';

const useDeadline = (
    date: string,
    time: string,
    alrt: (s: string, ok: boolean) => void
): [{ date: string; time: string }, (date: string, time: string) => void] => {
    const [state, setState] = useState<{ date: string; time: string }>({ date: '', time: '' });

    useEffect(() => {
        setState({ date, time });
    }, [setState]);

    const setDeadline = async (date: string, time: string) => {
        const res = await fetch('/api/admin/events/block/deadline', {
            method: 'POST',
            body: JSON.stringify({ date, time }),
        });
        if (!res.ok) {
            alrt(`[${res.status}] ${res.statusText}`, false);
            return;
        }
        setState({ date, time });
        alrt('Változtatások elmentve', true);
    };

    return [state, setDeadline];
};

export default useDeadline;
