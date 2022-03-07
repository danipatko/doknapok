import { useEffect, useRef } from 'react';

const Overlay = ({ children, shown, onExit }: { children: any; shown: boolean; onExit: () => void }) => {
    const ov = useRef<HTMLDivElement>(null as any);

    useEffect(() => {
        ov.current.onclick = (e) => {
            if (ov.current === (e.target as HTMLDivElement)) onExit();
        };
    }, [onExit]);

    return (
        <div
            ref={ov}
            className={`${shown ? '' : 'hidden'} z-50 fixed top-0 left-0 w-screen h-full bg-back bg-opacity-75 flex justify-center items-center`}
        >
            {children}
        </div>
    );
};

export default Overlay;
