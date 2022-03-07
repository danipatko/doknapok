export const host = process.env.HOST ?? 'localhost';
export const origin = process.env.HOST ? `https://${process.env.HOST}` : 'http://localhost';
export const login = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.email%20https%3A//www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&response_type=code&redirect_uri=${origin}/api/auth/redirect&client_id=376810441368-i4c50kf9eha7217ctiir8eg32795ik9t.apps.googleusercontent.com`;
