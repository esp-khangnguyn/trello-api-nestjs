import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema()
export class Card extends Document {
  @Prop()
  boardId: Types.ObjectId

  @Prop()
  columnId: Types.ObjectId

  @Prop()
  title: string

  @Prop()
  description: string

  @Prop()
  createdAt: Date | null

  @Prop()
  updatedAt: Date | null

  @Prop()
  _destroy: boolean
}

export const CardSchema = SchemaFactory.createForClass(Card)
