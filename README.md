# Hotspot-Backend

# Postman

URL: https://app.getpostman.com/join-team?invite_code=df544e2521072a168189b0fb3edf3b7f&target_code=0690e8d59ff0743775cb1d77893540cf

Username: `emiliaup`

Pswrd: `9q9pFtCz3OdajkyX`

## Para correr local

Para correr el back:
```sh
npm run dev
```

Para resetear el back mientras esta corriendo pongan `rs` en el terminal

Se requiere la variable `PORT` en el `.env` (eg. `PORT=3001`)

Se requiere el URL de la BDD en `CONNECTION_MONGO`.
Hay una bdd deployeada online.
Se puede correr una local con el comando:

```sh
docker run --name mongodb -d -p 27017:27017 mongodb/mongodb-community-server:6.0-ubi8
```

Y el siguiente valor para `CONNECTION_MONGO`:

```sh
CONNECTION_MONGO = 'mongodb://localhost:27017/'
```