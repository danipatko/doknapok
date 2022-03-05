// layout/navbar for the user's side
import { NextPageContext } from 'next';
import { useState } from 'react';
import { getUser } from '../../server/google-api/token';
import { redirectToRoot } from '../../server/types';
import Image from 'next/image';

const Navbar = ({
    onDarkmode,
    userdata,
}: {
    onDarkmode: () => void;
    userdata: { email: string; name: string; picture: string; class: string; block1: string; block2: string };
}) => {
    return (
        <div className='py-2 px-5 dark:bg-back-highlight bg-white border-b border-b-gray-300 dark:border-b-zinc-700 flex justify-between gap-4 relative items-center md:justify-between'>
            <div className='flex flex-wrap gap-2 justify-center items-center cursor-pointer' onClick={onDarkmode}>
                <img src='/logo.png' style={{ maxWidth: 30, maxHeight: 30 }} />
                <div className='text-2xl font-extralight'>Dök napok</div>
            </div>
            <div className='flex justify-center items-center gap-2'>
                <div className='hidden md:block'>{userdata.name}</div>
                <div className='hidden md:block'>{userdata.class}</div>
                <Image src={userdata.picture} width='30px' height='30px' className='rounded-full' />
            </div>
        </div>
    );
};

const Layout = ({
    children,
    userdata,
}: {
    children: any;
    userdata: { email: string; name: string; picture: string; class: string; block1: string; block2: string };
}) => {
    const [darkmode, setDarkmode] = useState(true);

    return (
        <div className={`${darkmode ? 'dark bg-back text-white' : 'bg-white text-back'} min-h-screen`}>
            <Navbar onDarkmode={() => setDarkmode((x) => !x)} userdata={userdata} />
            <>{children}</>
        </div>
    );
};

export default Layout;
