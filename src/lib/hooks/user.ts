import { useEffect, useState } from 'react';

const useUser = () => {
    const [state, setState] = useState<{ name: string; picture: string; class: string } | null>(null as any);

    useEffect(() => {
        fetch('/api/self', { method: 'GET' }).then(async (reponse) => {
            if (!reponse.ok) {
                setState(null);
                return;
            }

            const data = await reponse.json();

            setState(Object.keys(data).length ? (data as { name: string; picture: string; class: string }) : null);
        });
    }, [setState]);

    return state;
};

export default useUser;
