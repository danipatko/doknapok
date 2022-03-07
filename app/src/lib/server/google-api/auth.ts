import { withUser } from '../database/redis';
import { getClass } from '../util';

// Restrict allowed login domains to this specific one (leave undefined to accept all)
const RESTRICT_DOMAIN: string | undefined = undefined; // 'szlgbp.hu';
const ADMIN_EMAILS: string[] = ['patko.daniel.19f@szlgbp.hu'];

/**
 * Step 2 of the authentication flow
 * Get the user's access token from the authorization code and the client secret
 */
const fetchAccessToken = async (code: string): Promise<undefined | { access_token: string; scope: string; id_token: string; token_type: string }> => {
    // return if process.env isn't working
    if (!(process.env.CLIENT_ID && process.env.CLIENT_SECRET)) {
        console.error('Error retrieving access token: client id or client secret is not present in .env file');
        return;
    }

    const URL = `https://oauth2.googleapis.com/token?${new URLSearchParams({
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: 'http://localhost/api/auth/redirect',
        grant_type: 'authorization_code',
    }).toString()}`;

    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    if (!response.ok) {
        console.log(`Error retrieving access token: resonse status is not OK\n[${response.status}] ${response.statusText}\n${await response.text()}`);
        return;
    }

    return (await response.json()) as { access_token: string; scope: string; id_token: string; token_type: string };
};

/**
 * Step 3 of the authentication flow.
 * Fetches the public user information using the user's access token
 * @returns google id, name, email, picture, account domain (hd)
 */
const fetchUserInfo = async (creds: {
    access_token: string;
    scope: string;
    id_token: string;
    token_type: string;
}): Promise<
    | undefined
    | {
          id: string;
          email: string;
          name: string;
          picture: string;
          hd: string;
      }
> => {
    const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json`, {
        method: 'GET',
        headers: { Authorization: `${creds.token_type} ${creds.access_token}` },
    });

    if (!response.ok) {
        console.log(`Error fetching user data: response status is not OK\n[${response.status}] ${response.statusText}\n${await response.text()}`);
        return;
    }

    return (await response.json()) as {
        id: string;
        email: string;
        name: string;
        picture: string;
        hd: string;
    };
};

/**
 * Create a new user account or find existing one from authorization code
 * @returns if ok is true, the id of the account otherwise the error message
 */
export const createUser = async (code: string): Promise<{ ok: boolean; id: string; admin?: boolean }> => {
    const creds = await fetchAccessToken(code);
    if (!creds) return { ok: false, id: 'Failed to fetch access token' };

    const data = await fetchUserInfo(creds);
    if (!data) return { ok: false, id: 'Failed to fetch user information' };

    if (RESTRICT_DOMAIN && data.hd != RESTRICT_DOMAIN)
        return { ok: false, id: `Error: given e-mail address domain (${data.hd}) does not match '${RESTRICT_DOMAIN}'` };

    // create user
    return await withUser(async (repo): Promise<{ ok: boolean; id: string; admin?: boolean }> => {
        await repo.createIndex();
        const admin = ADMIN_EMAILS.includes(data.email);

        // check if user already exists -> log in
        const user = await repo.search().where('email').equals(data.email).and('admin').eq(admin).returnFirst();
        if (user !== null) return { ok: true, id: user.entityId, admin };

        const en = repo.createEntity({
            name: data.name,
            email: data.email,
            picture: data.picture,
            class: getClass(data.email),
            admin,
            block1: null,
            block2: null,
            donedate: null,
            done: false,
        });

        const id = await repo.save(en);

        console.log(`CREATE USER ${id}`);

        // else create record in database
        return { ok: true, id, admin };
    });
};
