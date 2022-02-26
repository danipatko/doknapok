import type { NextPage } from 'next';
import { useEffect } from 'react';
import { CLIENT_ID } from '../lib/env';

const redirect = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&response_type=code&redirect_uri=http%3A//localhost%3A3000/auth/redirect&client_id=${CLIENT_ID}`;

// http://localhost:3000/auth/redirect?state=state_parameter_passthrough_value&code=4%2F0AX4XfWjPCXbOmjOnu0bzNeMaHwFjEcWxNkt3hE64LWHS962uJvHZpQKBPD-zWpM7nP2bvQ&scope=profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile

const Home: NextPage = () => {
    useEffect(() => {
        console.log(`Redirect: '${redirect}'`);
    });

    return (
        <div>
            <div className='text-red-500'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, error. Necessitatibus velit a voluptatum quos dolores, voluptatibus
                maiores laboriosam aut dolorum quisquam, reprehenderit eum impedit excepturi inventore odio nam! Numquam?
            </div>
            <a href={redirect}>Login ?? ? </a>
        </div>
    );
};

export default Home;
