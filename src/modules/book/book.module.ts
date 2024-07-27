import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BookService } from 'src/modules/book/book.service'
import { BookController } from 'src/modules/book/book.controller'
import { Book, BookSchema } from 'src/models/book.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
