import type { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../lib/server/database/redis';

/**
	 * This endpoint is used to fetch the user's own data (displayed in the navbar)
 */
 export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	     await connect(); 
	     res.status(200).send('heheheha');
 }
