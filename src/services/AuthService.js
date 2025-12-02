import axios from "axios";

const AUTH_URL = "http://98.92.68.135:9090/auth";

export async function login(email, password) {
  const response = await axios.post(`${AUTH_URL}/login`, {
    email,
    password,
  });

  const { token, username, role } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
  localStorage.setItem("role", role);

  return { token, username, role };
}

export async function registerAuth(userData) {
  const body = {
    firstName: userData.nombre,
    lastName: userData.apellido,
    email: userData.email,
    street: userData.calle,
    region: userData.region,
    comuna: userData.comuna,
    password: userData.password,
    role: userData.role || "USER",
  };

  const response = await axios.post(`${AUTH_URL}/register`, body);
  return response.data;
}

export function logoutAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export function getUsername() {
  return localStorage.getItem("username");
}

export function getRole() {
  return localStorage.getItem("role");
}

export function isAdmin() {
  return localStorage.getItem("role") === "ADMIN";
}
