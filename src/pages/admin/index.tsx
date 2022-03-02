import { NextPageContext } from 'next';
import { getID, getUser } from '../api/auth/token';
import { IEvent, redirectToRoot, User } from '../../lib/server/types';
import { withUser } from '../../lib/server/database/redis';
import { ReactElement, useEffect, useState } from 'react';
import Layout from '../../lib/components/admin/Layout';
import Head from 'next/head';
import Deadline from '../../lib/components/shared/Deadline';
import { settings } from '../../lib/server/util';
import Events from '../../lib/components/admin/Events';
import { useEvents } from '../../lib/hooks/blockHook';
import Navitem from '../../lib/components/admin/Navitem';

export async function getServerSideProps(ctx: NextPageContext) {
    if (!(ctx.req && ctx.res)) return redirectToRoot;
    // admin check
    const admin = await getUser(ctx.req, ctx.res, 'admin');
    if (!admin) return redirectToRoot;

    const stats = await withUser(async (repo) => {
        const userCount = await repo.search().where('admin').eq(false).count();
        const usersDone = await repo.search().where('admin').eq(false).and('done').eq(true).returnAll();

        return {
            userCount,
            dates: usersDone.map((x) => {
                return { date: x.entityData.donedate };
            }),
        };
    });

    return { props: { stats, user: admin.entityData, settings: { deadline: settings.deadline } } };
}

const DashBoard = ({ stats, user, settings }: { stats: { userCount: number; dates: Date[] }; user: User; settings: { deadline: number } }) => {
    const [selected, select] = useState<number>(0);
    const [block1, openBlock1, updateBlock1] = useEvents(true); // first block
    const [block2, openBlock2, updateBlock2] = useEvents(false); // second one

    const sel = (index: number) => {
        if (index == 1) openBlock1();
        else if (index == 2) openBlock2();
        select(index);
    };

    return (
        <>
            <Head>
                <title>Admin - DÖK napok</title>
            </Head>
            <div className='mt-2.5 flex justify-center items-center'>
                <div className='w-[100vw] md:w-[80vw] lg:w-[70vw] xl:w-[50vw] p-2 md:p-0'>
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
                        {selected == 0 ? <div>Page 1</div> : selected == 1 ? <Events events={block1} /> : <Events events={block2} />}
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
