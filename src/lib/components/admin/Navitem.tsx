const Navitem = ({ selected, index, children, onClick }: { selected: number; index: number; onClick: () => void; children: any }) => {
    return (
        <div
            onClick={onClick}
            style={{ borderBottom: selected == index ? '2px solid rgb(99 102 241)' : 'none' }}
            className='w-1/3 cursor-pointer p-2 text-center hover:dark:bg-back-highlight hover:bg-zinc-200'
        >
            {children}
        </div>
    );
};

export default Navitem;
