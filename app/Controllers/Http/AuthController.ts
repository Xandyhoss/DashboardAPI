import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiToken from 'App/Models/ApiToken'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const { username, password } = await request.all()
    const user = await auth.authenticate()
    if (user) {
      const apiToken = await ApiToken.findBy('user_id', user.id)
      if (apiToken) {
        apiToken.delete()
      }
    }
    const token = await auth.attempt(username, password, {
      expiresIn: '7 days',
    })

    return token
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.logout()
    return 'Deleted'
  }
}
