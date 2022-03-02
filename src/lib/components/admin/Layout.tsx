// layout/navbar for the admins side
// should contain user data
import { useState } from 'react';

const Navbar = ({ onDarkmode }: { onDarkmode: () => void }) => {
    return (
        <div className='py-2 px-5 dark:bg-back-highlight bg-white border-b border-b-gray-300 dark:border-b-zinc-700 flex justify-between md:justify-around'>
            <div className='text-2xl font-extralight'>
                <i className='fa fa-shield-check'></i> Admin - Dök napok
            </div>
            <div onClick={onDarkmode}>
                <i className='fa fa-sun'></i>
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
