import axios from 'axios';
import { env } from '../utils/env';

interface AccessTokenParams {
    client_secret: string;
    client_id: string;
    state: string;
    code: string;
}

interface User {
    id: string;
    login: string;
    name: string;
    avatarUrl: string;
}

interface UserQueryResponse {
    viewer: User;
}

interface QueryResult<T> {
    data: T;
}

class AccessTokenService {
    private readonly githubUrl = 'https://api.github.com/graphql';

    public async getAccessToken(code: string, state: string) {
        const params: AccessTokenParams = {
            client_id: <string>env.GITHUB_CLIENT_ID,
            client_secret: <string>env.GITHUB_CLIENT_SECRET,
            code,
            state
        };

        const headers = { accept: 'application/json' };

        const result = await axios.post('https://github.com/login/oauth/access_token', params, {
            headers
        });

        return result.data.access_token;
    }

    public async getUser(accessToken: string) {
        const query = `
            query {
                viewer {
                    id
                    login
                    name
                    avatarUrl
                }
            }
        `;

        const user = await this.query<UserQueryResponse>(query, accessToken);

        return user.viewer;
    }

    private async query<T>(query: string, accessToken: string) {
        const headers = {
            Authorization: `token ${accessToken}`
        };

        const result = await axios.post<QueryResult<T>>(this.githubUrl, { query }, { headers });

        return result.data.data;
    }
}

export const accessTokenService = new AccessTokenService();
