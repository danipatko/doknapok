const Popup = ({ message, ok, shown, onClick }: { message: string; ok: boolean; shown: boolean; onClick: () => void }) => {
    return (
        <div
            onClick={onClick}
            style={{ display: shown ? 'block' : 'none' }}
            className='md:m-4 m-2 lg:m-6 fixed bottom-0 left-0 p-1 rounded-md md:p-2 border dark:bg-back-highlight dark:border-zinc-700 text-sm md:text-base'
        >
            <span className={ok ? 'pr-2 fa fa-check text-green-500' : 'pr-2 fa fa-x text-red-500'}></span> {message}
        </div>
    );
};

export default Popup;
