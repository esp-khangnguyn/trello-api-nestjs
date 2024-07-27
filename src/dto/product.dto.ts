import { IsNotEmpty, IsNumber, MinLength } from 'class-validator'

export class ProductDto {
  @IsNotEmpty()
  catgegoryId?: number

  @MinLength(5)
  productName: string

  @IsNumber()
  price?: number
}
