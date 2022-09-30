import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { OrderStatus } from 'App/Utils'
import Product from './Product'
import Client from './Client'
import Address from './Address'
import Entity from './Entity'

export default class Sell extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public clientId: number

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @column()
  public addressId: number

  @belongsTo(() => Address)
  public address: BelongsTo<typeof Address>

  @column()
  public status: OrderStatus

  @manyToMany(() => Product, {
    pivotTable: 'pivot_sells',
    pivotForeignKey: 'sell_id',
    pivotRelatedForeignKey: 'product_id',
  })
  public products: ManyToMany<typeof Product>

  @column()
  public value: number

  @belongsTo(() => Entity)
  public entity: BelongsTo<typeof Entity>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
