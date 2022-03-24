import { NextApiRequest, NextApiResponse } from 'next';
import { eventNames } from 'process';
import { withEvent, withUser } from '../../lib/server/database/redis';
import { getUser } from '../../lib/server/google-api/token';
import { settings } from '../../lib/server/util';

export default async function updateUserEvent(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != 'POST') {
        res.status(404);
        return;
    }

    const user = await getUser(req, res, 'any');

    if (!user) {
        res.status(403).send('unauthorized');
        return;
    }

    const { block, id } = JSON.parse(req.body);

    if (block === undefined || !id) {
        res.status(400).send('bad request');
        return;
    }

    // check deadline
    if (Date.now() >= settings.preset.deadline) {
        res.json({ error: `A jelentkezés véget ért.` });
        return;
    }

    if (
        await withEvent(async (repo) => {
            const evt = await repo.fetch(id);
            // does not exist
            if (!Object.keys(evt.entityData).length) return true;
            // decrement occupied
            const occ = await withUser((repo) => repo.search().where('block1').eq(id).or('block2').eq(id).count());
            evt.entityData.occupied = occ - 1;
            await repo.save(evt);
            return false;
        })
    ) {
        res.json({ error: `Program nem található` });
        return;
    }

    // update
    await withUser(async (repo) => {
        user.entityData[block ? 'block1' : 'block2'] = '';
        user.entityData.done = false;

        await repo.save(user);
    });

    res.status(200).json({ ok: true });
}
