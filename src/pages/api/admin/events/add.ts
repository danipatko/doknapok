import { NextApiRequest, NextApiResponse } from 'next';
import { IEventEntity, withEvent } from '../../../../lib/server/database/redis';
import { getID } from '../../auth/token';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // admin check
    if (!getID(req, res, 'admin')) {
        res.status(403).send('unauthorized');
        return;
    }

    const { title, description, guest, location, color, capacity } = JSON.parse(req.body);

    // bad request
    if (!(title && description && guest && location && color && capacity)) {
        res.status(400).send('Missing field from request');
        return;
    }

    // create event object in database
    res.status(200).json(
        await withEvent(async (repo): Promise<IEventEntity> => {
            return await repo.createAndSave({
                title,
                description,
                guest,
                location,
                color,
                capacity,
                occupied: 0,
            });
        })
    );
}
