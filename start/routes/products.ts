import Route from '@ioc:Adonis/Core/Route'

Route.get('/products', 'ProductsController.index').middleware('auth')
Route.get('/products/:id', 'ProductsController.show').middleware('auth')
Route.post('/products', 'ProductsController.store').middleware('auth')
Route.put('/products/:id', 'ProductsController.update').middleware('auth')
Route.delete('/products/:id', 'ProductsController.destroy').middleware('auth')
