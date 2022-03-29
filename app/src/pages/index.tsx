import { ReactElement, useState } from 'react';
import { login } from '../lib/server/env';
import Head from 'next/head';
import Deadline from '../lib/components/shared/Deadline';
import Layout from '../lib/components/home/Layout';
import { Settings } from '../lib/server/util';
import { NextPageContext } from 'next';
import { getUser } from '../lib/server/google-api/token';
import Link from 'next/link';

export async function getServerSideProps(ctx: NextPageContext) {
    if (!(ctx.req && ctx.res)) return;

    // if logged in, redirect to programok
    if (Object.keys(ctx.query).length == 0 && (await getUser(ctx.req, ctx.res, 'any')))
        return {
            redirect: {
                destination: '/programok',
                permanent: false,
            },
        };

    return { props: { deadline: Settings.getInstance().getDeadline() } };
}

const Home = ({ deadline }: { deadline: number }) => {
    return (
        <>
            <Head>
                <title>Dök napok</title>
            </Head>
            <Deadline time={deadline} />
            <div className='mt-2.5 md:mt-5 lg:mt-10 flex justify-center items-center'>
                <div className='md:w-[80vw] lg:w-[70vw] xl:w-[50vw] p-5 md:p-0'>
                    <h1 className='text-xl md:text-2xl'>Kedves Diákok!</h1>
                    <section className='my-5 md:my-10 text-base md:text-lg'>
                        Április 13-án, a DÖK napon tanítás nélküli munkanap lesz. 2 blokkban kötelezően választható előadások lesznek, amikre itt
                        tudsz jelentkezni. A bejelentkezés gombra kattintva az szlgbp.hu-s email címeddel tudsz belépni. A főoldalon fölül látni fogod
                        a két idősávot, mindkettőben egy-egy foglalkozást (lehet előadás vagy workshop) kell választanod. A eseményeknél feltűntettük
                        a címet, az előadó nevét, a helyszínt és azt, hogy hány hely foglalt a maximális férőhelyek közül. Érdemes mihamarabb
                        választani, hiszen ha egy előadásra minden hely betelt, az már nem választható. Az előadás részletesebb leírása is egy
                        kattintással elérhető. Kérünk, jelentkezz mindkét blokkból egy-egy foglalkozásra. Ha ezzel kész vagy, nincs több teendőd.
                        Utólagos módosításra is van lehetőség, amíg az adott program még nem teltházas, vagy véget nem ér a regisztráció, azaz április
                        11-én 22:00-ig.
                    </section>
                    <div className='mt-10 md:mt-15 lg:mt-20 text-center'>
                        <Link href='/programok'>
                            <a className='text-white p-2 bg-fore rounded-md hover:bg-fore-highlight transition-colors'>Belépés</a>
                        </Link>
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
