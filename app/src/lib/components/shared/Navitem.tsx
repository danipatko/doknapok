const Navitem = ({ selected, index, children, onClick }: { selected: boolean; index: number; onClick: () => void; children: any }) => {
    return (
        <div
            onClick={onClick}
            style={{ borderBottom: selected ? '2px solid rgb(99 102 241)' : 'none' }}
            className='relative flex-1 cursor-pointer p-2 text-center hover:dark:bg-back-highlight hover:bg-zinc-200'
        >
            {children}
        </div>
    );
};

export default Navitem;
