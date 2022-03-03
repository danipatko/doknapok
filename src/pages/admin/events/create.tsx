import { NextPageContext } from 'next';
import Link from 'next/link';
import { ReactElement, useState } from 'react';
import { EntityData } from 'redis-om';
import Layout from '../../../lib/components/admin/Layout';
import EventEditor from '../../../lib/components/EventEditor';
import Block from '../../../lib/components/admin/Block';
import ColorPicker from '../../../lib/components/admin/ColorPicker';
import Input from '../../../lib/components/admin/Input';
import { withEvent } from '../../../lib/server/database/redis';
import { redirectToRoot } from '../../../lib/server/types';
import { settings } from '../../../lib/server/util';
import { getUser } from '../../api/auth/token';

export async function getServerSideProps(context: NextPageContext) {
    if (!(context.req && context.res)) return redirectToRoot;

    const user = await getUser(context.req, context.res, 'admin');
    if (!user) return redirectToRoot;

    return { props: { block1: settings.block1, block2: settings.block2 } };
}

const CreateEvent = ({ block1, block2 }: { block1: { start: string; end: string }; block2: { start: string; end: string } }) => {
    return (
        <>
            <div className='p-5'>
                <Link href='/admin'>
                    <a className='text-indigo-500 text-lg font-semibold hover:underline'>
                        <i className='fa fa-arrow-left'></i> Vissza
                    </a>
                </Link>
            </div>
            <div className='h-[80vh] flex justify-center items-center'>
                <EventEditor block1={block1} block2={block2} mode='create' />
            </div>
        </>
    );
};

CreateEvent.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>;
};

export default CreateEvent;
