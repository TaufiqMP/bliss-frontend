"use client";

import { useEffect } from "react";

export default function LogoutHandler() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      const refreshToken = localStorage.getItem("refreshToken");

      const data = JSON.stringify({ refreshToken });

      navigator.sendBeacon(
        "https://bliss-backend-production.up.railway.app/auth/logout",
        new Blob([data], { type: "application/json" })
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return null;
}
