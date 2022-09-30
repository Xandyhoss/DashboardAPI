import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Entity from 'App/Models/Entity'
import { v4 as uuid } from 'uuid'

export default class EntitySeeder extends BaseSeeder {
  public async run() {
    await Entity.create({ id: uuid() })
  }
}
