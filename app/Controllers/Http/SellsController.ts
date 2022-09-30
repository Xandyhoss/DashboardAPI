import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Sell from 'App/Models/Sell'
import { StoreValidator, UpdateValidator } from 'App/Validators/Sells'

export default class SellsController {
  public async index({}: HttpContextContract) {
    const sells = await Sell.all()
    return sells
  }

  public async store({ request }: HttpContextContract) {
    const sell = await Database.transaction(async (trx) => {
      const data = await request.validate(StoreValidator)
      const sell = new Sell()
      sell.useTransaction(trx)

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

  public async show({ params }: HttpContextContract) {
    const sell = await Sell.findOrFail(params.id)
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

  public async update({ request, params }: HttpContextContract) {
    const sell = await Sell.findOrFail(params.id)
    const data = await request.validate(UpdateValidator)
    sell.merge(data)
    await sell.save()
    return sell
  }

  public async destroy({}: HttpContextContract) {}
}
