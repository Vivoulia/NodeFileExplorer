# NodeFileExplorer

Nodejs and VueJs File explorer

## Deployment

-------------

### 1. Using Docker

> **Note:** You need docker-compose

To start all 2 containers and having the reverse proxy listening on port 80:

```console
docker-compose up -d
```

It create 2 dockers:

- server: the core [node.js](https://www.nodejs.org) server.

> **Note:** the folder to share is defined on .env file

- reverse-proxy: A nginx reverse-proxy.

> **Note:** the port is defined on .env file

### 2. Using nodejs

Install [npm](https://docs.npmjs.com/getting-started/what-is-npm) dependences :

    npm install

Start the serveur:

    npm run

#### Configuration

##### Port:

You can change the $PORT environment variable (defaut: 3000)

    env PORT=80

##### Folder to share

You can change the $FOLDER environment variable (defaut: ./share)

    env FOLDER=/path/to/the/folder
