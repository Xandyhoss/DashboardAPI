import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'
import { StoreValidator, UpdateValidator } from 'App/Validators/Address'

export default class AddressesController {
  public async store({ auth, request }: HttpContextContract) {
    const entityId = await auth.user?.entityId
    const data = await request.validate(StoreValidator)
    const address = await Address.create({ ...data, entityId })
    return address
  }

  public async show({ auth, params }: HttpContextContract) {
    const entityId = await auth.user?.entityId
    const address = await Address.findOrFail(params.id)
    if (address.entityId !== entityId) {
      return 'Address not found!'
    }
    return address.serialize({
      fields: {
        omit: ['createdAt', 'updatedAt'],
      },
    })
  }

  public async update({ auth, params, request }: HttpContextContract) {
    const entityId = await auth.user?.entityId
    const address = await Address.findOrFail(params.id)
    const data = await request.validate(UpdateValidator)
    if (address.entityId === entityId) {
      await address.merge(data)
      await address.save()
      return address
    }
    return 'Operation not allowed!'
  }

  public async destroy({ auth, params }: HttpContextContract) {
    const entityId = await auth.user?.entityId
    const address = await Address.findOrFail(params.id)
    if (address.entityId === entityId) {
      await address.delete()
      return 'Address deleted!'
    }
    return 'Operation not allowed!'
  }
}
