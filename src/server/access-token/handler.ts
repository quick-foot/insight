import { NextFunction, Request, Response } from 'express';
import { URL, URLSearchParams } from 'url';
import { ICallbackResponse } from '../../@types/auth';
import { env } from '../utils/env';
import { InvalidRequestError } from '../utils/invalid-request-error';
import { getBaseUrl } from '../utils/url';
import { accessTokenService } from './access-token.service';

export const handler = async (request: Request, response: Response, next: NextFunction) => {
    if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
        const error = new Error(
            `Environment variables 'GITHUB_CLIENT_ID' and 'GITHUB_CLIENT_SECRET' must be set.`
        );

        next(error);

        return;
    }

    if (!request.session) {
        next(new Error('Could not find session object.'));

        return;
    }

    const { code, state } = request.query;

    // Compare the state to ensure we received a valid response.
    if (
        state === undefined ||
        request.session.state === undefined ||
        state !== request.session.state
    ) {
        next(new InvalidRequestError('Attempted to login with an invalid state.'));

        return;
    }

    request.session = undefined;

    const accessToken = await accessTokenService.getAccessToken(code, state);
    const user = await accessTokenService.getUser(accessToken);

    const queryParams: ICallbackResponse = {
        id: user.id,
        login: user.login,
        name: user.name,
        avatar: user.avatarUrl,
        accessToken
    };

    const params = new URLSearchParams(queryParams);
    const referer = request.get('Referer');
    const redirectUrl = referer || getBaseUrl(request);
    const url = new URL(redirectUrl);

    url.search = params.toString();

    response.redirect(url.href);
};
