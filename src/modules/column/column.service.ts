import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { Model, Types } from 'mongoose'
import { Board } from 'src/models/board.schema'
import { Card } from 'src/models/card.shema'
import { Column } from 'src/models/column.schema'

@Injectable()
export class ColumnService {
  constructor(
    @InjectModel(Column.name) private readonly columnModel: Model<Column>,
    @InjectModel(Board.name) private readonly boardModel: Model<Board>,
    @InjectModel(Card.name) private readonly cardModel: Model<Card>,
  ) {}

  async create(createColumnDto: any): Promise<Column> {
    try {
      // gọi tới Model để ghi
      const newColumn = {
        ...createColumnDto,
        boardId: new ObjectId(createColumnDto.boardId),
        createdAt: new Date(),
        updatedAt: new Date(),
        _destroy: false,
      }
      const createdColumn = await new this.columnModel(newColumn)
      await createdColumn.save()

      const column = await this.columnModel.findById(createdColumn._id)
      const id = new Types.ObjectId(column._id)

      if (column) {
        column.cards = []

        await this.boardModel
          .findByIdAndUpdate(
            { _id: new Types.ObjectId(column.boardId) },
            {
              $push: {
                columnOrderIds: new Types.ObjectId(id),
              },
            },
            { returnDocument: 'after' },
          )
          .exec()
      }

      return column
    } catch (error) {
      console.log(error)
    }
  }

  async update(id: string, updateColumnDto: any): Promise<Column> {
    // gọi tới Model để ghi
    try {
      const updatedColumn = await this.columnModel.findByIdAndUpdate(
        id,
        updateColumnDto,
        { new: true },
      )
      return updatedColumn
    } catch (error) {
      console.log(error)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const columnId = new Types.ObjectId(id)
      const targetColumn = await this.columnModel.findById(columnId)
      if (!targetColumn) throw new Error('Column not found with id: ' + id)
      await this.columnModel.findByIdAndDelete(id).exec()
      await this.cardModel.deleteMany({ columnId: columnId }).exec()
      await this.boardModel.findByIdAndUpdate(
        { _id: new ObjectId(targetColumn.boardId) },
        {
          $pull: {
            columnOrderIds: new ObjectId(columnId),
          },
        },
        { returnDocument: 'after' },
      )
    } catch (error) {
      console.log(error)
    }
  }
}
