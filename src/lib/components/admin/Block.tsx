const Block = ({
    block1,
    block2,
    selected,
    onSelect,
}: {
    block1: { start: string; end: string };
    block2: { start: string; end: string };
    selected: boolean;
    onSelect: (firstSelected: boolean) => void;
}) => {
    const select = (first: boolean) => onSelect(first);

    return (
        <div className='border border-fore flex'>
            <div
                onClick={() => select(true)}
                className={`p-1 flex-1 text-center select-none cursor-pointer ${
                    selected ? 'bg-fore hover:bg-fore-highlight text-white' : 'dark:bg-back-highlight hover:dark:bg-main'
                } `}
            >
                {block1.start} - {block1.end}
            </div>
            <div
                onClick={() => select(false)}
                className={`p-1 flex-1 text-center select-none cursor-pointer  ${
                    selected ? 'dark:bg-back-highlight hover:dark:bg-main' : 'bg-fore hover:bg-fore-highlight text-white'
                } `}
            >
                {block2.start} - {block2.end}
            </div>
        </div>
    );
};

export default Block;
