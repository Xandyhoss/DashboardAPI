import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    produto: schema.string.optional({ trim: true }),
    valorCusto: schema.number.optional(),
    valorVenda: schema.number.optional(),
    link: schema.string.optional({ trim: true }),
  })
  public messages = {}
}
