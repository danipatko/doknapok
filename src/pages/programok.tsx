import Head from 'next/head';
import React, { ReactElement, useState } from 'react';
import Deadline from '../lib/components/shared/Deadline';
import Layout from '../lib/components/user/Layout';
import Navitem from '../lib/components/shared/Navitem';
import { settings } from '../lib/server/util';
import { NextPageContext } from 'next';
import { IEvent, redirectToRoot } from '../lib/server/types';
import { getUser } from '../lib/server/google-api/token';
import { withEvent } from '../lib/server/database/redis';
import { useEvents } from '../lib/hooks/blocks';
import { login } from '../lib/server/env';

export async function getServerSideProps(ctx: NextPageContext) {
    if (!(ctx.req && ctx.res)) return redirectToRoot;

    // check logged in
    const user = await getUser(ctx.req, ctx.res, 'any');
    if (!user) return login;

    return {
        props: {
            user: {
                name: user.entityData.name,
                email: user.entityData.email,
                class: user.entityData.class,
                picture: user.entityData.picture,
                block1: user.entityData.block1 ?? null,
                block2: user.entityData.block2 ?? null,
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
    block1,
    block2,
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
    events: { block1: IEvent[]; block2: IEvent[] };
}) => {
    const [selected, select] = useState<number>(0);
    const [eventData, enroll, unenroll, block, setBlock] = useEvents({ events, block1, block2, selected1: user.block1, selected2: user.block2 });

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
                    <div></div>
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
