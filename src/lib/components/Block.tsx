import { useState } from 'react';

const Block = ({ onSelect }: { onSelect: (firstSelected: boolean) => void }) => {
    const [firstSelected, setFirstSelected] = useState<boolean>(true);

    const select = (first: boolean) => {
        setFirstSelected(first);
        onSelect(first);
    };

    return (
        <div className='flex w-full justify-center py-4'>
            <div className='border border-fore flex w-1/6'>
                <div
                    onClick={() => select(true)}
                    className={`p-1 flex-1 text-center select-none cursor-pointer text-white font-medium ${
                        firstSelected ? 'bg-fore hover:bg-fore-highlight text-black' : 'bg-main hover:bg-main-highlight'
                    } `}
                >
                    9:20 - 11:00
                </div>
                <div
                    onClick={() => select(false)}
                    className={`p-1 flex-1 text-center select-none cursor-pointer text-white font-medium ${
                        firstSelected ? 'bg-main hover:bg-main-highlight' : 'bg-fore hover:bg-fore-highlight text-black'
                    } `}
                >
                    12:00 - 14:00
                </div>
            </div>
        </div>
    );
};

export default Block;
