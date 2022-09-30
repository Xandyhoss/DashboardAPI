import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    produto: schema.string({ trim: true }, [rules.required()]),
    valorCusto: schema.number([rules.required()]),
    valorVenda: schema.number([rules.required()]),
    link: schema.string({ trim: true }, [rules.required()]),
  })
  public messages = {
    'produto.required': 'É necessário inserir o nome do produto',
    'valorCusto.required': 'É necessário inserir um valor de custo',
    'valorVenda.required': 'É necessário inserir um valor de venda',
    'link.required': 'É necessário inserir o link externo do produto',
  }
}
