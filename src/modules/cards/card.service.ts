import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Card } from 'src/models/card.shema'
import { Column } from 'src/models/column.schema'

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<Card>,
    @InjectModel(Column.name) private readonly columnModel: Model<Column>,
  ) {}

  async create(createCardDto: any): Promise<Card> {
    try {
      const cardData = {
        ...createCardDto,
        boardId: new Types.ObjectId(createCardDto.boardId),
        columnId: new Types.ObjectId(createCardDto.columnId),
        _destroy: false,
      }
      const createdcard = new this.cardModel(cardData)
      createdcard.save()

      const card = await this.cardModel.findById(createdcard._id)
      const id = await new Types.ObjectId(card._id)
      console.log(card)

      if (card) {
        await this.columnModel
          .findByIdAndUpdate(
            { _id: new Types.ObjectId(card.columnId) },
            {
              $push: {
                cardOrderIds: id,
              },
            },
            { returnDocument: 'after' },
          )
          .exec()
      }

      return card
    } catch (error) {
      console.log(error)
    }
  }

  async delete(id: string): Promise<any> {
    return this.cardModel.findByIdAndDelete(id).exec()
  }
}
