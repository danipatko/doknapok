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
            <div>{user ? `Logged in as ${user.name} | ${user.admin ? 'ADMIN' : ''} | ${user.class}` : 'Not logged in'}</div>
            <div>{props.children}</div>
        </div>
    );
};

export default Layout;
