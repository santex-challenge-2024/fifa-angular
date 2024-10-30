# Fifa Aplicaction

## Funcionalidad

- **Auteticacion de usuario**: Permite a los usuarios registrarse e iniciar session, desde el backend me devuelve un token de acceso (jwt) que luego lo guardo en mi LocalStorage, esto es necesario para poder acceder a la rutas de la pagina.
- **Listado de jugadores**: Permite a los usuarios poder ver una lista de todos los jugadores del Fifa, a su vez, pueden filtrar por nombre, club, posicion. y tambien pueden ver por paginas.
- **Crear un jugador**: Permite a los usuarios poder crearse como un jugador.

## Paquetes utilizados

- **Angular material**: su uso fue unicamiente para generar un mensaje (toast) cuando el usuario es registrado, logueado y para crear un nuevo jugador.

## requerimiento para el funcionamiento

- [Node.js](https://nodejs.org/) (versión recomendada: 14.x o superior)
- [Angular CLI](https://angular.io/cli) (puedes instalarlo globalmente usando `npm install -g @angular/cli`)

## DEV

1. Clonar el repositorio.
2. Crear un archivo `environment.ts` dentro de `src/app/environment`.
3. Copiar el contenido de `src/app/environment/environment.template.ts` y pegarlo en tu archivo creado en el paso 2.
4. Ejecutar el comando `npm install`.
5. Ejecutar el comando `ng serve` para levantar el proyecto.
