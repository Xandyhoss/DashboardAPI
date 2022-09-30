import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Sell from './Sell'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public produto: string

  @column()
  public valorCusto: number

  @column()
  public valorVenda: number

  @manyToMany(() => Sell, {
    pivotTable: 'pivot_sells',
    pivotForeignKey: 'product_id',
    pivotRelatedForeignKey: 'sell_id',
  })
  public vendas: ManyToMany<typeof Sell>

  @column()
  public link: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
