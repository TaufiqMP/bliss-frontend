"use client";

import DetailsUsersAdminPage from "@/app/components/adminPage/DetailUsersAdmin";
import ProtectedRoutes from "../../../components/ProtectedHocs";


function DetailsUsersAdmin() {
    return (
        <>
            <DetailsUsersAdminPage />
        </>
    );
}
export default ProtectedRoutes(DetailsUsersAdmin)
