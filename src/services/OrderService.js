const ORDERS_KEY = "hh_orders";
const LAST_ORDER_KEY = "hh_last_order";

function safeParse(json, fallback) {
  try {
    return JSON.parse(json ?? "") ?? fallback;
  } catch {
    return fallback;
  }
}

function loadOrders() {
  return safeParse(localStorage.getItem(ORDERS_KEY), []);
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function appendOrder(order) {
  const orders = loadOrders();
  orders.push(order);
  saveOrders(orders);
  return orders;
}

function setLastOrder(id, status = "success") {
  const payload = {
    id,
    status,
    date: new Date().toISOString(),
  };
  localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(payload));
  return payload;
}

function getLastOrder() {
  return safeParse(localStorage.getItem(LAST_ORDER_KEY), null);
}

function getOrdersByEmail(email) {
  if (!email) return [];
  const orders = loadOrders();
  return orders.filter((o) => o.customer?.email === email);
}

export default {
  loadOrders,
  saveOrders,
  appendOrder,
  setLastOrder,
  getLastOrder,
  getOrdersByEmail,
};
