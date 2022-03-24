import { ReactElement, useState } from 'react';
import { login } from '../lib/server/env';
import Head from 'next/head';
import Deadline from '../lib/components/shared/Deadline';
import Layout from '../lib/components/home/Layout';
import { settings } from '../lib/server/util';
import { NextPageContext } from 'next';
import { getUser } from '../lib/server/google-api/token';

export async function getServerSideProps(ctx: NextPageContext) {
    if (!(ctx.req && ctx.res)) return;

    // if logged in, redirect to programok
    if (await getUser(ctx.req, ctx.res, 'any'))
        return {
            redirect: {
                destination: '/programok',
                permanent: false,
            },
        };

    return { props: { deadline: settings.preset.deadline } };
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
                    <h1 className='text-xl md:text-2xl'>Kedves Tanuló!</h1>
                    <section className='my-5 md:my-10 text-base md:text-lg'>
                        Ezen az oldalon kell jelentkezz a DÖK napon rendezett előadásokra! Az oldalra úgy tudsz belépni, hogy az alábbi bejelentkezés
                        gombon bejelentkezel az szlg-s email címeddel. A főoldalon fölül látni fogod a két időpontot amikor az előadások meg lesznek
                        tartva.
                    </section>
                    <section className='my-5 md:my-10 text-base md:text-lg'>
                        Az előadásoknál látni fogod, a címét, hogy ki tartja, hol lesz megrendezve, és a maximális férőhelyek közül hány van már
                        betelve. Érdemes nem sokat várni a jelentkezésekkel, hiszen ha egy előadásra minden hely betelt, több diák már nem tud rá
                        jelentkezni. A férőhelyek alatt látni fogsz egy nyilat, arra kattintva megjelenik az előadás leírása is, és a jelentkezés
                        gomb. Kérlek jelentkezz mindkét időpontból egy-egy előadásra. Ha ezel kész vagy, nincs több teendőd.
                    </section>
                    <div className='mt-10 md:mt-15 lg:mt-20 text-center'>
                        <a href={login} className='text-white p-2 bg-fore rounded-md hover:bg-fore-highlight transition-colors'>
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
