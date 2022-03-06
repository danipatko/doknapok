import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
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

const Event = ({
    data,
    extended,
    onClick,
    selected,
    onEnroll,
}: {
    data: IEvent;
    extended: boolean;
    selected: string;
    onClick: () => void;
    onEnroll: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            style={selected === data.id ? { borderColor: '#00ff00' } : { borderLeftColor: data.color }}
            className='mt-3 hover:dark:border-zinc-500 hover:bg-zinc-200 dark:bg-back-highlight p-2 rounded-md border-l-[12px] border border-zinc-200 dark:border-zinc-700'
        >
            {!extended ? (
                <>
                    <div className='flex justify-between'>
                        <div>
                            <div className='text-lg font-semibold overflow-hidden'>{data.title}</div>
                            <div>
                                {data.guest} &#183; {data.location}
                            </div>
                        </div>
                        <div className='flex items-center text-blue-500 font-bold'>
                            {data.occupied}/{data.capacity}
                        </div>
                    </div>
                    <div className='text-right'>
                        <i className='fa-solid fa-angle-down'></i>
                    </div>
                </>
            ) : (
                <>
                    <div className='text-lg font-semibold overflow-hidden'>{data.title}</div>
                    <div className='py-2.5  text-base'>{data.description}</div>
                    <div className='flex justify-between'>
                        <div className='py-2 text-sm sm:text-base'>
                            <div>
                                <span className='text-zinc-400 dark:text-zinc-500'>Előadó:</span> {data.guest}
                            </div>
                            <div>
                                <span className='text-zinc-400 dark:text-zinc-500'>Helyszín:</span> {data.location}
                            </div>
                            <div className=''>
                                <span className='text-zinc-400 dark:text-zinc-500'>Szabad helyek:</span>{' '}
                                <span className='text-blue-500 font-bold'>
                                    {data.occupied}/{data.capacity}
                                </span>
                            </div>
                        </div>
                        <div className='flex items-end p-1'>
                            <button className='rounded-md p-2 font-semibold text-white bg-green-500 hover:bg-green-400'>Jelentkezés</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

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

    const enunroll = () => {};

    return (
        <>
            <Head>
                <title>Programok - Dök napok</title>
            </Head>
            <Deadline time={deadline} />
            <div className='text-center text-sm md:text-base lg:text-lg l p-2 md:p-4 lg:p-5'>
                Válassz minkét időpontból egy-egy neked tetsző programot!
            </div>
            <div className='flex justify-center items-center'>
                <div className='w-[100vw] md:w-[80vw] lg:w-[70vw] xl:w-[50vw] md:p-0'>
                    <nav className='flex'>
                        <Navitem onClick={() => setBlock(true)} selected={block} index={0}>
                            {block1.start} - {block1.end}
                        </Navitem>
                        <Navitem onClick={() => setBlock(false)} selected={!block} index={1}>
                            {block2.start} - {block2.end}
                        </Navitem>
                    </nav>
                    {eventData.error.length ? <div className='p-2 bg-red-500'>{eventData.error}</div> : null}
                    <div className='p-1'>
                        {block ? (
                            <div>
                                {eventData.events.block1.map((x, i) => (
                                    <Event
                                        onEnroll={() => {}}
                                        selected={user.block1}
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
                                        onEnroll={() => {}}
                                        selected={user.block2}
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
    return <Layout userdata={page.props.user}>{page}</Layout>;
};

// <Block onSelect={(first) => setBlock(first)} />

export default Programok;
