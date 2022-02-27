import jwt from 'jsonwebtoken';
import { getCookie, setCookies } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserEntity, withAdmin, withUser } from '../../../lib/server/database/redis';

// how long can an authenticated user stay logged in
const AUTH_TIME_SEC = 60 * 60 * 24 * 7;
const AUTH_TIME_STR = '7d';

/**
 * Get the user ID from a request (if any)
 * @param admin the admin's session key differs from the user's, specify if route is only admin accessible
 */
export const getID = (req: NextApiRequest, res: NextApiResponse, admin: boolean = false): string | undefined => {
    if (!process.env.JWT_SECRET) return;
    const token = getCookie('token', { req, res }) as string | undefined;
    if (!token) return;
    return admin
        ? (jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload).ad
        : (jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload).id;
};

/**
 * Sign a JWT token with the user ID
 */
export const setID = (id: string, admin: boolean, req: NextApiRequest, res: NextApiResponse): void => {
    if (!process.env.JWT_SECRET) return;
    const token = jwt.sign(admin ? { id } : { ad: id }, process.env.JWT_SECRET, { expiresIn: AUTH_TIME_STR });

    setCookies('token', token, { req, res, maxAge: AUTH_TIME_SEC });
};

/**
 * Get user or admin data from session
 */
export const getUser = async (req: NextApiRequest, res: NextApiResponse, admin: boolean = false): Promise<UserEntity | null> => {
    const id = getID(req, res, admin);
    if (!id) return null;

    return admin ? await withAdmin(async (repo) => await repo.fetch(id)) : await withUser(async (repo) => await repo.fetch(id));
};
