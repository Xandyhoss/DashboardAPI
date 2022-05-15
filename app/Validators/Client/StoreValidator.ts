import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    nome: schema.string({ trim: true }),
    telefone: schema.string({ trim: true }),
    cpf: schema.string({ trim: true }, [rules.unique({ table: 'clients', column: 'cpf' })]),
  })
  public messages = {
    'cpf.unique': 'O CPF deve ser único',
  }
}
