export class Product {
  id?: number
  catgegoryId?: number
  productName: string
  price?: number

  constructor({ id, catgegoryId, productName, price }) {
    if (id) this.id = id
    if (catgegoryId) this.catgegoryId = catgegoryId
    if (productName) this.productName = productName
    if (price) this.price = price
    return this
  }
}
