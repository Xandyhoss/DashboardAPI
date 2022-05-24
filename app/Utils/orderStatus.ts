const orderStatus = [
  'transit',
  'pending_payment',
  'waiting_shipment',
  'delivered',
  'canceled',
  'finished',
]

type OrderStatus = typeof orderStatus[number]

export { orderStatus, OrderStatus }
