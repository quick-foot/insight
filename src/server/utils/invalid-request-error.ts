import { InvalidRequestResponse } from '../../@types/exception.d';

export class InvalidRequestError extends Error implements InvalidRequestResponse {
    public isSuccess = false;

    constructor(public message: string) {
        super(message);

        // Typescript does not set prototype when extended. Need to manually fix.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, InvalidRequestError.prototype);
    }
}
