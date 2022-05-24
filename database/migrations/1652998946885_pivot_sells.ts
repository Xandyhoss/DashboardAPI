import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PivotSells extends BaseSchema {
  protected tableName = 'pivot_sells'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('sell_id')
        .unsigned()
        .references('sells.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('product_id')
        .unsigned()
        .references('products.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
