import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    nome: schema.string({ trim: true }),
    telefone: schema.string({ trim: true }),
    cpf: schema.string({ trim: true }),
  })
  public messages = {}
}
