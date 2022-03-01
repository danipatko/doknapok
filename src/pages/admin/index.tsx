import { NextPageContext } from 'next';
import { getID } from '../api/auth/token';

const homePageRedirect = {
    redirect: {
        permanent: false,
        destination: '/',
    },
};

export async function getServerSideProps(ctx: NextPageContext) {
    if (!(ctx.req && ctx.res)) return homePageRedirect;

    // admin check
    const userID = getID(ctx.req, ctx.res, 'admin');

    console.log(userID);
    if (!userID) return homePageRedirect;

    return { props: { id: 'heheheha' } };
}

const xd = {
    title: 'heheheha',
    guest: 'heheheha',
    location: 'heheheha',
    capacity: 1,
    description: 'behheheheheheheheheheha',
    color: '#fff',
    block: false,
    id: '',
};

const DashBoard = (props: any) => {
    return <div></div>;
};

export default DashBoard;

// <EventEditor mode='edit' values={xd} />
