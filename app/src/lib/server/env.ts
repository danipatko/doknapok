// host cannot be saved in dotenv, because frontend components are unable to see it
export const HOST = process.env.NODE_ENV === 'production' ? process.env.HOST ?? 'doknapok-beta.szlginfo.com' : 'localhost:3000';
export const REDIS_HOST = process.env.NODE_ENV === 'production' ? 'redis://redis:6379' : 'redis://127.0.0.1:6379';
export const origin = HOST.startsWith('localhost') ? `http://${HOST}` : `https://${HOST}`;
export const login = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.email%20https%3A//www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&response_type=code&redirect_uri=${origin}/api/auth/redirect&client_id=376810441368-i4c50kf9eha7217ctiir8eg32795ik9t.apps.googleusercontent.com`;
