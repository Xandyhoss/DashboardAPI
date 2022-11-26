import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Sell from 'App/Models/Sell'
import { StoreValidator, UpdateValidator } from 'App/Validators/Sells'

export default class SellsController {
  public async index({ auth }: HttpContextContract) {
    const entityId = await auth.user?.entityId
    const sells = await Sell.query().where('entity_id', entityId!)
    return sells
  }

  public async store({ auth, request }: HttpContextContract) {
    const sell = await Database.transaction(async (trx) => {
      const entityId = await auth.user?.entityId
      const data = await request.validate(StoreValidator)
      const sell = new Sell()
      sell.useTransaction(trx)

      sell.entityId = entityId!
      sell.clientId = data.clientId
      sell.addressId = data.addressId
      const products = data.productsIds

      await sell.save()

      await sell.related('products').attach(products)

      await sell.load((loader) => {
        loader.load('products').load('client').load('address')
      })

      const value = sell.products.reduce((accumulator, product) => {
        return accumulator + product.valorVenda
      }, 0)

      sell.value = value

      await sell.save()

      return sell
    })
    return sell
  }

  public async show({ auth, params }: HttpContextContract) {
    const entityId = await auth.user?.entityId
    const sell = await Sell.findOrFail(params.id)
    if (sell.entityId !== entityId) {
      return 'Sell not found!'
    }
    await sell.load((loader) => {
      loader.load('products').load('client').load('address')
    })
    return sell.serialize({
      fields: {
        omit: ['updatedAt'],
      },
      relations: {
        products: {
          fields: {
            omit: ['createdAt', 'updatedAt'],
          },
        },
        address: {
          fields: {
            omit: ['createdAt', 'updatedAt'],
          },
        },
        client: {
          fields: {
            omit: ['createdAt', 'updatedAt'],
          },
        },
      },
    })
  }

  public async update({ auth, request, params }: HttpContextContract) {
    const entityId = await auth.user?.entityId
    const sell = await Sell.findOrFail(params.id)
    const data = await request.validate(UpdateValidator)
    if (sell.entityId === entityId) {
      await sell.merge(data)
      await sell.save()
      return sell
    }
    return 'Operation not allowed!'
  }

  public async destroy({}: HttpContextContract) {}
}
