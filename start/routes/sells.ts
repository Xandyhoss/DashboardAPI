import Route from '@ioc:Adonis/Core/Route'

Route.post('/sell', 'SellsController.store').middleware('auth')
Route.get('/sell/:id', 'SellsController.show').middleware('auth')
Route.put('/sell/:id', 'SellsController.update').middleware('auth')
