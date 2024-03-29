import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Entities extends BaseSchema {
  protected tableName = 'entities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
