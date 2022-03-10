import { NextApiRequest, NextApiResponse } from 'next';
import { withEvent } from '../../../../lib/server/database/redis';
import { getID } from '../../../../lib/server/google-api/token';

const UPDATE_FIELDS = ['title', 'description', 'guest', 'location', 'capacity', 'color'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // admin check
    if (!getID(req, res, 'admin')) {
        res.status(403).send('unauthorized');
        return;
    }

    const data = JSON.parse(req.body) as Record<string, string | number | boolean>;
    // no id or no field to update
    if (!data.id || Object.keys(data).length < 2) {
        res.status(400).send('Missing field from request');
        return;
    }

    await withEvent(async (repo) => {
        const en = await repo.fetch(data.id as string);
        for (const key in data) if (UPDATE_FIELDS.includes(key)) en.entityData[key] = data[key];
        return await repo.save(en);
    });

    res.status(200).json({ ok: true });
}
