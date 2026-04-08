# Practica 1 INF-780 - Books API

API REST para la gestion de libros leidos. Construida con NestJS, TypeORM, PostgreSQL y documentada con Swagger/OpenAPI.

## Descripcion del Proyecto

Este proyecto es una API RESTful desarrollada como practica academica para la materia INF-780, que permite:

- Gestionar libros leidos (Crear, Listar, Obtener por ID, Actualizar, Eliminar).
- Listar libros marcados como completados.
- Validar automaticamente la entrada de datos.
- Proporcionar documentacion Swagger interactiva.
- Pruebas unitarias de servicios y pruebas de integracion e2e de controladores.

### Endpoints disponibles

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| POST | /books | Crear un nuevo libro |
| GET | /books | Listar todos los libros |
| GET | /books/completed | Listar libros completados |
| GET | /books/:id | Obtener un libro por ID |
| PATCH | /books/:id | Actualizar un libro |
| DELETE | /books/:id | Eliminar un libro |

## Instalacion

1. Clonar el repositorio:
git clone https://github.com/Alfred67605/Practica1_-INF-780.git

2. Instalar dependencias:
npm install

## Configuracion de Base de Datos

El proyecto requiere PostgreSQL con las siguientes credenciales:
- Host: localhost
- Puerto: 5432
- Usuario: postgres
- Contrasena: postgres
- Base de Datos: books_api

## Instrucciones de Ejecucion

Para ejecutar la aplicacion en modo desarrollo:
npm run start:dev

La aplicacion estara disponible en http://localhost:3000

## Documentacion Swagger

La documentacion interactiva se encuentra en:
http://localhost:3000/api/docs

## Pruebas y Cobertura

Para ejecutar las pruebas:
npm run test
npm run test:e2e
npm run test:cov

### Reporte de Pruebas Unitarias
- Tests totales: 10
- Cobertura de lineas: 100%
- Cobertura de funciones: 100%

### Reporte de Pruebas de Integracion
- Tests totales: 8
- Verificacion de todos los endpoints CRUD y manejo de errores.

## Tecnologias

- NestJS
- TypeORM
- PostgreSQL
- Swagger/OpenAPI
- Jest
- Supertest
- class-validator
