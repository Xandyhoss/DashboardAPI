import Route from '@ioc:Adonis/Core/Route'

Route.post('/address', 'AddressesController.store').middleware('auth')
Route.get('/address/:id', 'AddressesController.show').middleware('auth')
