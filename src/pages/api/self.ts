import type { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from './auth/token';

/**
 * This endpoint is used to fetch the user's own data (displayed in the navbar)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = await getUser(req, res, 'any');

    if (!user) {
        res.json({});
        return;
    }

    res.status(200).json(user.entityData);
}
