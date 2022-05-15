import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import { StoreValidator, UpdateValidator } from 'App/Validators/Client'

export default class ClientsController {
  public async index({}: HttpContextContract) {
    const clients = await Client.all()
    return clients
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const client = await Client.create(data)
    return client
  }

  public async show({ params, response }: HttpContextContract) {
    const client = await Client.find(params.id)
    await client?.load('addresses')
    if (!client) {
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

  public async update({ request, params }: HttpContextContract) {
    const client = await Client.findOrFail(params.id)
    const data = await request.validate(UpdateValidator)
    client.merge(data)
    await client.save()
    return client
  }

  public async destroy({ params }: HttpContextContract) {
    const client = await Client.findOrFail(params.id)
    await client.delete()
    return 'Deleted!'
  }
}
