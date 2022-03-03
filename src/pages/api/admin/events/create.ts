import { NextApiRequest, NextApiResponse } from 'next';
import { IEventEntity, withEvent } from '../../../../lib/server/database/redis';
import { getID } from '../../auth/token';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // admin check
    if (!getID(req, res, 'admin')) {
        res.status(403).send('Unauthorized');
        return;
    }

    const { title, description, guest, location, color, capacity, block } = JSON.parse(req.body);

    // bad request
    if (!(title && description && guest && location && color && capacity && block)) {
        res.status(400).send('Missing field from request');
        return;
    }

    // create event object in database
    res.status(200).json(
        await withEvent(async (repo): Promise<{ ok: boolean; error?: string }> => {
            await repo.createIndex();
            const occupied = await repo.search().where('location').eq(`${location}`.trim()).first();
            if (occupied) return { ok: false, error: `A(z) '${location}' helyszínre már a(z) ${occupied.entityData.title} be van szervezve` };

            await repo.createAndSave({
                title,
                description,
                guest,
                location,
                color,
                capacity,
                occupied: 0,
                block,
            });

            return { ok: true };
        })
    );
}
