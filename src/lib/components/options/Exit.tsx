const Exit = ({ onClick }: { onClick: () => void }) => {
    return (
        <div className='absolute bg-transparent hover:bg-white text-white hover:text-black'>
            <span onClick={onClick} className='fa fa-x p-1 px-1.5 rounded-full'></span>
        </div>
    );
};

export default Exit;
