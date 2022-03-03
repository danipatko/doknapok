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
                className='px-2 pb-2 w-full transition-colors focus:border-b-fore focus:dark:border-b-fore outline-none dark:bg-back-highlight border-b-2 border-b-zinc-300 dark:border-b-zinc-600'
            />
        </div>
    );
};

export default Input;
