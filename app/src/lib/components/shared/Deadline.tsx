import { useEffect, useState } from 'react';

const getDiff = (diff: number): JSX.Element => {
    if (diff < 0) return <>A jelentkezés véget ért</>;
    const conv = new Date(diff);
    return (
        <>
            A jelentkezésből{' '}
            <b>
                {conv.getUTCDate()} nap {conv.getUTCHours()} óra és {conv.getUTCMinutes()} perc{' '}
            </b>{' '}
            van hátra
        </>
    );
};

// custom hook to update the remainder of the deadline every minute
const useDeadline = (deadline: Date): JSX.Element => {
    const [state, setState] = useState<JSX.Element>(null as any);

    useEffect(() => {
        setState(getDiff(deadline.getTime() - Date.now()));
        setInterval(() => {
            setState(getDiff(deadline.getTime() - Date.now()));
        }, 60_000);
    }, [setState]);

    return state;
};

const Deadline = ({ time }: { time: number }) => {
    const deadline = useDeadline(new Date(time));
    return <div className='p-2 text-center w-full bg-fore text-white text-sm md:text-base'>{deadline}</div>;
};

export default Deadline;
