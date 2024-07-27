import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema()
export class Column extends Document {
  @Prop()
  boardId: Types.ObjectId

  @Prop()
  title: string

  @Prop()
  cards?: any[]

  @Prop()
  cardOrderIds: Types.ObjectId[]

  @Prop()
  createdAt: Date | null

  @Prop()
  updatedAt: Date | null

  @Prop()
  _destroy: boolean
}

export const ColumnSchema = SchemaFactory.createForClass(Column)
