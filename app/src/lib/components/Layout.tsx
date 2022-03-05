import Countdown from './Countdown';

const Layout = (props: any) => {
    return (
        <div className='dark'>
            <div className='w-full flex justify-evenly py-3 border-b border-fore'>
                <div className='flex justify-center items-center'>
                    <img src='/logo.png' style={{ maxWidth: 30, maxHeight: 30 }} />
                    <div className='navItem pl-2'>SZLG DÖK napok</div>
                </div>
                <Countdown />
                <div className='navItem'>john.doe.69f@szlgbp.hu</div>
            </div>
            <div className='bg-vscgrey'>{props.children}</div>
        </div>
    );
};

export default Layout;
