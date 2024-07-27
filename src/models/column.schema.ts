import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, HydratedDocument, Types } from 'mongoose'

export type ColumnDocument = HydratedDocument<Column>

@Schema()
export class Column extends Document {
  // @Prop()
  // _id?: Types.ObjectId

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
