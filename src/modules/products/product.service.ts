import { Injectable } from '@nestjs/common'
import { ProductDto } from 'src/dto/product.dto'
import { Product } from 'src/models/productModel'

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      catgegoryId: 1,
      productName: 'Product 1',
      price: 100000,
    },
    {
      id: 2,
      catgegoryId: 2,
      productName: 'Product 3',
      price: 200000,
    },
  ]

  getProducts(): Product[] {
    return this.products
  }

  createProduct(productDto: ProductDto): Product {
    const product: Product = {
      id: this.products.length,
      ...productDto,
    }
    this.products.push(product)
    return product
  }

  detailProduct(id: number): Product {
    return this.products.find((product) => product.id === Number(id))
  }

  updateProduct(productDto: ProductDto, id: number): Product {
    const index = this.products.findIndex(
      (product) => product.id === Number(id),
    )
    console.log('index: ', id)
    console.log('before: ', this.products[index])
    this.products[index] = {
      id,
      ...this.products[index],
      ...productDto,
    }
    console.log('after: ', this.products[index])
    return this.products[index]
  }

  deleteProduct(): string {
    return 'POST PRODUCT'
  }
}
