import { NextFunction, Request, Response } from 'express';
import { stringify } from 'querystring';
import { v4 as uuid } from 'uuid';
import { env } from '../utils/env';

interface AuthorizeParams {
    client_id: string;
    state: string;
}

export const handler = (request: Request, response: Response, next: NextFunction) => {
    const authorizeUrl = 'https://github.com/login/oauth/authorize';

    if (!env.GITHUB_CLIENT_ID) {
        next(new Error(`Environment variable 'GITHUB_CLIENT_ID' must be set.`));

        return;
    }

    if (!request.session) {
        next(new Error('Could not find session object.'));

        return;
    }

    request.session.state = uuid();

    const params: AuthorizeParams = {
        client_id: env.GITHUB_CLIENT_ID,
        state: request.session.state
    };

    const query = stringify(params);
    const url = `${authorizeUrl}?${query}`;

    response.redirect(url);
};
