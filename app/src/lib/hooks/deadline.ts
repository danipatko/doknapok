import { useEffect, useState } from 'react';

const useDeadline = (deadline: number): [{ date: string; time: string }, (date: string, time: string) => void] => {
    const [state, setState] = useState<{ date: string; time: string }>({ date: '', time: '' });

    useEffect(() => {
        const d = new Date(deadline);
        setState({
            date: d.toISOString().substring(0, 10),
            time: d.toLocaleTimeString(),
        });
    }, [setState]);

    const setDeadline = async (date: string, time: string) => {
        const res = await fetch('/api/admin/events/block/deadline', {
            method: 'POST',
            body: JSON.stringify({
                deadline: new Date(`${date} ${time}`).getTime(),
            }),
        });
        if (!res.ok) {
            alert(`[${res.status}] ${res.statusText}`);
            return;
        }
        setState({ date, time });
    };

    return [state, setDeadline];
};

export default useDeadline;
