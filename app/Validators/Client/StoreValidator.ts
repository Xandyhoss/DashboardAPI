import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    nome: schema.string({ trim: true }, [rules.required()]),
    telefone: schema.string({ trim: true }, [
      rules.minLength(10),
      rules.maxLength(11),
      rules.required(),
      rules.unique({ table: 'clients', column: 'telefone' }),
    ]),
    cpf: schema.string({ trim: true }, [
      rules.unique({ table: 'clients', column: 'cpf' }),
      rules.required(),
      rules.maxLength(11),
      rules.minLength(11),
    ]),
  })
  public messages = {
    'nome.required': 'O nome é necessário para criar um cliente',
    'cpf.unique': 'O CPF já existe na base de dados',
    'cpf.required': 'O CPF é necessário para criar um cliente',
    'cpf.maxLength': 'O CPF deve ter 11 caracteres',
    'cpf.minLength': 'O CPF deve ter no máximo 11 caracteres',
    'telefone.minLength': 'O telefone deve ter no mínimo 10 caracteres',
    'telefone.maxLength': 'O telefone deve ter no máximo 11 caracteres',
    'telefone.unique': 'O telefone já existe na base de dados',
    'telefone.required': 'O CPF é necessário para criar um cliente',
  }
}
