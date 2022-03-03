import { NextApiRequest, NextApiResponse } from 'next';
import { withEvent } from '../../../../lib/server/database/redis';
import { getID } from '../../../../lib/server/google-api/token';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // admin check
    if (!getID(req, res, 'admin')) {
        res.status(403).send('unauthorized');
        return;
    }

    const { id } = JSON.parse(req.body);

    // bad request
    if (!id) {
        res.status(400).send('Missing field from request');
        return;
    }

    await withEvent(async (repo) => {
        await repo.remove(id);
    });

    res.status(200).send('success');
}
