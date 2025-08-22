import jwt_decode from "jwt-decode";
import { refreshToken } from "./authService";

export async function isAuthenticated() {
  let token = localStorage.getItem("access");
  if (!token) return false;
  try {
    const decoded = jwt_decode(token);
    if (decoded.exp * 1000 < Date.now()) {
      // Token expired, try to refresh
      const refresh = localStorage.getItem("refresh");
      if (!refresh) return false;
      try {
        token = await refreshToken(refresh);
        return true;
      } catch {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}