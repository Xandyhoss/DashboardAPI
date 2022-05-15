import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    clientId: schema.number([rules.exists({ table: 'clients', column: 'id' })]),
    endereco: schema.string({ trim: true }),
    numero: schema.number(),
    bairro: schema.string({ trim: true }),
    cep: schema.string({ trim: true }),
    complemento: schema.string.optional({ trim: true }),
    referencia: schema.string.optional({ trim: true }),
  })
  public messages = {}
}
