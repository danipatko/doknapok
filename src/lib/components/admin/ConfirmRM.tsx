import Overlay from '../Overlay';

const ConfirmRM = ({ id, onExit, onRemove, shown }: { id: string; onExit: () => void; onRemove: (id: string) => void; shown: boolean }) => {
    return (
        <Overlay onExit={onExit} shown={shown}>
            <div className='bg-white dark:bg-back-highlight p-5 rounded-md'>
                <div className='text-xl mb-4'>Biztosan törli ezt az elemet?</div>
                <div className='flex justify-evenly'>
                    <button onClick={onExit} className='bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-400'>
                        Mégse
                    </button>
                    <button onClick={() => onRemove(id)} className='bg-red-500 text-white p-2 rounded-md hover:bg-red-400'>
                        Törlés
                    </button>
                </div>
            </div>
        </Overlay>
    );
};

export default ConfirmRM;
