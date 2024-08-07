# Trabajo Final Ingenias Backend  - Grupo 4

Proyecto final que consiste en la creación de un servidor back utilizando JavaScript, Node.js y Express.js , y Sequelize , para poder comunicarnos con una base de datos creada y diseñada en MySQL.

<p>👩‍💻 Hecho en grupo, por las alumnas:</p>

`GitHub profiles ↓`
<ul>
        <li><a href="https://github.com/amarantaVC" target="_blank">Amaranta Villegas</a></li>
        <li><a href="https://github.com/dxniela" target="_blank">Daniela Ramírez</a></li>
        <li><a href="https://github.com/Roci16" target="_blank">Rocio Ibañez</a></li>
        <li><a href="https://github.com/silfigue" target="_blank">Silvina Figueroa</a></li>
</ul>

## Diseño del Modelo de Datos
Se diseñó un modelo de datos para una plataforma de streaming basado en la información del archivo JSON.
Para realizar el diseño efectivo de la base de datos y sus tablas se utilizó la plataforma DB Designer. 

https://www.dbdesigner.net/
## Diagrama de entidad-relación resultante:

![imagen](./db%20ER%20final.png "der")

## Tecnologías Utilizadas

- **JavaScript**: Lenguaje de programación utilizado.
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework web para Node.js.
- **Sequelize**: ORM para Node.js para interacción con bases de datos MySQL.
- **dotenv**: Para gestionar variables de entorno.
- **MySQL**: Sistema de gestión de bases de datos SQL.


## Requisitos

- Node.js y npm instalados.
- MySQL en funcionamiento con la base de datos configurada.
- Dependencias instaladas con `npm install`.

## Instrucciones de Instalación

- Descargar o clonar el repositorio en su equipo.
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```

- Navega al directorio del proyecto hasta la carpeta Grupo-4 e instala las dependencias requeridas
   ```bash
    cd Grupo-4
    npm install
    ```

- Abrir MySQL y ejecutar el script `createBD` que se encuentra en la carpeta `scripts` para crear las *tablas* de la base de datos. Luego ejecutar el script `insertDB` para cargar los datos en la base creada que usaremos para las consultas.


- Configura el archivo .ENV
```
DB_HOST="localhost" 
DB_USER="root"
DB_PASS="" Agrega tu password de MySQL
DB_NAME="trailerflix" 
PORT=3000 

```
- Usar el comando `npm start` para iniciar el servidor.

    ```bash
    npm start
    ```

# Endpoints
|Método| Endpoint |Descripción|
|------|----------|-----------|
| GET  |"/api/contenido"|Obtener la información de todas las películas y series|
| GET  |"/api/contenido/buscar"| Obtener peliculas o series por titulo|
|DELETE|"/api/contenido/:id"| Eliminar una pelicula o serie especifica|
| GET  |"/api/actores"|Obtener todos los actores|
| GET  |"api/actores/actores?actor=:nombre"|Obtener un el primer actor con el nombre similar y las obras que trabajo|
| GET  |"/api/categoria"|Obtener todas las categorias|
|PUT|"/api/categoria/:id"|Actualizar una categoría |
|GET |"/api/generos"| Obtener todos los generos |
|GET|"/api/generos/pelicula/:genero"| Obtener todas las peliculas de un genero en especifico|
|GET|"/api/generos/serie/:genero"|Obtener todas las series de un genero en especifico|
|GET|"/api/tags"| Obtener todos los tags|
|POST|"/api/tag"| Crear un nuevo tag|

## Explicación y algunos ejemplos de uso:

## 1. Obtener la información de todas las películas y series

- **Método**: `GET`
- **Ruta**: `/api/contenido/`
- **Descripción**: Obtiene toda la informacion de todas las pelis y series

**Ejemplo de solicitud**:

```
http://localhost:3000/api/contenido
```
Respuesta: IMAGEN 


## 2. Obtener peliculas o series por titulo

- **Método**: `GET`
- **Ruta**: `/api/contenido/buscar`
- **Descripción**: Obtiene una pelicula o series segun un titulo dado

**Ejemplo de solicitud**:

```
http://localhost:3000/api/contenido/el
```
Respuesta: IMAGEN 

## 3. Eliminar una pelicula o serie especifica

- **Método**: `DELETE`
- **Ruta**: `/api/contenido/:id`
- **Descripción**: Elimina una pelicula o serie especifica segun un id dado

**Ejemplo de solicitud**:

```
http://localhost:3000/api/contenido/8
```
Respuesta: IMAGEN 

## 4. Obtener todos los actores

- **Método**: `GET`
- **Ruta**: `/api/actores`
- **Descripción**: Obtener todos los actores

**Ejemplo de solicitud**:

```
http://localhost:3000/api/actores
```
Respuesta: IMAGEN 

## 5. Actualizar una categoría

- **Método**: `PUT`
- **Ruta**: `/api/categoria/:id`
- **Descripción**: Actualizar una categoría especifica segun un id dado.

**Ejemplo de solicitud**:

```
http://localhost:3000/api/categoria/9

```
Respuesta: IMAGEN 










