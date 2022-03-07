import { NextApiRequest, NextApiResponse } from 'next';
import stream from 'stream';
import { promisify } from 'util';
import { exists, withEvent, withUser } from '../../../../lib/server/database/redis';
import { getUser } from '../../../../lib/server/google-api/token';

const pipeline = promisify(stream.pipeline);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // admin check
    if (!getUser(req, res, 'admin')) {
        res.status(403).send('unauthorized');
        return;
    }

    const { id, separator } = req.query as { [key: string]: string };
    if (!(id && separator)) {
        res.status(400).send('Missing field from request');
        return;
    }

    const evt = await withEvent(async (repo) => repo.fetch(id));
    if (!Object.keys(evt.entityData).length) {
        console.log('does not exist');
        res.status(404).send('not found');
        return;
    }

    // generate CSV string
    const csv = await withUser(async (repo) =>
        (
            await repo.search().where('admin').eq(false).and('block1').eq(id).or('block2').eq(id).all()
        )
            .map((x) => {
                return `${x.entityData.name}${separator}${x.entityData.email}${separator}${x.entityData.class}`;
            })
            .join('\n')
    );

    res.setHeader('Content-Type', 'application/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${evt.entityData.title}.csv`);
    await pipeline(csv, res);
}
