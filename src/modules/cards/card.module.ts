import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Card, CardSchema } from 'src/models/card.shema'
import { Column, ColumnSchema } from 'src/models/column.schema'
import { CardController } from 'src/modules/cards/card.controller'
import { CardService } from 'src/modules/cards/card.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
    MongooseModule.forFeature([{ name: Column.name, schema: ColumnSchema }]),
  ],
  providers: [CardService],
  controllers: [CardController],
})
export class CardModule {}
