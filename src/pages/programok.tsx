import Head from 'next/head';
import React, { ReactElement, useState } from 'react';
import Deadline from '../lib/components/shared/Deadline';
import Layout from '../lib/components/user/Layout';
import Event from '../lib/components/Event';
import Navitem from '../lib/components/shared/Navitem';
import { settings } from '../lib/server/util';
import { NextPageContext } from 'next';
import { redirectToRoot } from '../lib/server/types';
import { getUser } from '../lib/server/google-api/token';
import { EntityData } from 'redis-om';
import { withEvent } from '../lib/server/database/redis';

export async function getServerSideProps(ctx: NextPageContext) {
    if (!(ctx.req && ctx.res)) return redirectToRoot;

    const user = await getUser(ctx.req, ctx.res, 'user');
    console.log(user);
    if (!user) return redirectToRoot;

    return {
        props: {
            user: {
                name: user.entityData.name,
                email: user.entityData.email,
                class: user.entityData.class,
                picture: user.entityData.picture,
                block1: user.entityData.block1,
                block2: user.entityData.block2,
            },
            deadline: settings.preset.deadline,
            events: await withEvent(async (repo): Promise<any> => {
                await repo.createIndex();
                return {
                    block1: (await repo.search().where('block').eq(true).all()).map((x) => x.entityData),
                    block2: (await repo.search().where('block').eq(false).all()).map((x) => x.entityData),
                };
            }),
            block1: settings.preset.block1,
            block2: settings.preset.block2,
        },
    };
}
const Programok = ({
    user,
    deadline,
    events,
}: {
    deadline: number;
    block1: { start: string; end: string };
    block2: { start: string; end: string };
    user: {
        name: string;
        email: string;
        class: string;
        picture: string;
        block1: string;
        block2: string;
    };
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
    return <Layout userdata={page.props.user}>{page}</Layout>;
};

// <Block onSelect={(first) => setBlock(first)} />

export default Programok;
