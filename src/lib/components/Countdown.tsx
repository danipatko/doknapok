import { useState } from 'react';

const Countdown = () => {
    const [remaining, setRemaining] = useState('');

    const end = new Date('April 12 ,2022 23:59:59').getTime();

    let timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = end - now;

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

    return (
        <div>
            {remaining == 'LEJÁRT!' ? (
                <div className='navItem animate-pulse'>Jelentkezési határidő: {remaining}</div>
            ) : (
                <div className='navItem'>{remaining}</div>
            )}
        </div>
    );
};

export default Countdown;
