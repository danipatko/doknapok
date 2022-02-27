import Countdown from './Countdown';

const Layout = (props: any) => {
    return (
        <div className='bg-vscgrey'>
            <div className='w-full flex justify-around py-2 border-b border-fore'>
                <div className='navItem'>SZLG DÖK napok</div>
                <Countdown />
                <div className='navItem'>john.doe.69f@szlgbp.hu</div>
            </div>
            <div>{props.children}</div>
        </div>
    );
};

export default Layout;
