

## Instalar paquetes

```bash
$ npm install
```

## Ejecutar La API

### crear un archivo .env y colocar las variables de entorno 

PORT=

MONGO_URI=

JWT_KEY=

GOOGLE_MAPS_API_KEY=

```bash

# development
$ npm run dev


```

## Descripccion del proyecto

## Tecnologías utilizadas para construir la API
- **Node.js**
- **Express**

## Base de datos
- **MongoDB**

## Explicación de los dominios

### User
Se implementó un sistema de inicio de sesión sencillo. El usuario puede registrarse e iniciar sesión. Al iniciar sesión, se genera un token que es útil para realizar peticiones relacionadas con **location**.

### Truck
Se creó un CRUD (Create, Read, Update, Delete) con el esquema sugerido:

```javascript
user (ObjectId)
year (string)
color (string)
plates (string)
```

### Location
Aquí se integró la API de Google para obtener los detalles de una dirección a través de un place_id.

Para las peticiones de listar, actualizar y eliminar, es necesario enviar el token generado al iniciar sesión. Este token contiene en su payload el user_id, que se evalúa para garantizar que el usuario tenga permiso para modificar, eliminar o listar las entidades de location correspondientes.

### Orders
Se desarrolló un CRUD para crear, listar, actualizar y eliminar órdenes. Además, se agregó un método separado para actualizar únicamente el estado de una orden.

documentacion de postman para probar los endpoints
[Documentacion](https://documenter.getpostman.com/view/19391278/2sAYBYfqAF)
