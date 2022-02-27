import jwt from 'jsonwebtoken';
import { getCookie, setCookies } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserEntity, withUser } from '../../../lib/server/database/redis';

// how long can an authenticated user stay logged in
const AUTH_TIME_SEC = 60 * 60 * 24 * 7;
const AUTH_TIME_STR = '7d';

/**
 * Get the user ID from a request (if any)
 */
export const getID = (req: NextApiRequest, res: NextApiResponse): string | undefined => {
    if (!process.env.JWT_SECRET) return;
    const token = getCookie('token', { req, res }) as string | undefined;
    if (!token) return;
    return (jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload).id;
};

/**
 * Sign a JWT token with the user ID
 */
export const setID = (id: string, req: NextApiRequest, res: NextApiResponse): void => {
    if (!process.env.JWT_SECRET) return;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: AUTH_TIME_STR });

    setCookies('token', token, { req, res, maxAge: AUTH_TIME_SEC });
};

/**
 * Get user data from session
 */
export const getUser = async (req: NextApiRequest, res: NextApiResponse): Promise<UserEntity | null> => {
    const id = getID(req, res);
    if (!id) return null;
    return await withUser(async (repo) => await repo.fetch(id));
};
