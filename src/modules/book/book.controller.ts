import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { BookService } from './book.service'
import { Book } from 'src/models/book.schema'

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: any): Promise<Book> {
    console.log('Posting')
    return this.bookService.create(createBookDto)
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOne(id)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: any,
  ): Promise<Book> {
    return this.bookService.update(id, updateBookDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Book> {
    return this.bookService.delete(id)
  }
}
