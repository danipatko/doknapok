import { useEffect, useState } from 'react';

const useUser = () => {
    const [state, setState] = useState<{ name: string; picture: string; class: string; admin: boolean } | null>(null);

    useEffect(() => {
        fetch('/api/self', { method: 'GET' }).then(async (reponse) => {
            if (!reponse.ok) return;
            const data = await reponse.json();
            if (Object.keys(data).length) setState(data as { name: string; picture: string; class: string; admin: boolean });
        });
    }, [setState]);

    return state;
};

export default useUser;
