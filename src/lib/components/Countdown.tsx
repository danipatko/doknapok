import { useState } from 'react';

const Countdown = () => {
    const [remaining, setRemaining] = useState('');

    const end = new Date('April 12,2022 23:59:59');

    let timer = setInterval(() => {
        const now = new Date();
        const distance = end.getTime() - now.getTime();

        if (distance <= 0) {
            clearInterval(timer);
            setRemaining('LEJÁRT!');
            return;
        }

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setRemaining(`Jelentkezési határidő: ${days} nap ${hours} óra ${minutes} perc ${seconds} mp`);
    }, 1000);

    return <div className='navItem'>{remaining};</div>;
};

export default Countdown;
