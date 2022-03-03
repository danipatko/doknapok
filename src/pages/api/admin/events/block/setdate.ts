import { NextApiRequest, NextApiResponse } from 'next';
import { settings } from '../../../../../lib/server/util';
import { getUser } from '../../../../../lib/server/google-api/token';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != 'POST') {
        res.status(404).send('not found');
        return;
    }

    // admin check
    if (!(await getUser(req, res, 'admin'))) {
        res.status(403).send('unauthorized');
        return;
    }

    const { block, from, to } = JSON.parse(req.body);

    if (!(block !== undefined && from && to && from.match(/^\d{2}\:\d{2}$/gm) && to.match(/^\d{2}\:\d{2}$/gm))) {
        res.status(404).send('not found');
        return;
    }

    if (block) settings.setBlock1Time(from, to);
    else settings.setBlock2Time(from, to);

    res.status(200).json({ ok: true });
}
