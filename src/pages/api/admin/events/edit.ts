import { NextApiRequest, NextApiResponse } from 'next';
import { withEvent } from '../../../../lib/server/database/redis';
import { getID } from '../../auth/token';

const UPDATE_FIELDS = ['title', 'description', 'guest', 'locaiton', 'capacity', 'color'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // admin check
    if (!getID(req, res, 'admin')) {
        res.status(403).send('unauthorized');
        return;
    }

    const data = JSON.parse(req.body);

    // no id or no field to update
    if (!data.id || Object.keys(data).length < 2) {
        res.status(400).send('Missing field from request');
        return;
    }

    res.status(200).json({
        id: await withEvent(async (repo) => {
            const en = await repo.fetch(data.id);
            for (const key in data) if (UPDATE_FIELDS.includes(key)) en.entityData[key] = data[key];
            return await repo.save(en);
        }),
    });
}
