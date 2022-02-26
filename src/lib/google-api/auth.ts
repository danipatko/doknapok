/**
 * This function is used to retrieve an access token from the user's authorization token and the application's client secret
 * This api call should look as the following:
 *
 * ```POST /token HTTP/1.1
 * Host: oauth2.googleapis.com
 * Content-Type: application/x-www-form-urlencoded
 * code=4/P7q7W91a-oMsCeLvIaQm6bTrgtp7&
 * client_id=your_client_id&
 * client_secret=your_client_secret&
 * redirect_uri=https%3A//oauth2.example.com/code&
 * grant_type=authorization_code```
 *
 */
export const retrieveAccessToken = async (
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

interface User {
    id: string;
    email: string;
    name: string;
    picture: string;
    hd: string;
}

export const fetchUserInfo = async (creds: {
    access_token: string;
    scope: string;
    id_token: string;
    token_type: string;
}): Promise<
    | {
          id: string;
          email: string;
          name: string;
          picture: string;
          hd: string;
      }
    | undefined
> => {
    console.log(`Fetching user info from ${creds.scope}:\n Header: ${creds.token_type} ${creds.access_token}`);

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

export const getUserInfo = async (code: string): Promise<void> => {
    const creds = await retrieveAccessToken(code);
    if (!creds) return;

    const userData = await fetchUserInfo(creds);

    console.log(userData);

    // TODO: save in DB and set cookie
};
