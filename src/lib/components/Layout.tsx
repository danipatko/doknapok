import useUser from '../hooks/user';

const Layout = (props: any) => {
    const user = useUser();

    return (
        <div>
            <div>{user ? `Logged in as ${user.name} | ${user.admin ? 'ADMIN' : ''} | ${user.class}` : 'Not logged in'}</div>
            <div>{props.children}</div>;
        </div>
    );
};

export default Layout;
