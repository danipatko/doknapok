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

    const { date, time } = JSON.parse(req.body);
    if (!(date && time)) {
        res.status(400).send('missing field deadline in request body');
        return;
    }

    Settings.getInstance().setDeadline(date, time);
    res.status(200).json({ ok: true });
}
