const Layout = (props: any) => {
    return (
        <div className='dark'>
            <div className='bg-vscgrey'>{props.children}</div>
        </div>
    );
};

export default Layout;
