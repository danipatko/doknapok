// layout/navbar for the admins side
// should contain user data
import { useState } from 'react';
import Image from 'next/image';

const Navbar = ({ onDarkmode }: { onDarkmode: () => void }) => {
    return (
        <div className='py-2 px-5 dark:bg-back-highlight bg-white border-b border-b-gray-300 dark:border-b-zinc-700 flex justify-between md:justify-around items-center'>
            <div className='flex gap-4 items-center'>
                <Image src='/logo.png' width='28px' height='28px' />
                <div className='text-base md:text-2xl font-extralight'>Admin - Dök napok</div>
                <div onClick={onDarkmode} className='py-1 px-2 rounded-full text-lg hover:bg-zinc-200 hover:dark:bg-zinc-700'>
                    <i title='Sötét mód ki- és bekapcsolása' className='fa fa-moon'></i>
                </div>
            </div>
        </div>
    );
};

const Layout = (props: any) => {
    const [darkmode, setDarkmode] = useState(true);

    return (
        <div className={`${darkmode ? 'dark bg-back text-white' : 'bg-white text-back'} min-h-screen h-full`}>
            <Navbar onDarkmode={() => setDarkmode((x) => !x)} />
            <>{props.children}</>
        </div>
    );
};

export default Layout;
