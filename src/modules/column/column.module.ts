import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Board, BoardSchema } from 'src/models/board.schema'
import { Card, CardSchema } from 'src/models/card.shema'
import { Column, ColumnSchema } from 'src/models/column.schema'
import { ColumnController } from 'src/modules/column/column.controller'
import { ColumnService } from 'src/modules/column/column.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Column.name, schema: ColumnSchema }]),
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  providers: [ColumnService],
  controllers: [ColumnController],
  exports: [ColumnService],
})
export class ColumnModule {}
