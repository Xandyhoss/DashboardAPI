import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    clientId: schema.number([rules.exists({ table: 'clients', column: 'id' })]),
    addressId: schema.number([rules.exists({ table: 'addresses', column: 'id' })]),
    productsIds: schema
      .array()
      .members(schema.number([rules.exists({ table: 'products', column: 'id' })])),
  })
  public messages = {}
}
