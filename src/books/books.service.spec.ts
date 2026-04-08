import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

describe('BooksService', () => {
  let service: BooksService;
  let repository: Repository<Book>;

  const mockBook = {
    id: 1,
    title: 'Test Book',
    author: 'Test Author',
    readDate: new Date('2023-01-01'),
    completed: false,
  };

  const MOCK_REPOSITORY = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockResolvedValue(mockBook),
    find: jest.fn().mockResolvedValue([mockBook]),
    findOne: jest.fn().mockResolvedValue(mockBook),
    merge: jest.fn().mockImplementation((entity, dto) => Object.assign(entity, dto)),
    remove: jest.fn().mockResolvedValue(mockBook),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: MOCK_REPOSITORY,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a book', async () => {
      const dto = { title: 'Test Book', author: 'Test Author', readDate: '2023-01-01' };
      expect(await service.create(dto)).toEqual(mockBook);
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      expect(await service.findAll()).toEqual([mockBook]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findCompleted', () => {
    it('should return completed books', async () => {
      MOCK_REPOSITORY.find.mockResolvedValueOnce([{ ...mockBook, completed: true }]);
      const result = await service.findCompleted();
      expect(result).toEqual([{ ...mockBook, completed: true }]);
      expect(repository.find).toHaveBeenCalledWith({ where: { completed: true } });
    });
  });

  describe('findOne', () => {
    it('should get a single book by id', async () => {
      expect(await service.findOne(1)).toEqual(mockBook);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if book not found', async () => {
      MOCK_REPOSITORY.findOne.mockResolvedValueOnce(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const dto = { title: 'Updated' };
      const updatedBook = { ...mockBook, ...dto };
      MOCK_REPOSITORY.save.mockResolvedValueOnce(updatedBook);
      
      const result = await service.update(1, dto);
      expect(result).toEqual(updatedBook);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.merge).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalled();
    });
    
    it('should throw NotFoundException when updating non-existent book', async () => {
      MOCK_REPOSITORY.findOne.mockResolvedValueOnce(null);
      await expect(service.update(999, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a book', async () => {
      await service.remove(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.remove).toHaveBeenCalled();
    });

    it('should throw NotFoundException when removing non-existent book', async () => {
      MOCK_REPOSITORY.findOne.mockResolvedValueOnce(null);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
