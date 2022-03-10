import { useState } from 'react';

const usePopup = ({ hideafter }: { hideafter: number }): [boolean, string, boolean, (s: string, ok: boolean) => void, (b: boolean) => void] => {
    const [shown, setShown] = useState<boolean>(false);
    const [ok, setOk] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');
    const [hide, setHide] = useState<NodeJS.Timeout>(null as any);

    const alrt = (msg: string, ok: boolean) => {
        clearTimeout(hide);
        setOk(ok);
        setMessage(msg);
        setShown(true);
        setHide(setTimeout(() => setShown(false), hideafter));
    };

    return [shown, message, ok, alrt, setShown];
};

export default usePopup;
