import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    endereco: schema.string.optional({ trim: true }),
    numero: schema.number.optional(),
    bairro: schema.string.optional({ trim: true }),
    cidade: schema.string({ trim: true }),
    cep: schema.string.optional({ trim: true }),
    complemento: schema.string.optional({ trim: true }),
    referencia: schema.string.optional({ trim: true }),
  })
  public messages = {}
}
