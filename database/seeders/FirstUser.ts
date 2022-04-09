import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class FirstUserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        username: 'Xande',
        password: 'senha',
      },
      {
        username: 'Gustavo',
        password: 'Gustavo',
      },
    ])
  }
}
