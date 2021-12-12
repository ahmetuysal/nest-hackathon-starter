# Nest Hackathon Starter <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" height="28px" alt="Nest Logo"/></a>

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

This project contains boilerplate for creating APIs using [Nest](https://nestjs.com), a progressive [Node.js](http://nodejs.org) framework for building efficient and scalable server-side applications.

It is mostly built to be used as a starting point in hackathons and implements common operations such as sign up, JWT authentication, mail validation, model validation and database access.

You can also look at my [Angular Hackathon Starter](https://github.com/ahmetuysal/angular-hackathon-starter) template that shares the same contract with this API.

## Features

1. **PostgreSQL with Prisma**

2. **JWT Authentication**

3. **Mail Verification**

4. **Mail Change**

5. **Password Reset**

6. **Request Validation**

7. **Customizable Mail Templates**

8. **Swagger API Documentation**

9. **Security Techniques**

10. **Logger**

## Getting Started

### Installation

1. Make sure that you have [Node.js](https://nodejs.org)(>= 10.13.0, except for v13) installed.
2. Clone this repository by running `git clone https://github.com/ahmetuysal/nest-hackathon-starter.git <YOUR_PROJECT_NAME>` or [directly create your own GitHub repository using this template](https://github.com/ahmetuysal/nest-hackathon-starter/generate).
3. Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.
4. Run `yarn` to install dependencies.

### Configuration Files

#### [Prisma](https://github.com/prisma/prisma) Configurations

This template uses Postgres by default. If you want to use another database, follow instructions in the [official Nest recipe on Prisma](https://docs.nestjs.com/recipes/prisma).

If you wish to use another database you will also have to edit the connection string on [`prisma/.env`](prisma/.env) file accordingly.

Template includes three different environment options by default. Most of the time you will use the `local`
environment when developing and `production` environment on production. You will need to fill out corresponding
environment files in [`env`](env) directory.

```dosini
DATABASE_HOST=__YOUR_DATABASE_URL__
DATABASE_PORT=5432
DATABASE_USERNAME=__YOUR_USERNAME__
DATABASE_PASSWORD=__YOUR_PASSWORD__
DATABASE_NAME=__YOUR_DATABASE__
```

#### JWT Configurations

A secret key is needed in encryption process. Generate a secret key using a service like [randomkeygen](https://randomkeygen.com/).

Enter your secret key to [`config.ts`](src/config.ts) file. You can also the change expiration time, default is 86400 seconds(1 day).

```js
  jwt: {
    secretOrKey: '__JWT_SECRET_KEY__',
    expiresIn: 86400,
  },
```

#### [NodeMailer✉️](https://github.com/nodemailer/nodemailer) Configurations

A delivery provider is required for sending mails with Nodemailer. I mostly use [SendGrid](https://sendgrid.com) to send mails, however, Nodemailer can work with any service with SMTP transport.

To get a SendGrid API key:

- Create a free account from [https://signup.sendgrid.com/](https://signup.sendgrid.com/)
- Confirm your account via the activation email and login.
- Create an API Key with mail sending capability.

Enter your API key and sender credentials to [`config.ts`](src/config.ts) file. Sender credentials are the sender name and sender mail that will be seen by your users.

```js
mail:
    service: {
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      user: 'apikey',
      pass: '__SENDGRID_API_KEY__',
    },
    senderCredentials: {
      name: '__SENDER_NAME__',
      email: '__SENDER_EMAIL__',
    },
  },
```

#### Mail Template Configurations

Mail templates are highly customizable and heavily depend on configurations. Enter your project's information to [`config.ts`](src/config.ts). Urls are used as references in the templates. If your mail verification logic is independent from your front-end application, you can use API's own mail verification endpoint, e.g. `http://localhost:3000/auth/verify`, as `mailVerificationUrl`. Otherwise, send a HTTP `GET` request to verification endpoint with token added as a parameter named token, e.g, `http://localhost:3000/auth/verify?token=__VERIFICATION_TOKEN__`

```js
 project: {
    name: '__YOUR_PROJECT_NAME__',
    address: '__YOUR_PROJECT_ADDRESS__',
    logoUrl: 'https://__YOUR_PROJECT_LOGO_URL__',
    slogan: 'Made with ❤️ in Istanbul',
    color: '#123456',
    // You can enter as many social links as you want
    socials: [
      ['GitHub', '__Project_GitHub_URL__'],
      ['__Social_Media_1__', '__Social_Media_1_URL__'],
      ['__Social_Media_2__', '__Social_Media_2_URL__'],
    ],
    url: 'http://localhost:4200',
    mailVerificationUrl: 'http://localhost:3000/auth/verify',
    mailChangeUrl: 'http://localhost:3000/auth/change-email',
    resetPasswordUrl: 'http://localhost:4200/reset-password',
    termsOfServiceUrl: 'http://localhost:4200/legal/terms',
  },
```

### Migrations

Please refer to the official [Prisma Migrate Guide](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate) to get more info about Prisma migrations.

```bash
# generate migration for local environment
$ yarn migrate:dev:create
# run migrations in local environment
$ yarn migrate:dev

# deploy migration to prod environment
$ yarn migrate:deploy:prod
```

### Running the app

```bash
# development mode
$ yarn start:dev

# production
$ yarn build
$ yarn start:prod
```

### Running the tests

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/ahmetuysal"><img src="https://avatars.githubusercontent.com/u/26417668?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ahmet Uysal</b></sub></a><br /><a href="https://github.com/ahmetuysal/nest-hackathon-starter/commits?author=ahmetuysal" title="Code">💻</a> <a href="https://github.com/ahmetuysal/nest-hackathon-starter/commits?author=ahmetuysal" title="Documentation">📖</a> <a href="https://github.com/ahmetuysal/nest-hackathon-starter/commits?author=ahmetuysal" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://dnlytras.com"><img src="https://avatars.githubusercontent.com/u/4951004?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dimitrios Lytras</b></sub></a><br /><a href="https://github.com/ahmetuysal/nest-hackathon-starter/commits?author=dimitrisnl" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Support Nest

Nest is an MIT-licensed open source project. If you'd like to join support Nest, please [read more here](https://docs.nestjs.com/support).

## License

Licenced under [MIT License](LICENSE). Nest is also MIT licensed.
