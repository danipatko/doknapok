import { NextPageContext } from 'next';
import Link from 'next/link';
import { ReactElement, useState } from 'react';
import Layout from '../../../lib/components/admin/Layout';
import EventEditor from '../../../lib/components/admin/EventEditor';
import { redirectToRoot } from '../../../lib/server/types';
import { settings } from '../../../lib/server/util';
import { getUser } from '../../../lib/server/google-api/token';
import Head from 'next/head';

export async function getServerSideProps(context: NextPageContext) {
    if (!(context.req && context.res)) return redirectToRoot;

    const user = await getUser(context.req, context.res, 'admin');
    if (!user) return redirectToRoot;

    return { props: { block1: settings.preset.block1, block2: settings.preset.block2 } };
}

const CreateEvent = ({ block1, block2 }: { block1: { start: string; end: string }; block2: { start: string; end: string } }) => {
    return (
        <>
            <Head>
                <title>Új program létrehozása</title>
            </Head>
            <div className='p-5'>
                <Link href='/admin'>
                    <a className='text-indigo-500 text-lg font-semibold hover:underline'>
                        <i className='fa fa-arrow-left'></i> Vissza
                    </a>
                </Link>
            </div>
            <div className='h-[80vh] flex justify-center items-center'>
                <EventEditor onRemove={() => {}} block1={block1} block2={block2} mode='create' />
            </div>
        </>
    );
};

CreateEvent.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>;
};

export default CreateEvent;
