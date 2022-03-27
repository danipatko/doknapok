import { NextApiRequest, NextApiResponse } from 'next';
import { Settings } from '../../../../../lib/server/util';
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

    const { block, start, end } = JSON.parse(req.body);
    if (!(block !== undefined && start && end && start.match(/^\d{2}\:\d{2}$/gm) && end.match(/^\d{2}\:\d{2}$/gm))) {
        res.status(404).send('not found');
        return;
    }

    if (block) Settings.getInstance().setBlock1Time(start, end);
    else Settings.getInstance().setBlock2Time(start, end);

    res.status(200).json({ ok: true });
}
