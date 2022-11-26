import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class FirstUserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        username: 'Xande',
        password: 'senha',
        entityId: '3fc92790-b084-4b9c-ae41-14b93301dc93',
      },
      {
        username: 'Gustavo',
        password: 'Gustavo',
        entityId: 'dbb89597-de77-45e1-aeb5-a00f397d64b9',
      },
    ])
  }
}
