import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { orderStatus } from 'App/Utils'

export default class Sells extends BaseSchema {
  protected tableName = 'sells'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('client_id')
        .unsigned()
        .references('clients.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('address_id')
        .unsigned()
        .references('addresses.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('entity_id').references('entities.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.enu('status', orderStatus).defaultTo('pending_payment')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
