import Route from '@ioc:Adonis/Core/Route'

Route.resource('/clients', 'ClientsController')
  .apiOnly()
  .middleware({
    store: ['auth'],
    index: ['auth'],
    update: ['auth'],
    show: ['auth'],
    destroy: ['auth'],
  })
