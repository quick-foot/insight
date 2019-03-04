[![Build Status](https://travis-ci.com/quick-foot/insight.svg?branch=master)](https://travis-ci.com/quick-foot/insight)

# Insight

A tool for gathering useful insights about GitHub

### Getting Started

#### Global Dependencies

Install the following dependencies globally

```
npm i -g @angular/cli
npm i -g now
npm i -g conventional-changelog-cli
npm i -g typescript@3.2.2
```

#### Recommended Extensions

Please install the recommended extensions in Visual Studio Code.

This includes:

* Angular Language Service
* Angular BeastCode Snippets
* Prettier
* TSLInt
* npm
* Apollo GraphQL

#### Apollo GraphQL

1. Install
   [Apollo GraphQL](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo)
   VS Code Extension
2. Generate a new personal access token at: https://github.com/settings/tokens
3. Create a new file in the root folder named `apollo.config.js`
4. Add the following code, replacing token with your personal access token

```js
module.exports = {
    client: {
        service: {
            name: 'github',
            url: 'https://api.github.com/graphql',
            headers: {
                authorization: 'Bearer token'
            }
        }
    }
};
```

#### Environment Variables

Create an `.env` file in the root folder and add the following variables.

Replace the values with your own, and change `NODE_ENV`

```
GITHUB_CLIENT_ID=client_id
GITHUB_CLIENT_SECRET=client_id
COOKIE_NAME=any_cookie_name
COOKIE_SECRET=a_cookie_secret
COOKIE_KEY=a_cookie_key
NODE_ENV=development
```

To setup your production environment variable, set them inside `now` using the
below, replace value with your actual production values.

```
now secret add github-client-id value
now secret add github-client-secret value
now secret add cookie-name value
now secret add cookie-secret value
now secret add cookie-key value
```

### Development

1. Run `npm i`
2. Run the client `npm run build:watch`
3. Run the server `npm run server:watch`
4. Navigate to http://localhost:3000

#### Sanity Checks

Use the following commands for general health checks on code

* To lint the project `npm run lint`
* To run tests `npm run test`
* To run e2e tests `npm run e2e`
* To run the coverage report `npm run coverage`

### Deployment

Run `npm run deploy` which will:

* Build the client
* Build the server
* Deploy a new build to `now`
* Alias it with the domain name
* Remove previous deployments

### Releasing

Run `npm version [major, minor or patch]`

This will automatically increment the version, update the changelog, and push the commits and tags to Github.
