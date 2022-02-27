import { NextPageContext } from 'next';
import AddEvent from '../../lib/components/AddEvent';
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
    return (
        <div className='flex justify-center items-center h-screen'>
            <i className='fa-solid fa-wheelchair'></i>
            <AddEvent mode='edit' values={xd} />
        </div>
    );
};

export default DashBoard;
