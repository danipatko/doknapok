const Input = ({
    type,
    placeholder,
    id,
    className,
}: {
    type: 'text' | 'number' | 'password';
    placeholder: string;
    id: string;
    className?: string;
}) => {
    return (
        <div className={`p-2 ${className ?? ''}`}>
            <div className='text-sm text-zinc-400 px-1 '>{placeholder}</div>
            <input
                id={id}
                type={type}
                className='px-2 pb-2 w-full text-white transition-colors focus:border-b-fore outline-none bg-main border-b-2 border-b-main-highlight'
            />
        </div>
    );
};

export default Input;
