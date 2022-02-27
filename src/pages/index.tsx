import type { NextPage } from 'next';
import Event from '../lib/components/Event';
import { useState } from 'react';
import Block from '../lib/components/Block';

const Home: NextPage = () => {
    const [block, setBlock] = useState(true);

    return (
        <div className='text-zinc-200'>
            <Block
                onSelect={(first) => {
                    setBlock(first);
                }}
            />
            <div className='flex w-full h-full px-10 py-2'>
                {block ? (
                    <div className='flex flex-wrap flex-row w-full h-full gap-10 justify-center'>
                        <Event
                            cim='Ez egy kicsit hosszabb cím'
                            helyszin='1.34'
                            ferohelyek={16}
                            jelentkezok={12}
                            eloado='John Doe'
                            leiras='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum earum dolores pariatur quidem molestiae vitae, veniam aut'
                            szin='#e8fc03'
                        />
                        <Event szin='#fc2c03' />
                        <Event szin='#229912' />
                        <Event szin='#063d35' />
                        <Event szin='#fc2c03' />
                        <Event szin='#229912' />
                        <Event szin='#063d35' />
                        <Event szin='#0a8da1' />
                        <Event szin='#0a8da1' />
                        <Event szin='#092794' />
                        <Event szin='#4c2f8f' />
                        <Event szin='#b721cf' />
                        <Event szin='#0a8da1' />
                        <Event szin='#092794' />
                        <Event szin='#4c2f8f' />
                        <Event szin='#b721cf' />
                        <Event szin='#0a8da1' />
                        <Event szin='#092794' />
                        <Event szin='#4c2f8f' />
                        <Event szin='#b721cf' />
                    </div>
                ) : (
                    <div className='flex flex-wrap flex-row w-full h-full gap-10 justify-center'>
                        <Event szin='#0a8da1' />
                        <Event szin='#fc2c03' />
                        <Event szin='#229912' />
                        <Event szin='#063d35' />
                        <Event szin='#fc2c03' />
                        <Event szin='#229912' />
                        <Event szin='#063d35' />
                        <Event szin='#0a8da1' />
                        <Event szin='#0a8da1' />
                        <Event szin='#092794' />
                        <Event szin='#4c2f8f' />
                        <Event szin='#b721cf' />
                        <Event szin='#0a8da1' />
                        <Event szin='#092794' />
                        <Event szin='#4c2f8f' />
                        <Event szin='#b721cf' />
                        <Event szin='#0a8da1' />
                        <Event szin='#092794' />
                        <Event szin='#4c2f8f' />
                        <Event szin='#b721cf' />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
