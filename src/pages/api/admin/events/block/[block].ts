import { NextApiRequest, NextApiResponse } from 'next';
import type { EntityData } from 'redis-om';
import { withEvent } from '../../../../../lib/server/database/redis';
import { settings } from '../../../../../lib/server/util';
import { getUser } from '../../../auth/token';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != 'GET') {
        res.status(404).send('not found');
        return;
    }

    // admin check
    if (!(await getUser(req, res, 'admin'))) {
        res.status(403).send('unauthorized');
        return;
    }

    let { block } = req.query;

    if (!block) {
        res.status(404).send('not found');
        return;
    }

    block = typeof block == 'string' ? block : block[0];

    res.status(200).json(
        await withEvent(async (repo): Promise<{ events: EntityData[]; date: { start: string; end: string } }> => {
            await repo.createIndex();
            return {
                events: (
                    await repo
                        .search()
                        .where('block')
                        .eq(block == '0')
                        .all()
                ).map((x) => {
                    return {
                        title: x.entityData.title,
                        guest: x.entityData.guest,
                        capacity: x.entityData.capacity,
                        occupied: x.entityData.occupied,
                        location: x.entityData.location,
                        id: x.entityId,
                        color: x.entityData.color,
                    };
                }),
                date: block == '0' ? settings.block1 : settings.block2,
            };
        })
    );
}
