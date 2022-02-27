// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '../../../lib/server/google-api/auth';
import { setID } from './token';

/**
 * This is the endpoint google sign-in redirects to
 * A successful redirect has a code and scope field with the user's authorization token
 * An unsuccessful one will have an error key in the query
 * TODO: save the id in a cookie
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code, error } = req.query;

    if (!code || error) {
        res.send(`An error occured while redirecting from the authorization screen.\n${error}`);
        return;
    }

    const { ok, id } = await createUser(typeof code == 'string' ? code : code[0]);

    if (!ok) {
        res.send(`Failed to log in\n${id}`);
        return;
    }

    setID(id, req, res);

    res.status(200).send(`OK - ${id}`);
}
