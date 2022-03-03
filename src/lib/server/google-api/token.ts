import jwt from 'jsonwebtoken';
import { getCookie, setCookies } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserEntity, withUser } from '../database/redis';
import { IncomingMessage, ServerResponse } from 'http';

// how long can an authenticated user stay logged in
const AUTH_TIME_SEC = 60 * 60 * 24 * 7;
const AUTH_TIME_STR = '7d';

/**
 * Get the user ID from a request (if any)
 * @param restrict the admin's session key differs from the user's, specify if route is only admin accessible
 */
export const getID = (
    req: NextApiRequest | IncomingMessage,
    res: NextApiResponse | ServerResponse,
    restrict: 'admin' | 'user' | 'any' = 'user'
): string | undefined => {
    if (!process.env.JWT_SECRET) return;
    const token = getCookie('token', { req, res }) as string | undefined;
    if (!token) return;

    const payload = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
    return restrict == 'user' ? payload.id : restrict == 'admin' ? payload.ad : payload.id ?? payload.ad;
};

/**
 * Sign a JWT token with the user ID
 */
export const setID = (id: string, admin: boolean, req: NextApiRequest, res: NextApiResponse): void => {
    if (!process.env.JWT_SECRET) return;
    const token = jwt.sign(admin ? { ad: id } : { id }, process.env.JWT_SECRET, { expiresIn: AUTH_TIME_STR });
    setCookies('token', token, { req, res, maxAge: AUTH_TIME_SEC });
};

/**
 * Get user or admin data from session
 */
export const getUser = async (
    req: NextApiRequest | IncomingMessage,
    res: NextApiResponse | ServerResponse,
    admin: 'admin' | 'user' | 'any' = 'user'
): Promise<UserEntity | null> => {
    const id = getID(req, res, admin);
    if (!id) return null;

    return await withUser(async (repo) => await repo.fetch(id));
};
