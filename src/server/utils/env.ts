export interface Environment extends NodeJS.ProcessEnv {
    GITHUB_CLIENT_ID?: string;
    GITHUB_CLIENT_SECRET?: string;
    COOKIE_NAME?: string;
    COOKIE_SECRET?: string;
    COOKIE_KEY?: string;
    NODE_ENV?: string;
}

/*
 * Clone process.env so we don't get the performance hit each time we access it.
 * https://github.com/nodejs/node/blob/v8.9.4/src/node.cc#L3017-L3045
 * Node drops down into C every time we access this which is expensive.
 */
export const env: Environment = { ...process.env };
