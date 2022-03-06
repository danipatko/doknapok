import { NextApiRequest, NextApiResponse } from 'next';
import { withUser } from '../../lib/server/database/redis';
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

    const { block } = JSON.parse(req.body);

    if (block === undefined) {
        res.status(400).send('bad request');
        return;
    }

    // check deadline
    if (new Date().getTime() > settings.preset.deadline) {
        res.json({ error: `A jelentkezés véget ért.` });
        return;
    }

    // update
    await withUser(async (repo) => {
        user.entityData[block ? 'block1' : 'block2'] = '';
        repo.save(user);
    });

    res.status(200).json({ ok: true });
}
