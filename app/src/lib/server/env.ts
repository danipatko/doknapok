// host cannot be saved in dotenv, because frontend components are unable to see it
export let host = 'localhost:3000';
export const origin = host.startsWith('localhost') ? `http://${host}` : `https://${host}`;
export const login = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.email%20https%3A//www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&response_type=code&redirect_uri=${origin}/api/auth/redirect&client_id=376810441368-i4c50kf9eha7217ctiir8eg32795ik9t.apps.googleusercontent.com`;
