// layout/navbar for the user's side
import { useState } from 'react';

const Navbar = ({ onDarkmode, userdata }: { onDarkmode: () => void; userdata: { name: string; picture: string; class: string } }) => {
    return (
        <div className='py-2 px-5 dark:bg-back-highlight bg-white border-b border-b-gray-300 dark:border-b-zinc-700 flex justify-between md:justify-around'>
            <div className='text-2xl font-extralight'>Dök napok</div>
            <div onClick={onDarkmode}>
                <i className='fa fa-sun'></i>
            </div>
        </div>
    );
};

const Layout = ({ children, userdata }: { children: any; userdata: { name: string; picture: string; class: string } }) => {
    const [darkmode, setDarkmode] = useState(true);

    return (
        <div className={`${darkmode ? 'dark bg-back text-white' : 'bg-white text-back'} h-screen`}>
            <Navbar onDarkmode={() => setDarkmode((x) => !x)} userdata={userdata} />
            <>{children}</>
        </div>
    );
};

export default Layout;
