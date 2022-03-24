import { NextApiRequest, NextApiResponse } from 'next';
import { exists, withEvent, withUser } from '../../lib/server/database/redis';
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

    const { id, block } = JSON.parse(req.body);
    if (!(id && block !== undefined)) {
        res.status(400).send('bad request');
        return;
    }

    // check deadline
    if (Date.now() > settings.preset.deadline) {
        res.json({ error: `A jelentkezés véget ért.` });
        return;
    }

    // fetch and check event
    const evt = await withEvent((repo) => repo.fetch(id));

    if (!Object.keys(evt.entityData).length) {
        res.status(404).send('not found');
        return;
    }

    if (evt.entityData.occupied >= evt.entityData.capacity) {
        res.json({ error: `Ez a program már betelt.` });
        return;
    }

    // increment occupied
    const occ = await withUser((repo) => repo.search().where('block1').eq(id).or('block2').eq(id).count());
    evt.entityData.occupied = occ + 1;
    await withEvent((repo) => repo.save(evt));

    // update
    await withUser(async (repo) => {
        user.entityData[block ? 'block1' : 'block2'] = id;
        if (user.entityData.block1 && user.entityData.block2) {
            user.entityData.done = true;
            user.entityData.donedate = Date.now();
        }
        await repo.save(user);
    });

    res.status(200).json({ ok: true });
}
