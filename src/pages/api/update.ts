import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { withUser } from '../../lib/server/database/redis';
import { getID } from '../../lib/server/google-api/token';

export default async function updateUserEvent(req: NextApiRequest | IncomingMessage, res: NextApiResponse | ServerResponse, eventId: string) {
    const id = getID(req, res, 'user');
    if (!id) return null;
    const user = await withUser(async (repo) => {
        return await repo.fetch(id);
    });
    return (user.entityData.block1 = eventId);
}
