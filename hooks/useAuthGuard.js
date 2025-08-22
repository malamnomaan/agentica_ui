import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "services/authUtils";
import { login, getProfile } from "services/authService";

const PUBLIC_PATHS = ["/", "/auth/login", "/auth/register"];

export default function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    if (!PUBLIC_PATHS.includes(router.pathname) && !isAuthenticated()) {
      router.replace("/auth/login");
    }
  }, [router.pathname]);

  const handleSignIn = async (email, password, setError) => {
    setError("");
    try {
      const tokens = await login(email, password);
      await getProfile(tokens.access);
      router.replace("/dashboard"); // redirect to dashboard after login
    } catch (err) {
      setError(err.message);
    }
  };
}