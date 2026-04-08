# Practica 1 INF-780 - Books API

API REST para la gestion y seguimiento de libros leidos. Este proyecto ha sido desarrollado utilizando el framework NestJS, TypeORM para la persistencia de datos y PostgreSQL como motor de base de datos. La API cumple con los estandares de diseño RESTful y se encuentra totalmente documentada mediante Swagger/OpenAPI.

## Descripcion del Proyecto

El proposito de esta aplicacion es permitir a los usuarios gestionar un catalogo de libros leidos, permitiendo registrar informacion relevante como el titulo, autor, fecha de lectura y estado de conclusion del libro. 

### Caracteristicas Principales
- Implementacion de operaciones CRUD completas.
- Validacion de datos de entrada mediante DTOs (Data Transfer Objects) y decoradores.
- Manejo de excepciones y errores (ej. 404 Not Found para registros inexistentes).
- Documentacion automatica detallada.
- Suite de pruebas automatizadas con alta cobertura de codigo.

## Estructura del Proyecto

El repositorio sigue una estructura clara y modular:

- `src/` : Codigo fuente de la aplicacion.
  - `books/` : Modulo principal de libros.
    - `dto/` : Objetos de transferencia de datos con reglas de validacion.
    - `entities/` : Definicion de la estructura de la base de datos (TypeORM).
    - `books.service.ts` : Logica de negocio y acceso a datos.
    - `books.controller.ts` : Definicion de rutas y manejo de peticiones HTTP.
- `test/` : Pruebas de integracion e2e (end-to-end).

## Instrucciones de Instalacion

Para poner en marcha el proyecto localmente, siga estos pasos:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Alfred67605/Practica1_-INF-780.git
   cd Practica1_-INF-780
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configuracion de la Base de Datos**:
   Asegurese de tener instalado PostgreSQL y cree una base de datos denominada `books_api`. Por defecto, el proyecto utiliza las siguientes credenciales (modificables en `src/app.module.ts`):
   - Host: localhost
   - Puerto: 5432
   - Usuario: postgres
   - Contrasena: postgres
   - Base de Datos: books_api

## Como Ejecutar la Aplicacion

Una vez configurada la base de datos, puede iniciar el servidor:

```bash
# Modo desarrollo
npm run start:dev

# Modo produccion
npm run build
npm run start:prod
```

La aplicacion iniciara por defecto en el puerto 3000: `http://localhost:3000`

## Documentacion Swagger (URL)

La documentacion completa de los endpoints, incluyendo modelos de datos y ejemplos de peticiones, esta disponible en la siguiente URL una vez iniciada la aplicacion:

**http://localhost:3000/api/docs**

## Como Ejecutar las Pruebas

Se han implementado dos niveles de pruebas para garantizar la calidad del software:

1. **Pruebas Unitarias**: Verifican la logica de negocio de forma aislada (Services y Controllers).
   ```bash
   npm run test
   ```

2. **Pruebas de Integracion (E2E)**: Verifican el flujo completo desde la peticion HTTP hasta la respuesta en base de datos.
   ```bash
   npm run test:e2e
   ```

3. **Generacion de Cobertura**: Genera un reporte detallado del codigo cubierto.
   ```bash
   npm run test:cov
   ```

## Cobertura de Pruebas

El proyecto mantiene altos estandares de calidad, superando los requisitos de cobertura solicitados:

- **Cobertura de Lineas**: 100%
- **Cobertura de Funciones**: 100%
- **Cobertura de Sentencias**: 100%

Esta cobertura asegura que todos los servicios y controladores han sido validados mediante pruebas automatizadas, cubriendo tanto casos de exito como manejo de errores detallados.

## Endpoints de la API

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| POST | /books | Registra un nuevo libro completo. |
| GET | /books | Retorna la lista de todos los libros registrados. |
| GET | /books/completed | Retorna unicamente los libros marcados como terminados. |
| GET | /books/:id | Busca y retorna un libro por su ID unico decimal. |
| PATCH | /books/:id | Actualiza parcialmente los datos de un libro existente. |
| DELETE | /books/:id | Elimina permanentemente un libro del sistema. |
