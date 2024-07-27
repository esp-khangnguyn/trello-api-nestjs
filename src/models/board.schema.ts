import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema()
export class Board extends Document {
  @Prop()
  title: string

  @Prop()
  slug: string

  @Prop()
  description: string

  @Prop()
  type: string

  @Prop()
  columnOrderIds: Types.ObjectId[]

  @Prop()
  createdAt: Date | null

  @Prop()
  updatedAt: Date | null

  @Prop()
  columns?: any[]

  @Prop()
  _destroy: boolean
}

export const BoardSchema = SchemaFactory.createForClass(Board)
