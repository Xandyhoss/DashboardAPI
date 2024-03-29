import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Entity from './Entity'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({})
  public clientId: number

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @column()
  public endereco: string

  @column()
  public numero: number

  @column()
  public bairro: string

  @column()
  public cep: string

  @column()
  public complemento: string

  @column()
  public cidade: string

  @column()
  public referencia: string

  @column()
  public entityId: string

  @belongsTo(() => Entity)
  public entity: BelongsTo<typeof Entity>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
