## Doknapok
A simple web application for school, where students can enroll to events. Tech stack: NextJS, Redis, Nginx + Modsecurity WAF + OWASP-CRS, Docker.

## Running in development
Go to the app directory, install dependencies and run. Make sure to have a redis server listening on `redis://127.0.0.1:6379`.
```sh 
cd app/
npm i
npm run dev
```

## Running in production
Firstly, install docker-compose. From the project's root dir, build and run. The build process may take about 10-30 minutes depending on your machine, be patient, this is mainly caused by compiling modsecurity modules. After the first build, docker will use cache.
``` 
docker-compose build
docker-compose up
```
After an occasional update, restart with 
```sh
docker-compose up --build --no-deps --force-recreate app redis nginx
```

### Platforms:
Due to the hosting of the test server, redis is currently configured for **ARM**. It basically has a custom dockerfile where it imports its own config and precompiled modules. If you want to run it on an ARM, you don't need to change anything. If you're running on an x86 machine, replace build with `image: redislabs/redismod` inside the `redis` service in the compose file. 
```yml
services:
    # ...
    redis:
        image: redislabs/redismod
        ports:
            - '6379:6379'
        expose:
            - 6379
```

## Environment
In both development and in production, you'll need a `.env.local` file in the app/ directory with the following fields in order to make google login and json webtokens work. 
```
CLIENT_ID=<client id>.apps.googleusercontent.com
CLIENT_SECRET=<google client secret>
DB_HOST=redis://127.0.0.1:6379/
JWT_SECRET=<your secret>
HOST=localhost:3000
```
