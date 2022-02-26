// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserInfo } from '../../../lib/google-api/auth';

/**
 * This is the endpoint google sign-in redirects to
 * The URL parameters look as the following:
 * http://localhost:3000/auth/redirect?code=4/0AX4XfWi3-OGLsNtLniEVIhtbF-tjlJsw_TZDC63-qoVizG2t1C-XrAoRyTtDlwG7mryJEA&scope=profile%20https://www.googleapis.com/auth/userinfo.profile
 * The code and scope variables are used to retrieve profile information using google's api
 * Returned values are: email address, username, profile image (and basically anything that is publicly available)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code, scope, error } = req.query;

    if (code) {
        const data = await getUserInfo(typeof code == 'string' ? code : code[0]);
        console.log(data);
    }

    res.status(200).send('OK');
}
