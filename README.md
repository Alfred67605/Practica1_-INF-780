# Practica1_-INF-780 - Books API

API REST de seguimiento de libros leídos. Construida con NestJS, TypeORM, PostgreSQL y documentada con Swagger.

## 🚀 Descripción del Proyecto

Este proyecto es una API RESTful desarrollada como práctica académica para la materia INF-780, que permite:

- Gestionar libros leídos (Crear, Listar, Obtener por ID, Actualizar, Eliminar).
- Listar libros explícitamente marcados como completados.
- Validar automáticamente la entrada de datos.
- Proporcionar documentación Swagger interactiva.
- Pruebas unitarias de servicios y pruebas de integración e2e de controladores.

### Endpoints disponibles (6 CRUD)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/books` | Crear un nuevo libro |
| `GET` | `/books` | Listar todos los libros |
| `GET` | `/books/completed` | Listar libros completados |
| `GET` | `/books/:id` | Obtener un libro por ID |
| `PATCH` | `/books/:id` | Actualizar un libro |
| `DELETE` | `/books/:id` | Eliminar un libro |

## 🛠 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Alfred67605/Practica1_-INF-780.git
cd Practica1_-INF-780
```

2. Instala las dependencias:

```bash
npm install
```

## ⚙️ Configuración (Base de datos PostgreSQL)

El proyecto requiere una base de datos PostgreSQL local con las siguientes credenciales (configurables en `src/app.module.ts`):

- **Host**: `localhost`
- **Puerto**: `5432`
- **Usuario**: `postgres`
- **Contraseña**: `postgres`
- **Base de Datos**: `books_api`

Crea la base de datos antes de iniciar la aplicación:

```sql
CREATE DATABASE books_api;
```

## 🏃 Cómo Ejecutar la Aplicación

```bash
# Modo desarrollo (con hot-reload)
npm run start:dev

# Modo producción
npm run start:prod
```

La aplicación estará disponible en `http://localhost:3000`.

## 📖 URL de Documentación Swagger

Al ejecutar la aplicación, accede a la documentación interactiva en:

👉 **[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

Desde Swagger UI puedes probar todos los endpoints directamente.

## 🧪 Cómo Ejecutar las Pruebas

```bash
# Pruebas unitarias
npm run test

# Pruebas de integración (e2e)
npm run test:e2e

# Pruebas con cobertura
npm run test:cov
```

## 📊 Cobertura de Pruebas

### Pruebas Unitarias (Service) — 10 tests ✅

```
BooksService
  ✓ should be defined
  create
    ✓ should successfully create a book
  findAll
    ✓ should return an array of books
  findCompleted
    ✓ should return completed books
  findOne
    ✓ should get a single book by id
    ✓ should throw NotFoundException if book not found
  update
    ✓ should update a book
    ✓ should throw NotFoundException when updating non-existent book
  remove
    ✓ should delete a book
    ✓ should throw NotFoundException when removing non-existent book

books.service.ts  | 100% Stmts | 100% Funcs | 100% Lines
```

### Pruebas de Integración (E2E) — 8 tests ✅

```
BooksController (e2e)
  ✓ /books (POST) - validación de body vacío (400)
  ✓ /books (POST) - creación exitosa (201)
  ✓ /books (GET) - listar todos (200)
  ✓ /books/completed (GET) - listar completados (200)
  ✓ /books/:id (GET) - obtener por ID (200)
  ✓ /books/:id (GET) - no encontrado (404)
  ✓ /books/:id (PATCH) - actualizar (200)
  ✓ /books/:id (DELETE) - eliminar (204)
```

## 🛡 Tecnologías Utilizadas

- **NestJS** — Framework backend
- **TypeORM** — ORM para PostgreSQL
- **PostgreSQL** — Base de datos relacional
- **Swagger/OpenAPI** — Documentación automática
- **Jest** — Framework de pruebas
- **Supertest** — Pruebas HTTP e2e
- **class-validator** — Validación de DTOs
