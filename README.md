### SQL TypeORM 

### Installation


`npm install`

### Running

This project requires docker or a local MySQL installation.  If using a local MySQL database, see `app.module.ts` for credentials, and make sure there are matching credentials in the database and the source code.

#### Docker

There is a `docker-compose.yml` file for starting Docker.

`docker-compose up`

After running the sample, you can stop the Docker container with

`docker-compose down`

### Run the sample

Then, run Nest as usual:

`npm run start`

For API Documentation
`http://localhost:3000/api#/`

Fill database with faker data
- in infrastructure/seeders/index.ts
- décommenter les lignes puis enrégistre
- commenter ensuite les lignes

