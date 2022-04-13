![](https://img.shields.io/badge/Build%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiesitftung%20Berlin-blue) ![Node.js CI](https://github.com/technologiestiftung/tsb-trees-api-user-management/workflows/Node.js%20CI/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/technologiestiftung/tsb-trees-api-user-management/badge.svg?branch=master)](https://coveralls.io/github/technologiestiftung/tsb-trees-api-user-management?branch=master) [![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)

# Giessdenkiez.de User Management API

vercel + auth0 management api for giessdenkiez.de To be able to manage user data and delete users.

## Setup

In your Auth0 tenant create a new machine to machine application. Select the "Auth0 Management API" to authorize this new api to. As permissions make sure to select at least read:users and delete:users.

When done you should have example code to obtain an access token from Auth0 to communicate with this API and allow communication with the management API.

Install all the dependencies:

```bash
npm ci
```

Connect to your vercel account

```bassh
npx vercel login
```

Deploy your application to vercel.com

```bash
npx vercel
```

To function correctly you will have to add some environment variables to your vercel project. See the `.env.sample` file for the values you need. Each one needs to be added using the `vercel secrets` command. Use `npx vercel secrets --help` for more info on this command.

```bash
npx vercel secrets add <name> <value>
```

Now deploy your application again to with woring credentials.

## Endpoints

The API has two endpoints. One for healthcheck and one for user management. The second one allows OPTIONS, GET and DELETE requests.

```http
### healthcheck

GET <API URL>/api

### options

OPTIONS <API URL>/api/user

### get user by id

GET <API URL>/api/user?userid=<auth0 user id>
Authorization: Bearer <ACCESS TOKEN>

### delete user by id

DELETE <API URL>/api/user?userid=<auth0 user id>
Authorization: Bearer <ACCESS TOKEN>
```

## Development

Run `npx vercel dev` to start a local development server.

## Tests

```bash
npm t
# or
npm run test:watch
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://fabianmoronzirfas.me/"><img src="https://avatars.githubusercontent.com/u/315106?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Fabian Morón Zirfas</b></sub></a><br /><a href="https://github.com/technologiestiftung/tsb-trees-api-user-management/commits?author=ff6347" title="Documentation">📖</a></td>
    <td align="center"><a href="https://vogelino.com/"><img src="https://avatars.githubusercontent.com/u/2759340?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Lucas Vogel</b></sub></a><br /><a href="https://github.com/technologiestiftung/tsb-trees-api-user-management/commits?author=vogelino" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Credits

<table>
  <tr>
    <td>
      Made by <a src="https://citylab-berlin.org/de/start/">
        <br />
        <br />
        <img width="200" src="https://citylab-berlin.org/wp-content/uploads/2021/05/citylab-logo.svg" />
      </a>
    </td>
    <td>
      A project by <a src="https://www.technologiestiftung-berlin.de/">
        <br />
        <br />
        <img width="150" src="https://citylab-berlin.org/wp-content/uploads/2021/05/tsb.svg" />
      </a>
    </td>
    <td>
      Supported by <a src="https://www.berlin.de/rbmskzl/">
        <br />
        <br />
        <img width="80" src="https://citylab-berlin.org/wp-content/uploads/2021/12/B_RBmin_Skzl_Logo_DE_V_PT_RGB-300x200.png" />
      </a>
    </td>
  </tr>
</table>
