import Head from 'next/head';
import React, { ReactElement, useState } from 'react';
import Deadline from '../lib/components/shared/Deadline';
import Layout from '../lib/components/user/Layout';
import Event from '../lib/components/Event';
import Navitem from '../lib/components/shared/Navitem';
import { settings } from '../lib/server/util';
import { NextPageContext } from 'next';

// TODO: import server-side rendering to use server time, fetch user data and programmes

export async function getServerSideProps(context: NextPageContext) {
    return { props: { deadline: settings.preset.deadline } };
}

const Programok = ({ deadline }: { deadline: number }) => {
    const [selected, select] = useState<number>(0);

    return (
        <>
            <Head>
                <title>Programok - Dök napok</title>
            </Head>
            <Deadline time={deadline} />
            <div className='mt-2.5 md:mt-5 lg:mt-10 flex justify-center items-center'>
                <div className='md:w-[80vw] lg:w-[70vw] xl:w-[50vw] p-5 md:p-0'>
                    <nav className='flex'>
                        <Navitem onClick={() => select(0)} selected={selected} index={0}>
                            Első blokk
                        </Navitem>
                        <Navitem onClick={() => select(1)} selected={selected} index={1}>
                            Második blokk
                        </Navitem>
                    </nav>
                    <div>
                        {selected == 0 ? (
                            <>
                                <Event
                                    cim='Ez egy kicsit hosszabb cím'
                                    helyszin='1.34'
                                    ferohelyek={16}
                                    jelentkezok={12}
                                    eloado='John Doe'
                                    leiras='Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores adipisci veritatis magni tempora accusantium sequi libero molestiae culpa inventore, deserunt eveniet non exercitationem molestias labore quaerat nesciunt eum pariatur beatae?'
                                    szin='#e8fc03'
                                />
                                <Event szin='#fc2c03' />
                                <Event szin='#229912' />
                                <Event szin='#063d35' />
                                <Event szin='#fc2c03' />
                                <Event szin='#229912' />
                                <Event szin='#063d35' />
                                <Event szin='#0a8da1' />
                                <Event szin='#0a8da1' />
                                <Event szin='#092794' />
                                <Event szin='#4c2f8f' />
                                <Event szin='#b721cf' />
                                <Event szin='#0a8da1' />
                                <Event szin='#092794' />
                                <Event szin='#4c2f8f' />
                                <Event szin='#b721cf' />
                                <Event szin='#0a8da1' />
                                <Event szin='#092794' />
                                <Event szin='#4c2f8f' />
                                <Event szin='#b721cf' />
                            </>
                        ) : (
                            <>
                                <Event szin='#0a8da1' />
                                <Event szin='#fc2c03' />
                                <Event szin='#229912' />
                                <Event szin='#063d35' />
                                <Event szin='#fc2c03' />
                                <Event szin='#229912' />
                                <Event szin='#063d35' />
                                <Event szin='#0a8da1' />
                                <Event szin='#0a8da1' />
                                <Event szin='#092794' />
                                <Event szin='#4c2f8f' />
                                <Event szin='#b721cf' />
                                <Event szin='#0a8da1' />
                                <Event szin='#092794' />
                                <Event szin='#4c2f8f' />
                                <Event szin='#b721cf' />
                                <Event szin='#0a8da1' />
                                <Event szin='#092794' />
                                <Event szin='#4c2f8f' />
                                <Event szin='#b721cf' />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

// this sets the default layout to the user one
Programok.getLayout = (page: ReactElement) => {
    return <Layout userdata={{ class: '10F', name: 'Patkó Dániel', picture: '' }}>{page}</Layout>;
};

// <Block onSelect={(first) => setBlock(first)} />

export default Programok;
