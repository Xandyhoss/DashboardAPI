import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import { StoreValidator, UpdateValidator } from 'App/Validators/Products'

export default class ProductsController {
  public async index({ auth }: HttpContextContract) {
    const entityId = await auth.user?.entityId
    const products = await Product.query().where('entity_id', entityId!)
    const productsJSON = products.map((product) => {
      return product.serialize({
        fields: {
          omit: ['createdAt', 'updatedAt'],
        },
      })
    })
    return productsJSON
  }

  public async store({ auth, request }: HttpContextContract) {
    const entityId = await auth.user?.entityId
    const data = await request.validate(StoreValidator)
    const product = await Product.create({ ...data, entityId })

    return product
  }

  public async show({ auth, params }: HttpContextContract) {
    const entityId = await auth.user?.entityId
    const product = await Product.findOrFail(params.id)
    if (product.entityId !== entityId) {
      return 'Product not found!'
    }
    await product.load('vendas')
    return product
  }

  public async update({ auth, params, request }: HttpContextContract) {
    const entityId = await auth.user?.entityId
    const product = await Product.findOrFail(params.id)
    const data = await request.validate(UpdateValidator)
    if (product.entityId === entityId) {
      await product.merge(data)
      await product.save()
      return product
    }
    return 'Operation not allowed!'
  }

  public async destroy({ auth, params }: HttpContextContract) {
    const entityId = await auth.user?.entityId
    const product = await Product.findOrFail(params.id)
    if (product.entityId === entityId) {
      await product.delete()
      return 'Deleted!'
    }
    return 'Product out of range!'
  }
}
