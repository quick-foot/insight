import cookieSession from 'cookie-session';
import { env } from '../utils/env';

const options: CookieSessionInterfaces.CookieSessionOptions = {
    name: env.COOKIE_NAME,
    keys: [<string>env.COOKIE_KEY],
    secret: env.COOKIE_SECRET,
    secure: env.NODE_ENV === 'production',
    httpOnly: env.NODE_ENV === 'production'
};

const sessionMiddleware = cookieSession(options);

export { sessionMiddleware };
