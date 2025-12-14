/* eslint-disable */

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";

const ProtectedRoutesAdmin = (Component) => {
    return (props) => {
        const backendUrl = `https://bliss-backend-production.up.railway.app/`;
        const router = useRouter();
        const [isAuth, setIsAuth] = useState(null);
        const [user, setUser] = useState(null);

        useEffect(() => {
            const checkAuth = async () => {
                try {
                    const res = await fetch(`${backendUrl}auth/verify`, { credentials: "include" });
                    if (!res.ok) {
                        router.replace("/login");
                        return;
                    }

                    const { user } = await res.json();
                    setUser(user)
                    console.log(user)
                    if (user && user.role_id === 1) {
                        setIsAuth(true);
                    } else {
                        router.replace("/forbiden");
                    }
                } catch (err) {
                    router.replace("/login");
                }
            };
            checkAuth();
        }, [router]);

        if (isAuth === null) {
            return <LoadingPage />
        }

        if (isAuth && user) {
            return <Component {...props} user={user} />;
        }

        return <LoadingPage />;
    };
};

export default ProtectedRoutesAdmin;
