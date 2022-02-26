import { withUser } from '../database/redis';

const RESTRICT_DOMAIN: string | undefined = 'szlgbp.hu';

/**
 * This function is used to retrieve an access token from the user's authorization token and the application's client secret
 */
export const fetchAccessToken = async (
    code: string
): Promise<undefined | { access_token: string; scope: string; id_token: string; token_type: string }> => {
    // return if process.env isn't working
    if (!(process.env.CLIENT_ID && process.env.CLIENT_SECRET)) {
        console.error('Error retrieving access token: client id or client secret is not present in .env file');
        return;
    }

    const URL = `https://oauth2.googleapis.com/token?${new URLSearchParams({
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: 'http://localhost:3000/api/auth/redirect',
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

export const fetchUserInfo = async (creds: {
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
 * Returns the id of the user or an error message
 */
export const createUser = async (code: string): Promise<{ ok: boolean; id: string }> => {
    const creds = await fetchAccessToken(code);
    if (!creds) return { ok: false, id: 'Failed to fetch access token' };

    const data = await fetchUserInfo(creds);
    if (!data) return { ok: false, id: 'Failed to fetch user information' };

    if (RESTRICT_DOMAIN && data.hd != RESTRICT_DOMAIN)
        return { ok: false, id: `Error: given e-mail address domain (${data.hd}) does not match '${RESTRICT_DOMAIN}'` };

    // TODO: check if email belongs to a teacher

    // create user
    return await withUser(async (repo): Promise<{ ok: boolean; id: string }> => {
        // 01FWVFEEX1JF1FWPKNPZAHFF7T
        await repo.createIndex();
        // check if user already exists
        const user = await repo.search().where('email').equals(data.email).returnFirst();
        console.log(user);
        if (user !== null) return { ok: true, id: user.entityId };

        const en = repo.createEntity({
            name: data.name,
            email: data.email,
            picture: data.picture,
            class: getClass(data.email),
            event_1_enrolled: null,
            event_1_id: null,
            event_2_enrolled: null,
            event_2_id: null,
        });

        const id = await repo.save(en);

        // else create record in database
        return { ok: true, id };
    });
};

/**
 * Utility function to get the year when the school started
 * (eg. 2022-2-2 started in 2021 but 2022-9-5 starts in 2022)
 */
const schoolYear = (date: Date) => {
    return date.getFullYear() - (date.getMonth() < 6 ? 1 : 0);
};

/**
 * Fetch the class in a string format
 */
const getClass = (email: string): string | null => {
    const match = /\.(.{2,3})@/gm.exec(email);
    if (!match) {
        console.log(`Error: invalid e-mail address (class pattern not found)`); // Debug
        return null;
    }

    const evfolyam = schoolYear(new Date()) - 2000 - parseInt(match[1].substring(0, 2)) + 8;
    return `${evfolyam < 9 ? 'NY' : evfolyam}${match[1][2]}`;
};
