import type { NextPage } from 'next';
import Event from '../lib/components/Event';
import { useState } from 'react';
import Block from '../lib/components/Block';
import { CLIENT_ID } from '../lib/server/env';

const redirect = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=code&redirect_uri=http%3A//localhost%3A3000/api/auth/redirect&client_id=${CLIENT_ID}`;
// http://localhost:3000/auth/redirect?state=state_parameter_passthrough_value&code=4%2F0AX4XfWjPCXbOmjOnu0bzNeMaHwFjEcWxNkt3hE64LWHS962uJvHZpQKBPD-zWpM7nP2bvQ&scope=profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile

const Home: NextPage = () => {
    const [block, setBlock] = useState(true);

    return (
        <div className='text-zinc-200'>
            <Block
                onSelect={(first) => {
                    setBlock(first);
                }}
            />
            <div className='flex flex-wrap w-full h-full px-10 py-2 justify-center'>
                {block ? (
                    <div className='flex flex-wrap flex-col w-1/3 h-full gap-10 justify-center'>
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
