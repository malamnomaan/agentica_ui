import jwt_decode from "jwt-decode";

export function isAuthenticated() {
  const token = localStorage.getItem("access");
  if (!token) return false;
  try {
    const decoded = jwt_decode(token);
    if (decoded.exp * 1000 < Date.now()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}