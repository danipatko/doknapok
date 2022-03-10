import { useEffect, useState } from 'react';

const useDeadline = (
    deadline: number,
    updateCallback: (s: string, ok: boolean) => void
): [{ date: string; time: string }, (date: string, time: string) => void] => {
    const [state, setState] = useState<{ date: string; time: string }>({ date: '', time: '' });

    useEffect(() => {
        const d = new Date(deadline);
        setState({
            date: d.toISOString().substring(0, 10),
            time: d.toLocaleTimeString(),
        });
    }, [setState, deadline]);

    const setDeadline = async (date: string, time: string) => {
        // TODO: handle firefox
        console.log(new Date(`${date} ${time}`).getTime());

        const res = await fetch('/api/admin/events/block/deadline', {
            method: 'POST',
            body: JSON.stringify({
                deadline: new Date(`${date} ${time}`).getTime(),
            }),
        });
        if (!res.ok) {
            updateCallback(`[${res.status}] ${res.statusText}`, false);
            return;
        }
        setState({ date, time });
        updateCallback('Változtatások elmentve', true);
    };

    return [state, setDeadline];
};

export default useDeadline;
