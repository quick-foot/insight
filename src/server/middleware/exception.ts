import { NextFunction, Request, Response } from 'express';
import { stringify } from 'querystring';
import { URL } from 'url';
import { InvalidRequestResponse } from '../../@types/exception';
import { InvalidRequestError } from '../utils/invalid-request-error';
import { getBaseUrl } from '../utils/url';

export function exceptionMiddleware(
    error: unknown,
    request: Request,
    response: Response,
    _: NextFunction
) {
    console.error(error);

    const isAjax =
        request.xhr || (request.headers.accept && ~request.headers.accept.indexOf('json'));

    const message =
        error instanceof InvalidRequestError
            ? error.message
            : 'Internal server error occurred. Please try again later.';

    const result: InvalidRequestResponse = { isSuccess: false, message };

    if (isAjax) {
        response.status(500).send(result);

        return;
    }

    const referer = request.get('Referer');
    const redirectUrl = referer || getBaseUrl(request);
    const url = new URL(redirectUrl);

    url.search = stringify(result);

    response.redirect(url.href);
}
