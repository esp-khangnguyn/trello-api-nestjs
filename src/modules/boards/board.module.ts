import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Board, BoardSchema } from 'src/models/board.schema'
import { Card, CardSchema } from 'src/models/card.shema'
import { Column, ColumnSchema } from 'src/models/column.schema'
import { BoardController } from 'src/modules/boards/board.controller'
import { BoardService } from 'src/modules/boards/board.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
    MongooseModule.forFeature([{ name: Column.name, schema: ColumnSchema }]),
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  providers: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
