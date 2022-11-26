import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Addresses extends BaseSchema {
  protected tableName = 'addresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('client_id')
        .references('id')
        .inTable('clients')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .unsigned()
      table.string('entity_id').references('entities.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.string('endereco').notNullable()
      table.string('numero')
      table.string('bairro').notNullable()
      table.string('cep').notNullable()
      table.string('complemento')
      table.string('referencia')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
