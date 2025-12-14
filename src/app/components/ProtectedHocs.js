/* eslint-disable */

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";

const ProtectedRoutes = (Component) => {
  return (props) => {
    const backendUrl = `http://localhost:3000/auth/`;
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await fetch(`${backendUrl}verify`, { credentials: "include" });
          if (res.ok) {
            setIsAuth(true);
          } else {
            router.push("/login");
          }
        } catch (err) {
          router.push("/login");
        }
      };
      checkAuth();
    }, [router]);

    if (isAuth === null) {
      return <LoadingPage />
    }

    return <Component {...props} />;
  };
};

export default ProtectedRoutes;
