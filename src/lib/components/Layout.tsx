import Countdown from './Countdown';
import Head from 'next/head';
import useUser from '../hooks/user';

const Layout = (props: any) => {
    const user = useUser();

    return (
        <div className='dark'>
            <Head>
                <title>Dök napok</title>
                <meta name='dokdays' content='heheheha' />
                <link rel='icon' href='/favicon.ico' />
                <link href='/fontawesome/css/all.css' rel='stylesheet'></link>
            </Head>
            <div className='w-full flex justify-around py-2 border-b border-fore'>
                <div className='navItem'>SZLG DÖK napok</div>
                <Countdown />
                <div className='navItem'>john.doe.69f@szlgbp.hu</div>
            </div>
            <div className='bg-vscgrey'>{props.children}</div>
        </div>
    );
};

export default Layout;
