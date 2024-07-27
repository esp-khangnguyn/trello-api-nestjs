import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  author: string

  @Prop()
  description: string

  @Prop({ default: Date.now })
  publishedDate: Date

  @Prop()
  genre: string
}

export const BookSchema = SchemaFactory.createForClass(Book)
