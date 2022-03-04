import { NextPageContext } from 'next';
import Link from 'next/link';
import { ReactElement, useState } from 'react';
import { EntityData } from 'redis-om';
import Layout from '../../../../lib/components/admin/Layout';
import EventEditor from '../../../../lib/components/admin/EventEditor';
import { withEvent, withUser } from '../../../../lib/server/database/redis';
import { redirectToRoot } from '../../../../lib/server/types';
import { settings } from '../../../../lib/server/util';
import { getUser } from '../../../../lib/server/google-api/token';
import ExportCSV from '../../../../lib/components/admin/ExportCSV';

export async function getServerSideProps(context: NextPageContext) {
    if (!(context.req && context.res)) return redirectToRoot;

    const user = await getUser(context.req, context.res, 'admin');
    if (!user) return redirectToRoot;

    let { id } = context.query;
    if (!id) return redirectToRoot;

    return {
        props: {
            // data about the event
            event: await withEvent(async (repo): Promise<EntityData> => {
                if (!id) return {};
                const e = await repo.fetch(typeof id == 'string' ? id : id[0]);
                if (!Object.keys(e.entityData).length) return {};
                return { ...e.entityData, id: e.entityId };
            }),
            // data about users who enrolled to this event
            users: await withUser(async (repo): Promise<EntityData[]> => {
                if (!id) return [];
                id = typeof id == 'string' ? id : id[0];
                return (await repo.search().where('block1').eq(id).or('block2').eq(id).all()).map((x) => {
                    return { email: x.entityData.email, name: x.entityData.name, class: x.entityData.class };
                });
            }),
            // simple settings
            block1: settings.preset.block1,
            block2: settings.preset.block2,
        },
    };
}

const Userlist = ({ users, onExport }: { users: { name: string; email: string; class: string }[]; onExport: () => void }) => {
    return (
        <div className='mt-5 px-5 md:px-10 py-5 rounded-lg border border-zinc-200 dark:border-zinc-700 dark:bg-back-highlight'>
            <div className='text-2xl mb-5'>Jelentkezők</div>
            <div>
                {!users.length ? (
                    <div className='text-center text-zinc-400'>Még senki sem jelentkezett erre a programra</div>
                ) : (
                    <table className='table-auto w-full'>
                        <thead className='border-b border-b-zinc-200 dark:border-b-zinc-600'>
                            <tr className='text-left'>
                                <th>Név</th>
                                <th>Email</th>
                                <th>Osztály</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((x, i) => {
                                return (
                                    <tr key={i} className={`${i % 2 ? 'bg-zinc-600' : ''}`}>
                                        <td className='p-1'>{x.name}</td>
                                        <td className='p-1'>{x.email}</td>
                                        <td className='p-1'>{x.class}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            <div className='mt-5'>
                <button onClick={onExport} className='p-2 rounded-md bg-green-600 hover:bg-green-500 text-white'>
                    Exportálás mint CSV
                </button>
            </div>
        </div>
    );
};

const AdminEvent = ({
    event,
    block1,
    block2,
    users,
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
    users: { email: string; name: string; class: string }[];
    block1: { start: string; end: string };
    block2: { start: string; end: string };
}) => {
    const [shown, show] = useState<boolean>(false);

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
            <ExportCSV id={event.id} onExit={() => show(false)} shown={shown} />
            <div className='p-5'>
                <Link href='/admin'>
                    <a className='text-indigo-500 text-lg font-semibold hover:underline'>
                        <i className='fa fa-arrow-left'></i> Vissza
                    </a>
                </Link>
            </div>
            <div className='flex justify-center min-h-[80vh] pb-20 items-center'>
                <div>
                    <EventEditor block1={block1} block2={block2} mode='edit' values={event} />
                    <Userlist users={users} onExport={() => show(true)} />
                </div>
            </div>
        </>
    );
};

AdminEvent.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>;
};

export default AdminEvent;
