import { NextFunction, Request, Response } from 'express';

/**
 * Wraps the async handler in another promise that handles any uncaught exceptions.
 * This allows express to handle the errors and expose them to the app.
 * @param route
 */
export function handleErrors(
    route: (request: Request, response: Response, next: NextFunction) => Promise<void>
) {
    return async (request: Request, response: Response, next: NextFunction) =>
        route(request, response, next).catch(next);
}
