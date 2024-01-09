# Nombre del Proyecto

Viña picoteo 2.0

## Descripción 

Viña Picoteo 2.0 es una aplicación de API REST construida con NestJS. Esta API se conecta a una base de datos en MYSQL y proporciona una serie de endpoints para gestionar diversas entidades.

## Instalación

Asegúrate de tener [Node.js](https://nodejs.org/) instalado.

Clonar el siguiente repositorio desde github. 
```bash
git clone https://github.com/Eduardoalvarezurbina/Back-Naciones-Unidas.git
```

```bash
$ yarn install
```
## Requisitos

- Node.js
- Yarn
- Docker
- MySQL

## Configuración de MySQL con Docker

Este proyecto utiliza MySQL como base de datos. Para ejecutar MySQL en un contenedor Docker, puedes usar la imagen `mysql:8.9.034-debian`. Aquí te dejo los comandos para hacerlo:

```bash
# Descarga la imagen de MySQL
docker pull mysql:8.9.034-debian

# Ejecuta el contenedor de MySQL
docker run --name compassionate_matsumoto -p 3306:3306 -e MYSQL_ROOT_PASSWORD=mi_contraseña -d mysql:8.9.034-debian
```
## Tecnologías y Dependencias Principales

- [NestJS](https://nestjs.com/): Un marco de trabajo para construir aplicaciones de servidor eficientes y escalables en TypeScript.
- [TypeORM](https://typeorm.io/#/): Un ORM que puede ejecutarse en plataformas NodeJS y puede ser utilizado con TypeScript y JavaScript.
- [mysql2](https://www.npmjs.com/package/mysql2): Un módulo de Node.js para proporcionar una interfaz con MySQL.
- [bcrypt](https://www.npmjs.com/package/bcrypt): Una biblioteca para ayudarte a hacer hash de contraseñas.
- [@nestjs/jwt](https://www.npmjs.com/package/@nestjs/jwt): Un módulo para manejar JWT (JSON Web Tokens) en NestJS.
- [@nestjs/swagger](https://www.npmjs.com/package/@nestjs/swagger): Un módulo para ayudar a crear documentación de API con Swagger y NestJS.

## Uso
```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

La API se ejecutará en http://localhost:3000. o un ngrok que se defina previamente

## Documentación de la API
La documentación de la API está disponible en Swagger. Puedes acceder a las siguientes rutas:

- [Documentación General](http://localhost:3000/documentacion)
- [API de Cajas](http://localhost:3000/api-docs/caja)
- [API de Carro de Compras](http://localhost:3000/api-docs/carrodecompras)
- [API de Suscripción](http://localhost:3000/api-docs/suscripcion)
- [API de Usuario](http://localhost:3000/api-docs/usuario)
- [API de Invitado](http://localhost:3000/api-docs/invitado)
- [API de Producto](http://localhost:3000/api-docs/producto)
- [API de Compra](http://localhost:3000/api-docs/compra)
- [API de Login](http://localhost:3000/api-docs/login)
- [API de Comentario](http://localhost:3000/api-docs/comentario)


## Contacto

Si tienes alguna pregunta o encuentras algún problema con la aplicación, no dudes en contactarme. Puedes enviarme un correo electrónico a [eduardoalvarezurbina94@gmail.com].