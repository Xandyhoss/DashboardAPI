import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'AuthController.login')
  Route.delete('/', 'AuthController.logout').middleware('auth')
}).prefix('/auth')
