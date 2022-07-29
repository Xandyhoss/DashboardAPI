const orderStatus = [
  'transit',
  'pending_payment',
  'waiting_shipment',
  'delivered',
  'canceled',
  'finished',
] as const

type OrderStatus = typeof orderStatus[number]

export { orderStatus, OrderStatus }
