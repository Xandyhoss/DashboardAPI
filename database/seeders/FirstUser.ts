import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class FirstUserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        username: 'Xande',
        password: 'senha',
        entityId: '11117ed8-db49-4666-99e4-5c370adb1288',
      },
      {
        username: 'Gustavo',
        password: 'Gustavo',
        entityId: '32637089-e931-4148-9ca6-daf40e4f57ab',
      },
    ])
  }
}
