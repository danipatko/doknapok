const Block = ({ selected, onSelect }: { selected: boolean; onSelect: (firstSelected: boolean) => void }) => {
    const select = (first: boolean) => onSelect(first);

    return (
        <div className='border border-fore flex'>
            <div
                onClick={() => select(true)}
                className={`p-1 flex-1 text-center select-none cursor-pointer text-white ${
                    selected ? 'bg-fore hover:bg-fore-highlight' : 'bg-main hover:bg-main-highlight'
                } `}
            >
                9:20 - 11:00
            </div>
            <div
                onClick={() => select(false)}
                className={`p-1 flex-1 text-center select-none cursor-pointer text-white ${
                    selected ? 'bg-main hover:bg-main-highlight' : 'bg-fore hover:bg-fore-highlight'
                } `}
            >
                12:00 - 14:00
            </div>
        </div>
    );
};

export default Block;
