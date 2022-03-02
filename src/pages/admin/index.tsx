import { NextPageContext } from 'next';
import { getID, getUser } from '../api/auth/token';
import { redirectToRoot, User } from '../../lib/server/types';
import { withUser } from '../../lib/server/database/redis';
import { ReactElement, useEffect } from 'react';
import Layout from '../../lib/components/admin/Layout';
import Head from 'next/head';
import Deadline from '../../lib/components/shared/Deadline';
import { settings } from '../../lib/server/util';

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

const DashBoard = ({ stats, user, settings }: { stats: { userCount: number; dates: Date[] }; user: User; settings: object }) => {
    return (
        <>
            <Head>
                <title>Admin - DÖK napok</title>
            </Head>
            <Deadline time={new Date('2022-03-13 23:59').getTime()} />
        </>
    );
};

// this sets the default layout to the user one
DashBoard.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>;
};

export default DashBoard;
