import React, { createContext, useContext, useEffect, useState } from "react";
import {
  login as backendLogin,
  registerAuth,
  logoutAuth,
  isAuthenticated as hasToken,
  getRole as getBackendRole,
  getUsername as getBackendUsername,
} from "../services/AuthService";

const AuthContext = createContext(null);

const LS_USER = "hh_user";
const LS_SESSION = "hh_session_open";
const LS_ORDERS = "hh_orders";
const LS_LAST_ORDER = "hh_last_order";

function loadAllUsers() {
  try {
    const raw = localStorage.getItem(LS_USER);
    if (!raw) return {};

    const parsed = JSON.parse(raw);

    if (
      parsed &&
      typeof parsed === "object" &&
      !Array.isArray(parsed) &&
      !parsed.email
    ) {
      return parsed;
    }

    if (parsed && parsed.email) {
      return { [parsed.email]: parsed };
    }

    return {};
  } catch {
    return {};
  }
}

function saveAllUsers(map) {
  localStorage.setItem(LS_USER, JSON.stringify(map));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const open = localStorage.getItem(LS_SESSION) === "true";
    const haveToken = hasToken();

    if (!open || !haveToken) {
      const ord = JSON.parse(localStorage.getItem(LS_ORDERS) || "[]");
      setOrders(ord);
      return;
    }

    const email = getBackendUsername();
    const allUsers = loadAllUsers();

    let current = email ? allUsers[email] : null;

    if (current) {
      const backendRole = getBackendRole();
      current = {
        ...current,
        email: current.email || email,
        role: backendRole || current.role || "USER",
      };
      setUser(current);
    }

    const ord = JSON.parse(localStorage.getItem(LS_ORDERS) || "[]");
    setOrders(ord);
  }, []);

  async function register(data) {
    await registerAuth(data);

    const all = loadAllUsers();
    const email = data.email;

    const userToSave = {
      ...data,
      email,
      role: data.role || "USER",
    };

    all[email] = userToSave;
    saveAllUsers(all);

    localStorage.setItem(LS_SESSION, "true");
    setUser(userToSave);
  }

  async function login(email, password) {
    try {
      const { role, username } = await backendLogin(email, password);

      const all = loadAllUsers();

      const base = all[email] || null;

      const newUser = {
        ...(base || {}),
        email,
        role: role || "USER",
        backendUsername: username,
      };

      all[email] = newUser;
      saveAllUsers(all);

      localStorage.setItem(LS_SESSION, "true");
      setUser(newUser);

      return { ok: true };
    } catch (err) {
      console.error("Error en login:", err);
      const msg =
        err.response?.data?.error ||
        "Error al iniciar sesión. Verifica tu correo y contraseña.";
      return { ok: false, msg };
    }
  }

  function logout() {
    logoutAuth();
    localStorage.setItem(LS_SESSION, "false");
    setUser(null);
  }

  function update(data) {
    if (!user || !user.email) {
      return;
    }

    const all = loadAllUsers();
    const email = user.email;

    const merged = {
      ...(all[email] || {}),
      ...user,
      ...data,
    };

    all[email] = merged;
    saveAllUsers(all);
    setUser(merged);
  }

  function addOrder(order) {
    const list = [...orders, order];
    setOrders(list);
    localStorage.setItem(LS_ORDERS, JSON.stringify(list));
    localStorage.setItem(
      LS_LAST_ORDER,
      JSON.stringify({ id: order.id, status: order.status })
    );
  }

  function setLastOrder(id, status) {
    localStorage.setItem(
      LS_LAST_ORDER,
      JSON.stringify({ id, status })
    );
  }

  const isAuthenticated = hasToken() && !!user;
  const role = user?.role || getBackendRole() || "USER";
  const isAdmin = role === "ADMIN";

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        register,
        login,
        logout,
        update,
        addOrder,
        setLastOrder,
        isAuthenticated,
        role,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
