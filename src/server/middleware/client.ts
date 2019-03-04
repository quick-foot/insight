import { Request, Response } from 'express';
import { resolve } from 'path';

const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg'];
const resolvePath = (file: string) => resolve(`build/client/${file}`);

export function clientMiddleware(request: Request, response: Response, next: Function) {
    const { originalUrl } = request;

    // Ignore the api.
    if (~originalUrl.indexOf('/api')) {
        next();

        return;
    }

    // Resolve any files requested by the client.
    if (allowedExt.filter(ext => originalUrl.indexOf(ext) > 0).length > 0) {
        response.sendFile(resolvePath(originalUrl));

        return;
    }

    // Send the index.html.
    response.sendFile(resolvePath('index.html'));
}
