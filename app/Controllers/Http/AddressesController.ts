import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'
import { StoreValidator, UpdateValidator } from 'App/Validators/Address'

export default class AddressesController {
  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const address = await Address.create(data)
    return address
  }

  public async show({ params }: HttpContextContract) {
    const address = await Address.findOrFail(params.id)
    return address.serialize({
      fields: {
        omit: ['createdAt', 'updatedAt'],
      },
    })
  }

  public async update({ params, request }: HttpContextContract) {
    const address = await Address.findOrFail(params.id)
    const data = await request.validate(UpdateValidator)
    address.merge(data)
    await address.save()

    return address
  }

  public async destroy({ params }: HttpContextContract) {
    const address = await Address.findOrFail(params.id)
    address.delete()

    return 'Address deleted!'
  }
}
