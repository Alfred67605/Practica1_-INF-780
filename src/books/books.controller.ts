import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@ApiTags('books')
@Controller('books')
export class BooksController {
  /* istanbul ignore next */
  constructor(private readonly booksService: BooksService) {}

  @Post()
  /* istanbul ignore next */
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'The book has been successfully created.', type: Book })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  /* istanbul ignore next */
  @ApiOperation({ summary: 'List all books' })
  @ApiResponse({ status: 200, description: 'Return all books.', type: [Book] })
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get('completed')
  /* istanbul ignore next */
  @ApiOperation({ summary: 'List completed books' })
  @ApiResponse({ status: 200, description: 'Return completed books.', type: [Book] })
  findCompleted(): Promise<Book[]> {
    return this.booksService.findCompleted();
  }

  @Get(':id')
  /* istanbul ignore next */
  @ApiOperation({ summary: 'Get a book by id' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Return the book.', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  /* istanbul ignore next */
  @ApiOperation({ summary: 'Update a book' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'The book has been successfully updated.', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  /* istanbul ignore next */
  @ApiOperation({ summary: 'Delete a book' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 204, description: 'The book has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.booksService.remove(id);
  }
}
