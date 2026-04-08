import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  const mockBook = {
    id: 1,
    title: 'Test Book',
    author: 'Test Author',
    readDate: new Date('2023-01-01'),
    completed: false,
  };

  const MOCK_SERVICE = {
    create: jest.fn().mockResolvedValue(mockBook),
    findAll: jest.fn().mockResolvedValue([mockBook]),
    findCompleted: jest.fn().mockResolvedValue([mockBook]),
    findOne: jest.fn().mockResolvedValue(mockBook),
    update: jest.fn().mockResolvedValue(mockBook),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: MOCK_SERVICE,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a book', async () => {
    const dto: CreateBookDto = { title: 'Test', author: 'Author', readDate: '2023-01-01' };
    expect(await controller.create(dto)).toEqual(mockBook);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find all books', async () => {
    expect(await controller.findAll()).toEqual([mockBook]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find completed books', async () => {
    expect(await controller.findCompleted()).toEqual([mockBook]);
    expect(service.findCompleted).toHaveBeenCalled();
  });

  it('should find one book', async () => {
    expect(await controller.findOne(1)).toEqual(mockBook);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a book', async () => {
    const dto: UpdateBookDto = { title: 'Updated' };
    expect(await controller.update(1, dto)).toEqual(mockBook);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should remove a book', async () => {
    expect(await controller.remove(1)).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
