import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common'
import { ProductDto } from 'src/dto/product.dto'
import { ResponseData } from 'src/global/globalClass'
import { HttpMessage, HttpStatus } from 'src/global/globalEnum'
import { Product } from 'src/models/productModel'
import { ProductService } from 'src/modules/products/product.service'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(): ResponseData<Product[]> {
    try {
      return new ResponseData<Product[]>(
        this.productService.getProducts(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      )
    } catch (error) {
      return new ResponseData<Product[]>(
        null,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      )
    }
  }

  @Post()
  createProduct(
    @Body(new ValidationPipe()) productDto: ProductDto,
  ): ResponseData<Product> {
    try {
      return new ResponseData<Product>(
        this.productService.createProduct(productDto),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      )
    } catch (error) {
      return new ResponseData<Product>(
        null,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      )
    }
  }

  @Get('/:id')
  detailProduct(@Param('id') id: number): ResponseData<Product> {
    try {
      return new ResponseData<Product>(
        this.productService.detailProduct(id),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      )
    } catch (error) {
      return new ResponseData<Product>(
        null,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      )
    }
  }

  @Put('/:id')
  updateProduct(
    @Body() productDto: ProductDto,
    @Param('id') id: number,
  ): ResponseData<Product> {
    try {
      return new ResponseData<Product>(
        this.productService.updateProduct(productDto, id),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      )
    } catch (error) {
      return new ResponseData<Product>(
        null,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      )
    }
  }

  @Delete()
  deleteProduct(): ResponseData<string> {
    try {
      return new ResponseData<string>(
        this.productService.deleteProduct(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      )
    } catch (error) {
      return new ResponseData<string>(
        null,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      )
    }
  }
}
