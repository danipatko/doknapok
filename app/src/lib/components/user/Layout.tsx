// layout/navbar for the user's side
import { useState } from 'react';
import Usercard from './Usercard';
import Image from 'next/image';

const Navbar = ({ onDarkmode, userData }: { onDarkmode: () => void; userData: { name: string; picture: string; class: string } }) => {
    return (
        <div className='py-1 md:py-2 px-2 md:px-5 dark:bg-back-highlight bg-white border-b border-b-gray-300 dark:border-b-zinc-700 flex justify-between md:justify-around items-center'>
            <div className='flex gap-1 md:gap-4 items-center'>
                <Image src='/logo.png' width='28px' height='28px' />
                <div className='text-base md:text-2xl font-extralight'>Dök napok</div>
                <div onClick={onDarkmode} className='py-1 px-2 rounded-full text-lg hover:bg-zinc-200 hover:dark:bg-zinc-700'>
                    <i className='fa fa-moon'></i>
                </div>
            </div>
            <Usercard {...userData} />
        </div>
    );
};

const Layout = ({ children, userData }: { children: any; userData: { name: string; picture: string; class: string } }) => {
    const [darkmode, setDarkmode] = useState(true);

    return (
        <div className={`${darkmode ? 'dark bg-back text-white' : 'bg-white text-back'} min-h-screen`}>
            <Navbar onDarkmode={() => setDarkmode((x) => !x)} userData={userData} />
            <>{children}</>
        </div>
    );
};

export default Layout;
