// layout/navbar for the user's side
import { useState } from 'react';

const Navbar = ({ onDarkmode }: { onDarkmode: () => void }) => {
    return (
        <div className='py-2 px-5 dark:bg-back-highlight bg-white border-b border-b-gray-300 dark:border-b-zinc-700 flex justify-between md:justify-around items-center'>
            <div className='flex gap-4 items-center'>
                <div className='text-base md:text-lg font-semibold'>Dök napok</div>
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
        <div className={`${darkmode ? 'dark bg-back text-white' : 'bg-white text-back'} h-screen`}>
            <Navbar onDarkmode={() => setDarkmode((x) => !x)} />
            <>{props.children}</>
        </div>
    );
};

export default Layout;

//
