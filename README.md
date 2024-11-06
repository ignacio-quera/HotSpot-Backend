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

## Para correrlo en la instancia de ec2

Conectarse a la instancia (acá se presentan instrucciones para correrlo con ssh):

En la carpeta donde tengan la clave .pem ``hotspot-back.pem`` (disponible en archivos del teams), ejecutar los comandos:

```
chmod 400 "hotspot-back.pem"
ssh -i "hotspot-back.pem" ubuntu@ec2-3-135-142-148.us-east-2.compute.amazonaws.com
```

Una vez dentro de la consola ec2, entrar al directorio ``HotSpot-Backend``. Desde ahí, se tienen los siguientes comandos:
 - `screen -x`: Sirve para entrar a la consola del programa en sí. Si es que el programa no está corriendo debería tirar error.
 - `screen -d -m sudo npm run dev`: Sirve para inicializar la consola del programa en segundo plano.

Combinaciones de teclas dentro de `screen`:
 - `Ctrl+A`: Dependiendo de que se presione después tiene distintos efectos.
 - `Ctrl+A, ESC`: Permite entrar al modo copia de la consola, en el que uno se puede mover con las flechas por el output de la consola. Sirve para debuggear y leer errores.
 - `Ctrl+A, D`: Sirve para salir de `screen` sin cortar la consola.
 - `Ctrl+C`: Cierra la consola y cierra `screen`.