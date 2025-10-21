import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const LS_USER = "hh_user";
const LS_SESSION = "hh_session_open";
const LS_ORDERS = "hh_orders";
const LS_LAST_ORDER = "hh_last_order";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const open = localStorage.getItem(LS_SESSION) === "true";
    const raw = localStorage.getItem(LS_USER);
    if (open && raw) setUser(JSON.parse(raw));

    const ord = JSON.parse(localStorage.getItem(LS_ORDERS) || "[]");
    setOrders(ord);
  }, []);

  function register(data) {
    localStorage.setItem(LS_USER, JSON.stringify(data));
    localStorage.setItem(LS_SESSION, "true");
    setUser(data);
  }

  function login(email, password) {
    const raw = localStorage.getItem(LS_USER);
    if (!raw) return { ok: false, msg: "No existe un usuario registrado." };
    const saved = JSON.parse(raw);
    if (saved.email === email && saved.password === password) {
      localStorage.setItem(LS_SESSION, "true");
      setUser(saved);
      return { ok: true };
    }
    return { ok: false, msg: "Correo o contraseña incorrectos." };
  }

  function logout() {
    localStorage.setItem(LS_SESSION, "false");
    setUser(null);
  }

  function update(data) {
    localStorage.setItem(LS_USER, JSON.stringify(data));
    setUser(data);
  }

  // === Pedidos ===
  function addOrder(order) {
    const list = [...orders, order];
    setOrders(list);
    localStorage.setItem(LS_ORDERS, JSON.stringify(list));
    localStorage.setItem(LS_LAST_ORDER, JSON.stringify({ id: order.id, status: order.status }));
  }

  function setLastOrder(id, status) {
    localStorage.setItem(LS_LAST_ORDER, JSON.stringify({ id, status }));
  }

  return (
    <AuthContext.Provider value={{ user, orders, register, login, logout, update, addOrder, setLastOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}