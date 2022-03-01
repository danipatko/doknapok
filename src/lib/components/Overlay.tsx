import { useEffect } from 'react';

const Overlay = ({ children, shown, onExit }: { children: any; shown: boolean; onExit: () => void }) => {
    useEffect(() => {
        const c = document.getElementById('overlay');
        if (!c) return;

        c.onclick = (e) => {
            if (c === (e.target as HTMLDivElement)) onExit();
        };
    }, []);

    return (
        <div
            id='overlay'
            className={`${shown ? '' : 'hidden'} z-50 fixed top-0 left-0 w-screen h-full bg-back bg-opacity-40 flex justify-center items-center`}
        >
            {children}
        </div>
    );
};

export default Overlay;
