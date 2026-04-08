import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, NotFoundException } from '@nestjs/common';
const request = require('supertest');
import { BooksController } from '../src/books/books.controller';
import { BooksService } from '../src/books/books.service';

describe('BooksController (e2e)', () => {
  let app: INestApplication;

  const mockBook = {
    id: 1,
    title: 'E2E Book',
    author: 'E2E Author',
    readDate: '2023-01-01',
    completed: false,
  };

  const MOCK_BOOKS_SERVICE = {
    create: jest.fn().mockImplementation((dto) => ({ id: 1, ...dto })),
    findAll: jest.fn().mockResolvedValue([mockBook]),
    findCompleted: jest.fn().mockResolvedValue([{ ...mockBook, completed: true }]),
    findOne: jest.fn().mockImplementation((id) => {
      if (id === 1) return mockBook;
      throw new NotFoundException('Not Found');
    }),
    update: jest.fn().mockImplementation((id, dto) => ({ ...mockBook, ...dto })),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: MOCK_BOOKS_SERVICE,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/books (POST) - unprocessable entity', () => {
    return request(app.getHttpServer())
      .post('/books')
      .send({})
      .expect(400);
  });

  it('/books (POST)', () => {
    return request(app.getHttpServer())
      .post('/books')
      .send({
        title: 'New Book',
        author: 'New Author',
        readDate: '2023-01-01',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toEqual(1);
        expect(res.body.title).toEqual('New Book');
      });
  });

  it('/books (GET)', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect([mockBook]);
  });

  it('/books/completed (GET)', () => {
    return request(app.getHttpServer())
      .get('/books/completed')
      .expect(200)
      .expect([{ ...mockBook, completed: true }]);
  });

  it('/books/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/books/1')
      .expect(200)
      .expect(mockBook);
  });

  it('/books/:id (GET) - not found', () => {
    return request(app.getHttpServer())
      .get('/books/999')
      .expect(404);
  });

  it('/books/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/books/1')
      .send({ title: 'Updated Title' })
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toEqual('Updated Title');
      });
  });

  it('/books/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/books/1')
      .expect(204);
  });
});
