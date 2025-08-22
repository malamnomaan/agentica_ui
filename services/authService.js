import { API_BASE_URL } from "./constants";

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  if (!response.ok || result.is_error) {
    throw new Error(result.message || "Login failed");
  }

  // Save all tokens to localStorage
  Object.entries(result.data).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });

  return result.data; // { refresh, access }
}

export async function getProfile(accessToken) {
  const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  // Save all profile fields to localStorage
  Object.entries(result).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });

  return result;
}

export async function refreshToken(refresh) {
  const response = await fetch(`${API_BASE_URL}/auth/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });
  const result = await response.json();
  if (!response.ok || result.is_error) {
    throw new Error(result.message || "Token refresh failed");
  }
  localStorage.setItem("access", result.data.access);
  return result.data.access;
}