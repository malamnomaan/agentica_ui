import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "services/authUtils";

const PUBLIC_PATHS = ["/", "/auth/login", "/auth/register"];

export default function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    if (!PUBLIC_PATHS.includes(router.pathname) && !isAuthenticated()) {
      router.replace("/auth/login");
    }
  }, [router.pathname]);
}