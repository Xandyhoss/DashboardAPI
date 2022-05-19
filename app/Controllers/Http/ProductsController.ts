import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import { StoreValidator, UpdateValidator } from 'App/Validators/Products'

export default class ProductsController {
  public async index({}: HttpContextContract) {
    const products = await Product.all()
    const productsJSON = products.map((product) => {
      return product.serialize({
        fields: {
          omit: ['createdAt', 'updatedAt'],
        },
      })
    })
    return productsJSON
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const product = await Product.create(data)

    return product
  }

  public async show({ params }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)
    return product
  }

  public async update({ params, request }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)
    const data = await request.validate(UpdateValidator)

    await product.merge(data)
    return product
  }

  public async destroy({ params }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)
    product.delete()

    return 'Product deleted'
  }
}
