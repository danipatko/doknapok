import { ReactElement } from 'react';
import { CLIENT_ID } from '../lib/server/env';
import Head from 'next/head';
import Deadline from '../lib/components/shared/Deadline';
import Layout from '../lib/components/home/Layout';

const redirect = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.email%20https%3A//www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&response_type=code&redirect_uri=http%3A//localhost%3A3000/api/auth/redirect&client_id=${CLIENT_ID}`;

const Home = () => {
    return (
        <>
            <Head>
                <title>Dök napok</title>
            </Head>
            <Deadline time={Date.now()} />
            <div className='mt-2.5 md:mt-5 lg:mt-10 flex justify-center items-center'>
                <div className='md:w-[80vw] lg:w-[70vw] xl:w-[50vw] p-5 md:p-0'>
                    <h1 className='text-xl md:text-2xl'>Hogyan jelentkezek?</h1>
                    <section className='my-5 md:my-10 text-base md:text-lg'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel alias, soluta optio vero obcaecati sequi illo voluptates in
                        libero accusamus delectus numquam ullam rerum! Laudantium consectetur nesciunt iste tempora neque.
                    </section>
                    <section className='my-5 md:my-10 text-base md:text-lg'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel alias, soluta optio vero obcaecati sequi illo voluptates in
                        libero accusamus delectus numquam ullam rerum! Laudantium consectetur nesciunt iste tempora neque.
                    </section>
                    <div className='mt-10 md:mt-15 lg:mt-20 text-center'>
                        <a href={redirect} className='text-white p-2 bg-indigo-500 rounded-md hover:bg-indigo-400 transition-colors'>
                            Bejelentkezés
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

// this sets the default layout to the user one
Home.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>;
};

export default Home;
