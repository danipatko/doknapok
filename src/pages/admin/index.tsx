import { NextPageContext } from 'next';
import { getUser } from '../../lib/server/google-api/token';
import { redirectToRoot, User } from '../../lib/server/types';
import { withUser } from '../../lib/server/database/redis';
import { ReactElement, useState } from 'react';
import Layout from '../../lib/components/admin/Layout';
import Head from 'next/head';
import { settings } from '../../lib/server/util';
import Events from '../../lib/components/admin/Events';
import { useEvents } from '../../lib/hooks/blockHook';
import Navitem from '../../lib/components/admin/Navitem';
import Stats from '../../lib/components/admin/Stats';
import { DatePicker } from '../../lib/components/admin/Datepick';
import useDeadline from '../../lib/hooks/deadline';

const MAX_GRAPH_DETAIL = 20; // length of returned items

export async function getServerSideProps(ctx: NextPageContext) {
    if (!(ctx.req && ctx.res)) return redirectToRoot;
    // admin check
    const admin = await getUser(ctx.req, ctx.res, 'admin');
    if (!admin) return redirectToRoot;

    const stats = await withUser(async (repo) => {
        await repo.createIndex();

        const userCount = await repo.search().where('admin').eq(false).count();
        const usersDone = (await repo.search().where('admin').eq(false).and('done').eq(true).all()).map((x) => x.entityData.donedate);

        const doneCount = usersDone.length;
        const target = usersDone.length > MAX_GRAPH_DETAIL ? MAX_GRAPH_DETAIL : usersDone.length;
        const scale = Math.round(doneCount / target);

        for (var i = 0; i < target; i += scale) if (i != usersDone.length - 1) usersDone.splice(i + 1, scale);

        return {
            userCount,
            doneCount,
            dates: usersDone,
        };
    });

    return { props: { stats, user: admin.entityData, deadline: settings.preset.deadline } };
}

const DashBoard = ({ stats, user, deadline }: { stats: { userCount: number; doneCount: number; dates: number[] }; user: User; deadline: number }) => {
    const [selected, select] = useState<number>(0);
    const [block1, openB1, updateB1, removeB1] = useEvents(true); // first block
    const [block2, openB2, updateB2, removeB2] = useEvents(false); // second one
    const [dl, setDeadline] = useDeadline(deadline);

    const sel = (index: number) => {
        if (index == 1) openB1();
        else if (index == 2) openB2();
        select(index);
    };

    return (
        <>
            <Head>
                <title>Admin - DÖK napok</title>
            </Head>
            <div className='mt-2.5 flex justify-center items-center'>
                <div className='w-[100vw] md:w-[90vw] lg:w-[80vw] xl:w-[60vw] p-2 md:p-0'>
                    <nav className='flex'>
                        <Navitem onClick={() => sel(0)} selected={selected} index={0}>
                            Dashboard
                        </Navitem>
                        <Navitem onClick={() => sel(1)} selected={selected} index={1}>
                            Első blokk
                        </Navitem>
                        <Navitem onClick={() => sel(2)} selected={selected} index={2}>
                            Második blokk
                        </Navitem>
                    </nav>
                    <div className='mt-5'>
                        {selected == 0 ? (
                            <div>
                                <DatePicker date={dl.date} time={dl.time} onSubmit={setDeadline} />
                                <Stats {...stats} />
                            </div>
                        ) : (
                            <Events
                                onRemove={(id) => (selected == 1 ? removeB1(id) : removeB2(id))}
                                selected={selected}
                                onUpdate={() => (selected == 1 ? updateB1() : updateB2())}
                                events={selected == 1 ? block1 : block2}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

DashBoard.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>;
};

export default DashBoard;
