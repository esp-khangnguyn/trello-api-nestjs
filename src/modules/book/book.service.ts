import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Book } from 'src/models/book.schema'

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async create(createBookDto: any): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto)
    return createdBook.save()
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec()
  }

  async findOne(id: string): Promise<Book> {
    return this.bookModel.findById(id).exec()
  }

  async update(id: string, updateBookDto: any): Promise<Book> {
    return this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec()
  }

  async delete(id: string): Promise<Book> {
    return this.bookModel.findByIdAndDelete(id).exec()
  }
}
