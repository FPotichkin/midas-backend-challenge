# Midas Node Backend Challenge

## Documentation
Once you already installed the enviroment and started the server you can see de documentation in localhost:8000/api/docs/

##  Enviroment setup

1. Create a .env file and copy .env.example to .env and fill with database credentials.
2. Create database
````bash
`npm run db-up`
````
or
````bash
`docker-compose up -d`
````
3. Install dependencies
````bash
npm install
````
4. Run Migrations and Seeders
````bash
npm run migrations:run

npm run seeders:run
````
## Start local server
`npm start`

## Seeders contents

#### Users

id  | username | password
----|----------|------------
1   | admin    | admin123





## Premisa del desafio…
Utilizando la [API STAR WARS](https://swapi.dev/documentation "API STAR WARS"), podrás obtener las películas y personajes de cada entrega.
## Requerido
### Desafío 1:
Es necesario tener todas las películas, para ello debemos guardar en una base local todas
las películas con los campos que creas necesarios.
Inicialmente se consulta a la BD local preguntando si existen esas películas, si no existen
vamos a la API y guardamos las películas localmente para optimizar los tiempos de
respuesta y no ir cada vez a la API externa.
### Desafío 2
Al consultar cada película esta tiene que guardar en una base local todos los personajes
relacionados a esta con los campos nombre, género, películas y especie.
Inicialmente se consulta a la BD local preguntando si existen esos personajes, si no existen
vamos a la API y guardamos los personajes localmente para optimizar los tiempos de
respuesta y no ir cada vez a la API externa.
### Desafío 3:
Crear un endpoint que borre los personajes de la película indicada de la base de datos.
Crear un endpoint que borre TODOS los datos de la Base de datos.
### Desafío Opcional (Bonus extra)
-  Hacer un buscador de películas, especies.
-  Implementar login user y pass. Middleware de verificación token. (authentication)
## Aclaraciones
- Usar Node js
- Utilizar Swagger para la documentación de la API (no excluyente)
- La BD puede ser cualquiera
- Se debe exponer el endpoint de consulta de películas para ser utilizada
- Proponer diseño y lógica en cada desafío.
- Se puede subir a github/gitlab y compartir el link o bien un zip.
- Proponer manejo de errores (404, 401, 400, 500)