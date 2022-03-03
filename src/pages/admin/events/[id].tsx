import { NextPageContext } from 'next';
import Link from 'next/link';
import { ReactElement } from 'react';
import { EntityData } from 'redis-om';
import Layout from '../../../lib/components/admin/Layout';
import EventEditor from '../../../lib/components/EventEditor';
import { withEvent } from '../../../lib/server/database/redis';
import { redirectToRoot } from '../../../lib/server/types';
import { settings } from '../../../lib/server/util';
import { getUser } from '../../api/auth/token';

export async function getServerSideProps(context: NextPageContext) {
    if (!(context.req && context.res)) return redirectToRoot;

    const user = await getUser(context.req, context.res, 'admin');
    if (!user) return redirectToRoot;

    const { id } = context.query;
    if (!id) return redirectToRoot;

    return {
        props: {
            event: await withEvent(async (repo): Promise<EntityData> => {
                if (!id) return {};
                const e = await repo.fetch(typeof id == 'string' ? id : id[0]);
                if (!Object.keys(e.entityData).length) return {};
                return e.entityData;
            }),
            block1: settings.block1,
            block2: settings.block2,
        },
    };
}

const AdminEvent = ({
    event,
    block1,
    block2,
}: {
    event: {
        id: string;
        color: string;
        guest: string;
        location: string;
        capacity: number;
        occupied: number;
        title: string;
        description: string;
        block: boolean;
    };
    block1: { start: string; end: string };
    block2: { start: string; end: string };
}) => {
    return Object.keys(event).length == 0 ? (
        <div className='h-[80vh] flex justify-center items-center text-lg'>
            <div>
                <div className='text-xl'>Program nem található.</div>
                <div className='p-2 text-center'>
                    <Link href='/admin'>
                        <a className='text-indigo-500 font-semibold hover:underline'>Vissza</a>
                    </Link>
                </div>
            </div>
        </div>
    ) : (
        <>
            <div className='p-5'>
                <Link href='/admin'>
                    <a className='text-indigo-500 text-lg font-semibold hover:underline'>
                        <i className='fa fa-arrow-left'></i> Vissza
                    </a>
                </Link>
            </div>
            <EventEditor block1={block1} block2={block2} mode='edit' values={event} />
        </>
    );
};

AdminEvent.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>;
};

export default AdminEvent;
