import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Product from './Product'
import Sell from './Sell'
import User from './User'

export default class Entity extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Client)
  public clients: HasMany<typeof Client>

  @hasMany(() => Product)
  public products: HasMany<typeof Product>

  @hasMany(() => Sell)
  public sells: HasMany<typeof Sell>

  @hasMany(() => User)
  public users: HasMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
