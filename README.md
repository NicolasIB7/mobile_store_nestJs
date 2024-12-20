<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Proyecto de Gestión de Inventario

## Descripción General
Este proyecto es un sistema de gestión de inventario desarrollado utilizando NestJS. La aplicación proporciona funcionalidades de autenticación y autorización. Está diseñado para facilitar la gestión de productos, variaciones de stock y operaciones relacionadas. Se agrega paginado a la búsqueda de productos.

Se utilizaron las mejores prácticas de Nest junto con el potencial de Typescript, utilizando diversos DTOs y librerias especificas de Nest como Pipes que permiten validar las propiedades recibidas.

## Características
- **Autenticación y Autorización**:
  - Integración JWT.
  - Control de acceso basado en roles para garantizar que los usuarios tengan los permisos adecuados para sus acciones.


- **Gestión de Productos**:
  - Operaciones completas de CRUD (Crear, Leer, Actualizar, Eliminar) para la administración de productos.

- **Variaciones de Stock**:
  - Varias tablas relacionadas para rastrear y mostrar las variaciones de stock.
  - Información detallada sobre los cambios de inventario en diferentes productos.

- **Registro de Logs**:
  - Los registros de errores se gestionan utilizando Winston, lo que proporciona logs estructurados y organizados para una depuración y mantenimiento más fáciles.

## Tecnologías Utilizadas
- **NestJS**: Para desarrollar el backend de la aplicación.
- **Winston**: Para el registro de errores y mantenimiento de archivos de log estructurados.

## Próximas modificaciones

- Agregar cache con Redis para reducir la carga.
- Agregar lógica para limitar la cantidad de conexiones al servidor y evitar la sobrecarga.
- Agregar envio de emails, por ejemplo al crear un nuevo producto.
- Agregar algún websocket a la API.

## Instrucciones de Configuración
1. Clona el repositorio.
2. Instala las dependencias utilizando `npm install`.
3. Configura los detalles de autenticación para Authenti y Auth0 en el archivo de entorno.
4. Ejecuta la aplicación utilizando `npm run start`.

