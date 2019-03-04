import { Request } from 'express';
import { format } from 'url';

export function getOriginalUrl(request: Request) {
    const url = format({
        protocol: request.protocol,
        host: request.get('host'),
        pathname: request.originalUrl
    });

    return url;
}

export function getBaseUrl(request: Request) {
    const url = format({
        protocol: request.protocol,
        host: request.get('host')
    });

    return url;
}
