<p align="center" >
  <a href="https://riwi.io/" target="blank"><img src="https://riwi.io/wp-content/uploads/2023/07/Fondo-claro-logo.png" width="500" alt="RIWI Logo" /></a>
</p>
  <h1 align="center"> Riwi Challenge</h1>  


## Description

The goal is to implement a generic authentication API using NestJs, which will be consumed by the specific API of Riwi Shop, but can be consumed by any other API that desires to do so.

## Installation

To use this API on your local machine, please clone the repository and configure the necessary environment variables for the database and JWT.T

1. Clone the repository.

```bash
$ git clone https://github.com/manutorres93/riwi-ecommerce.git
$ cd rwi-ecommerce

```

2. Install the necessary dependencies.
```bash
$ npm install
# npm reads the package.json file in the project and looks for all the dependencies listed in it. Then, it downloads those dependencies from the npm registry.
```
 
 3. Copy the .env.example file into a new .env file on your local environment and configure the necessary variables. You can also copy the variables from here and paste it into your own .env file. You can modify the variables as you needed.

```bash
DB_NAME = name_of_database
DB_CONNECTION = mongodb://
DB_HOST = your_database_host
DB_USER =your_ database_user
DB_PASSWORD = your_database_password
DB_HOST_CLOUD= your_database_host_cloud
NODE_ENV= write_local_for_local_or_any_other_word_for_cloud
JWT_SECRET= write_jwt_secret
ACCESS_TOKEN_EXPIRY='10m'
PORT= your_port
```

You can also generate the JWT secret by using this command on your terminal, and then using it into yout .env file:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Postman resources

You can use the postman_collection.json file you can found into the docs folder to interact with this API, after importing the file into your postman application. Is also  publised in https://documenter.getpostman.com/view/24858364/2sA3JNafN8.

Probably if you are using the application for the first time, you won't have any user registrated and you won't be ablo to interact with the protected routes, then only for the first time you should comment line 14 from user.controllerts, create the new user with the role 'admin' and then uncommented it again. This way you will have at least one user registered as 'admin'.

## Swagger resources

You can use the swagger documentation following the next link: http://localhost:3000/api-documentation. Note that the port (3000) can change if you set a different one into your .env file.

Probably if you are using the application for the first time, you won't have any user registrated and you won't be ablo to interact with the protected routes, then only for the first time you should comment line 14 from user.controllerts, create the new user with the role 'admin' and then uncommented it again. This way you will have at least one user registered as 'admin'.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Manuela Torres](https://github.com/manutorres93)


## License

Nest is [MIT licensed](LICENSE).
