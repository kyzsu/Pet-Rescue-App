// perlu dijelasin ga?
// persis kek getPastOrders kecuali ini response single order.
export default async function getPastOrder(order) {
  const response = await fetch(`/api/past-order/${order}`);
  const data = await response.json();
  return data;
}
