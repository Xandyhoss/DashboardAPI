import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sells extends BaseSchema {
  protected tableName = 'sells'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.float('value').defaultTo(0)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('value')
    })
  }
}
