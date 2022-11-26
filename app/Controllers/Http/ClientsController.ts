import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import { StoreValidator, UpdateValidator } from 'App/Validators/Client'

export default class ClientsController {
  public async index({ auth }: HttpContextContract) {
    const entityId = await auth.user?.entityId
    const clients = await Client.query().where('entity_id', entityId!)
    return clients
  }

  public async store({ auth, request }: HttpContextContract) {
    const entityId = await auth.user?.entityId
    const data = await request.validate(StoreValidator)
    const client = await Client.create({ ...data, entityId })
    return client
  }

  public async show({ auth, params, response }: HttpContextContract) {
    const entityId = await auth.user?.entityId
    const client = await Client.find(params.id)
    await client?.load((loader) => {
      loader.load('addresses').load('compras')
    })
    if (!client || client.entityId !== entityId) {
      return response.notFound({ message: 'Usuário não encontrado' })
    }
    return client.serialize({
      relations: {
        addresses: {
          fields: {
            omit: ['createdAt', 'updatedAt', 'clientId'],
          },
        },
      },
    })
  }

  public async update({ request, params, auth }: HttpContextContract) {
    const entityId = await auth.user?.entityId
    const client = await Client.findOrFail(params.id)
    const data = await request.validate(UpdateValidator)
    if (client.entityId === entityId) {
      await client.merge(data)
      await client.save()
      return client
    }
    return 'Operation not allowed!'
  }

  public async destroy({ params, auth }: HttpContextContract) {
    const entityId = await auth.user?.entityId
    const client = await Client.findOrFail(params.id)
    if (client.entityId === entityId) {
      await client.delete()
      return 'Deleted!'
    }
    return 'Client out of range!'
  }
}
