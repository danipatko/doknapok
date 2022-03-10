import { useEffect, useState } from 'react';

const useDeadline = (
    deadline: number,
    alrt: (s: string, ok: boolean) => void
): [{ date: string; time: string }, (date: string, time: string) => void] => {
    const [state, setState] = useState<{ date: string; time: string }>({ date: '', time: '' });

    useEffect(() => {
        const d = new Date(deadline);
        setState({
            date: d.toISOString().substring(0, 10),
            time: d.toISOString().substring(11, 16), // fix for firefox
        });
    }, [setState, deadline]);

    const setDeadline = async (date: string, time: string) => {
        const res = await fetch('/api/admin/events/block/deadline', {
            method: 'POST',
            body: JSON.stringify({
                deadline: new Date(`${date} ${time}`).getTime(),
            }),
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
