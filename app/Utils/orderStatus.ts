const orderStatus = [
  'pending_payment',
  'payment_confirmed',
  'waiting_shipment',
  'transit',
  'delivered',
  'canceled',
  'finished',
] as const

type OrderStatus = typeof orderStatus[number]

export { orderStatus, OrderStatus }
