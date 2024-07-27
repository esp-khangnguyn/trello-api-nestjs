import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { cloneDeep } from 'lodash'
import { ObjectId } from 'mongodb'
import { Model, Types } from 'mongoose'
import { Board } from 'src/models/board.schema'
import { Card } from 'src/models/card.shema'
import { Column } from 'src/models/column.schema'

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private readonly boardModel: Model<Board>,
    @InjectModel(Column.name) private readonly columnModel: Model<Column>,
    @InjectModel(Card.name) private readonly cardModel: Model<Card>,
  ) {}

  async create(createboardDto: any): Promise<Board> {
    try {
      const createdBoard = await new this.boardModel(createboardDto)
      createdBoard.save()
      const board = this.boardModel.findOne({ _id: createdBoard._id })
      return board
    } catch (error) {
      console.log(error)
    }
  }

  async findAll(): Promise<Board[]> {
    return this.boardModel.find().exec()
  }

  async findOne(id: string): Promise<Board> {
    try {
      const result = await this.boardModel
        .aggregate([
          {
            $match: {
              _id: new ObjectId(id),
              _destroy: false,
            },
          },
          {
            $lookup: {
              from: this.columnModel.collection.name,
              localField: '_id',
              foreignField: 'boardId',
              as: 'columns',
            },
          },
          {
            $lookup: {
              from: this.cardModel.collection.name,
              localField: '_id',
              foreignField: 'boardId',
              as: 'cards',
            },
          },
        ])
        .exec()

      const resBoard: any = cloneDeep(result[0])
      resBoard.columns.forEach((column) => {
        column.cards = resBoard.cards.filter((card) =>
          card.columnId.equals(column._id),
        )
      })
      return resBoard
    } catch (error) {
      console.log(error)
    }
  }

  async update(id: string, updateboardDto: any): Promise<Board> {
    try {
      const updateData = {
        ...updateboardDto,
        updatedAt: Date.now(),
      }

      // gọi tới Model để ghi
      const updatedBoard = await this.boardModel.findByIdAndUpdate(
        id,
        updateData,
      )
      return updatedBoard
    } catch (error) {
      throw new Error(error)
    }
  }

  async delete(id: string): Promise<Board> {
    return this.boardModel.findByIdAndDelete(id).exec()
  }

  async moveCardToOtherColumn(updateBoardDto: any): Promise<void> {
    try {
      console.log('prevColumnId:', updateBoardDto.prevColumnId)
      console.log('prevCardOrderIds: ', updateBoardDto.prevCardOrderIds)
      console.log('nextColumnId:', updateBoardDto.nextColumnId)
      console.log('nextCardOrderIds: ', updateBoardDto.nextCardOrderIds)
      await this.columnModel
        .findByIdAndUpdate(new Types.ObjectId(updateBoardDto.prevColumnId), {
          cardOrderIds: updateBoardDto.prevCardOrderIds.map(
            (id) => new Types.ObjectId(id),
          ),

          updateAt: Date.now(),
        })
        .exec()

      await this.columnModel
        .findByIdAndUpdate(new Types.ObjectId(updateBoardDto.nextColumnId), {
          cardOrderIds: updateBoardDto.nextCardOrderIds.map(
            (id) => new Types.ObjectId(id),
          ),

          updateAt: Date.now(),
        })
        .exec()

      const columnId = new Types.ObjectId(updateBoardDto.nextColumnId)
      console.log(columnId)

      await this.cardModel
        .findByIdAndUpdate(new Types.ObjectId(updateBoardDto.currentCardId), {
          columnId: columnId,
        })
        .exec()
    } catch (error) {
      throw new Error(error)
    }
  }
}
