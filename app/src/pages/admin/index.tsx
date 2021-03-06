import { NextPageContext } from 'next';
import { getUser } from '../../lib/server/google-api/token';
import { redirectToRoot, User } from '../../lib/server/types';
import { withUser } from '../../lib/server/database/redis';
import { ReactElement, useState } from 'react';
import Layout from '../../lib/components/admin/Layout';
import Head from 'next/head';
import { Settings } from '../../lib/server/util';
import Events from '../../lib/components/admin/Events';
import { useEvents } from '../../lib/hooks/admin-events';
import Navitem from '../../lib/components/shared/Navitem';
import Stats from '../../lib/components/admin/Stats';
import { DatePicker } from '../../lib/components/admin/Datepick';
import useDeadline from '../../lib/hooks/deadline';
import usePopup from '../../lib/hooks/popup';
import Popup from '../../lib/components/shared/Popup';

const MAX_GRAPH_DETAIL = 20; // length of returned items

export async function getServerSideProps(ctx: NextPageContext) {
    if (!(ctx.req && ctx.res)) return redirectToRoot;
    // admin check
    const admin = await getUser(ctx.req, ctx.res, 'admin');
    if (!admin) return redirectToRoot;

    const stats = await withUser(async (repo) => {
        await repo.createIndex();

        // Ignore admin
        const userCount = await repo.search().count();
        const usersDone = (await repo.search().and('done').eq(true).all()).map((x) => x.entityData.donedate);

        const doneCount = usersDone.length;
        const target = usersDone.length > MAX_GRAPH_DETAIL ? MAX_GRAPH_DETAIL : usersDone.length;
        const scale = Math.round(doneCount / target);

        if (usersDone.length < MAX_GRAPH_DETAIL)
            for (var i = 0; i < target; i += scale) if (i != usersDone.length - 1) usersDone.splice(i + 1, scale);

        return {
            userCount,
            doneCount,
            dates: usersDone,
        };
    });

    return { props: { stats, user: admin.entityData, deadline: Settings.getInstance().preset.deadline } };
}

const DashBoard = ({
    stats,
    user,
    deadline,
}: {
    stats: { userCount: number; doneCount: number; dates: number[] };
    user: User;
    deadline: { date: string; time: string };
}) => {
    const [shown, message, ok, alrt, setShown] = usePopup({ hideafter: 4000 });
    const [selected, select] = useState<number>(0);
    const [block1, openB1, updateB1, removeB1] = useEvents(true); // first block
    const [block2, openB2, updateB2, removeB2] = useEvents(false); // second one
    const [dl, setDeadline] = useDeadline(deadline.date, deadline.time, alrt);

    const sel = (index: number) => {
        if (index == 1) openB1();
        else if (index == 2) openB2();
        select(index);
    };

    return (
        <>
            <Head>
                <title>Dashboard - D??K napok</title>
            </Head>
            <div className='mt-2.5 flex justify-center items-center'>
                <div className='w-[100vw] md:w-[90vw] lg:w-[80vw] xl:w-[60vw] p-2 md:p-0'>
                    <nav className='flex'>
                        <Navitem onClick={() => sel(0)} selected={selected == 0} index={0}>
                            Dashboard
                        </Navitem>
                        <Navitem onClick={() => sel(1)} selected={selected == 1} index={1}>
                            Els?? blokk
                        </Navitem>
                        <Navitem onClick={() => sel(2)} selected={selected == 2} index={2}>
                            M??sodik blokk
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
                                alrt={alrt}
                                onRemove={(id) => (selected == 1 ? removeB1(id) : removeB2(id))}
                                selected={selected}
                                onUpdate={() => (selected == 1 ? updateB1() : updateB2())}
                                events={selected == 1 ? block1 : block2}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Popup message={message} ok={ok} onClick={() => setShown(false)} shown={shown} />
        </>
    );
};

DashBoard.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>;
};

export default DashBoard;
