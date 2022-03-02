import Head from 'next/head';
import { ReactElement } from 'react';
import Deadline from '../lib/components/shared/Deadline';
import Layout from '../lib/components/user/Layout';

// TODO: import server-side rendering to use server time, fetch user data and programmes

const Programok = () => {
    return (
        <>
            <Head>
                <title>Dök napok</title>
            </Head>
            <Deadline time={Date.now()} />
            <div className='mt-2.5 md:mt-5 lg:mt-10 flex justify-center items-center'>
                <div className='md:w-[80vw] lg:w-[70vw] xl:w-[50vw] p-5 md:p-0'>
                    <h1 className='text-xl md:text-2xl'>Heheheha</h1>
                </div>
            </div>
        </>
    );
};

// this sets the default layout to the user one
Programok.getLayout = (page: ReactElement) => {
    return <Layout userdata={{ class: '10F', name: 'Patkó Dániel', picture: '' }}>{page}</Layout>;
};

export default Programok;
