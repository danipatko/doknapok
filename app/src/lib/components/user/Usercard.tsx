import Image from 'next/image';
import { login } from '../../server/env';

const Usercard = ({ class: _class, name, picture }: { name: string; picture: string; class: string }) => {
    return (
        <a
            href={login}
            title='Fiókváltás'
            className='p-1 md:p-2 text-sm md:text-base flex justify-start rounded-md items-center gap-4 select-none cursor-pointer hover:bg-zinc-200 hover:dark:bg-zinc-700'
        >
            <Image alt='profile image' className='rounded-full' src={picture} width='32px' height='32px' />
            <div className='font-semibold'>
                {name} {_class.toUpperCase()}
            </div>
        </a>
    );
};

export default Usercard;
