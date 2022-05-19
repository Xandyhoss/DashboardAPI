import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    produto: schema.string({ trim: true }),
    valorCusto: schema.number(),
    valorVenda: schema.number(),
    link: schema.string({ trim: true }),
  })
  public messages = {}
}
