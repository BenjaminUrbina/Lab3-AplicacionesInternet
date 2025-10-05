# Proyecto NOTeolvides
Proyecto creado por:
Benjamín U.
Cristhian M.

## ¿En que cosiste este proyecto?

Se desarrollo una **aplicación web Gestor de Tareas** con frontend y backend separados. La app permite: registro e inicio de sesión de usuarios, CRUD completo de tareas (crear, leer, actualizar, eliminar), y un **dashboard** que muestre las tareas agrupadas por estado: _Sin iniciar_, _En progreso_, _Completadas_.

Actualmente estamos trabajando con React-Node.js.
Para poder utilizar y editar este proyecto es necesario tener instalado:
## Node.Js
El cual puedes encontrar en este [Link](https://nodejs.org/es).
## ¿Que framework o herramienta utilizaremos? 

- [React helmet](https://www.npmjs.com/package/react-helmet)
- [React boostrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction)
- [React route](https://reactrouter.com/)

## ¿Con que versión estamos trabajando?
Actualmente estamos trabajando con `npm 11.6.0` y para el backkend  y base de datos utilizamos supabase.
Para poder desplegar el proyecto utilizamos vercel, utilizando este [Link](https://lab3-aplicaciones-internet.vercel.app/) podras acceder a la pagina.

## ¿Como ejecutar el proyecto en tu computadora?
Solo necesitas entrar por terminal en una carpeta a tu elección, clonar o descargar el repositorio y ejecutar :
```bash
npm install # Instalas las dependencias de package.json
npm run dev # Levanta el servidor
```
## ¿El proyecto cuenta con variables de entorno?

El proyecto cuenta con 2 variables de entorno:
- VITE_SUPABASE_URL (url supabase)
- VITE_SUPABASE_ANON_KEY (token de supabase)
Tendras que crear tu variable de entorno con el nombre .env.local, luego utilizaras las variables antes mencionadas.

## ¿Como el proyecto gestiona el backend?

Principalmente el proyecto utuiliza supabase, el cual es un Backend as a Service (BaaS) de código abierto que ofrece servicios backend listos para usar, como base de datos (PostgreSQL), autenticación, almacenamiento y funciones serverless.

Gracias a este y su documentacion podremos realizar consultas a la base de datos, si la necesidad de usar EndPoints hechos a mano, facilitando el trabajo.
Esto ocurre tambien con la base de datos, ya que como ellos tienen el backen listo, si necesitas hacer una query solo tienes que seguir el formato que ellos utilizan para poder realizar las consultas.


