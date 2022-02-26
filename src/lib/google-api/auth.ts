/**
 * This function is used to retrieve an access token from the user's authorization token and the application's client secret
 * This api call should look as the following:
 *
 * ```
 * POST /token HTTP/1.1
 * Host: oauth2.googleapis.com
 * Content-Type: application/x-www-form-urlencoded
 * code=4/P7q7W91a-oMsCeLvIaQm6bTrgtp7&
 * client_id=your_client_id&
 * client_secret=your_client_secret&
 * redirect_uri=https%3A//oauth2.example.com/code&
 * grant_type=authorization_code```
 *
 */
export const retrieveAccessToken = async (code: string): Promise<void> => {
    // return if process.env isn't working
    if (!(process.env.CLIENT_ID && process.env.CLIENT_SECRET)) {
        console.error('Error retrieving access token: client id or client secret is not present in .env file');
        return;
    }

    const response = await fetch(
        `https://oauth2.googleapis.com/token?${new URLSearchParams({
            code: code,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: 'https%3A//localhost:3000/api/auth/redirect',
            grant_type: 'authorization_code',
        }).toString()}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );

    if (!response.ok) {
        console.log(`Error: resonse is not ok\n[${response.status}] ${response.statusText}`);
        return;
    }

    const data = await response.json();
    console.log(data);

    return data;
};
