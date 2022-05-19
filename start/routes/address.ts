import Route from '@ioc:Adonis/Core/Route'

Route.post('/address', 'AddressesController.store').middleware('auth')
Route.get('/address/:id', 'AddressesController.show').middleware('auth')
Route.put('/address/:id', 'AddressesController.update').middleware('auth')
Route.delete('/address/:id', 'AddressesController.destroy').middleware('auth')
