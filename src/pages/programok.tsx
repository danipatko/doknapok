import Head from 'next/head';
import React, { ReactElement, useState } from 'react';
import Deadline from '../lib/components/shared/Deadline';
import Layout from '../lib/components/user/Layout';
import Event from '../lib/components/Event';
import Block from '../lib/components/Block';
import Navitem from '../lib/components/shared/Navitem';
import { settings } from '../lib/server/util';
import { NextPageContext } from 'next';
import { redirectToRoot } from '../lib/server/types';
import { getUser } from '../lib/server/google-api/token';
import { EntityData } from 'redis-om';
import { NextApiRequest, NextApiResponse } from 'next';
import { withEvent } from '../lib/server/database/redis';

// TODO: import server-side rendering to use server time, fetch user data and programmes

export async function getServerSideProps(ctx: NextPageContext) {
    if (!(ctx.req && ctx.res)) return redirectToRoot;

    const user = await getUser(ctx.req, ctx.res, 'user');

    if (!user) return redirectToRoot;

    return {
        props: {
            userdata: user.entityData,
            deadline: settings.preset.deadline,
            events: await withEvent(async (repo): Promise<{ block1: EntityData[]; block2: EntityData[] }> => {
                await repo.createIndex();
                return {
                    block1: (await repo.search().where('block').eq(true).all()).map((x) => {
                        return {
                            title: x.entityData.title,
                            guest: x.entityData.guest,
                            capacity: x.entityData.capacity,
                            occupied: x.entityData.occupied,
                            location: x.entityData.location,
                            color: x.entityData.color,
                            description: x.entityData.description,
                        };
                    }),
                    block2: (await repo.search().where('block').eq(false).all()).map((x) => {
                        return {
                            title: x.entityData.title,
                            guest: x.entityData.guest,
                            capacity: x.entityData.capacity,
                            occupied: x.entityData.occupied,
                            location: x.entityData.location,
                            color: x.entityData.color,
                            description: x.entityData.description,
                        };
                    }),
                };
            }),
        },
    };
}
const Programok = ({
    userdata,
    deadline,
    events,
}: {
    deadline: number;
    userdata: { block1: string; block2: string };
    events: { block1: EntityData[]; block2: EntityData[] };
}) => {
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
                                {events.block1.map((x) => {
                                    <Event
                                        title={`${x.title}`}
                                        location={`${x.location}`}
                                        capacity={parseInt(x.capacity.toString())}
                                        occupied={parseInt(x.occupied.toString())}
                                        guest={`${x.guest}`}
                                        description={`${x.description}`}
                                        color={`${x.color}`}
                                        id={`${x.id}`}
                                    />;
                                })}
                            </>
                        ) : (
                            <>
                                {events.block2.map((x) => {
                                    <Event
                                        title={`${x.title}`}
                                        location={`${x.location}`}
                                        capacity={parseInt(x.capacity.toString())}
                                        occupied={parseInt(x.occupied.toString())}
                                        guest={`${x.guest}`}
                                        description={`${x.description}`}
                                        color={`${x.color}`}
                                        id={`${x.id}`}
                                    />;
                                })}
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
    return <Layout userdata={page.props.userdata}>{page}</Layout>;
};

// <Block onSelect={(first) => setBlock(first)} />

export default Programok;
