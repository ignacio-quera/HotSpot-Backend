# Hotspot-Backend

# Postman

URL: https://app.getpostman.com/join-team?invite_code=df544e2521072a168189b0fb3edf3b7f&target_code=0690e8d59ff0743775cb1d77893540cf

Username: `emiliaup`

Pswrd: `9q9pFtCz3OdajkyX`

## Para correr local

Para correr el back:

```sh
npm install & npm run dev
```

Para resetear el back mientras esta corriendo pongan `rs` en el terminal

## Variables de entorno

Se requiere un archivo `.env` con:

- `PORT`: Por ejemplo, `PORT=3001`.
- `CONNECTION_MONGO`: URL a la instancia de MongoDB. Por ejemplo si se corre local, `mongodb://localhost:27017/`.
- `TOKEN_SECRET`: String aleatoria secreta para firmar los tokens.

## Correr MongoDB local

Es posible usar la instancia en la nube de Mongo.
También es posible correr una instancia local, con el comando:

```sh
docker run --name mongodb -d -p 27017:27017 mongodb/mongodb-community-server:6.0-ubi8
```