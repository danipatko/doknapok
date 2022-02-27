// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from './auth/token';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = await getUser(req, res);

    if (!user) {
        res.send('not logged in');
        return;
    }

    res.status(200).send(user.entityData);
}
