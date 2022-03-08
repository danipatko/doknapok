import Head from 'next/head';
import React, { ReactElement, useState } from 'react';
import Deadline from '../lib/components/shared/Deadline';
import Layout from '../lib/components/user/Layout';
import Event from '../lib/components/user/Event';
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
    if (!user)
        return {
            redirect: {
                destination: login,
                permanent: false,
            },
        };

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
                    block1: (await repo.search().where('block').eq(true).all()).map((x) => {
                        return { ...x.entityData, id: x.entityId };
                    }),
                    block2: (await repo.search().where('block').eq(false).all()).map((x) => {
                        return { ...x.entityData, id: x.entityId };
                    }),
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
    const [eventData, enroll, unenroll, block, setBlock] = useEvents({ events, block1, block2, selected1: user.block1, selected2: user.block2 });
    const [selected1, select1] = useState<number>(-1);
    const [selected2, select2] = useState<number>(-1);

    return (
        <>
            <Head>
                <title>Programok - Dök napok</title>
            </Head>
            <Deadline time={deadline} />
            <div className='text-center text-sm md:text-base lg:text-lg l p-2 md:p-4 lg:p-5'>
                {eventData.selected1?.length && eventData.selected1?.length
                    ? 'Nincs más teendőd, kész vagy.'
                    : 'Válassz minkét időpontból egy-egy neked tetsző programot!'}
            </div>
            <div className='flex justify-center items-center'>
                <div className='w-[100vw] md:w-[80vw] lg:w-[70vw] xl:w-[50vw] md:p-0'>
                    <nav className='flex'>
                        <Navitem onClick={() => setBlock(true)} selected={block} index={0}>
                            <span>
                                {block1.start} - {block1.end}
                            </span>
                            {!eventData.selected1?.length ? (
                                <span className='absolute top-0 right-0 flex h-3 w-3 '>
                                    <span className='animate-ping absolute h-full w-full rounded-full bg-red-500'></span>
                                </span>
                            ) : null}
                        </Navitem>
                        <Navitem onClick={() => setBlock(false)} selected={!block} index={1}>
                            <span>
                                {block2.start} - {block2.end}
                            </span>
                            {!eventData.selected2?.length ? (
                                <span className='absolute top-0 right-0 flex h-3 w-3 '>
                                    <span className='animate-ping absolute h-full w-full rounded-full bg-red-500'></span>
                                </span>
                            ) : null}
                        </Navitem>
                    </nav>
                    {eventData.error?.length ? <div className='p-2 bg-red-500'>{eventData.error}</div> : null}
                    <div className='p-1'>
                        {block ? (
                            <div>
                                {eventData.events.block1.map((x, i) => (
                                    <Event
                                        loadstate={eventData.ongoing}
                                        onEnroll={enroll}
                                        onCancel={unenroll}
                                        selected={eventData.selected1}
                                        onClick={() => select1(i)}
                                        extended={selected1 == i}
                                        key={i}
                                        data={x}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div>
                                {eventData.events.block2.map((x, i) => (
                                    <Event
                                        loadstate={eventData.ongoing}
                                        onEnroll={enroll}
                                        onCancel={unenroll}
                                        selected={eventData.selected2}
                                        onClick={() => select2(i)}
                                        extended={selected2 == i}
                                        key={i}
                                        data={x}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

// this sets the default layout to the user one
Programok.getLayout = (page: ReactElement) => {
    return <Layout userData={page.props.user}>{page}</Layout>;
};

// <Block onSelect={(first) => setBlock(first)} />

export default Programok;
