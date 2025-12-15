import AdminClient from "./AdminClient"
import { getAccessToken } from "@/utils/cookies";
import { decodeAccessToken } from "@/utils/jwt";

export default async function() {
        const token = await getAccessToken();
        const userId = await decodeAccessToken(token);
    return(
        <>
            <AdminClient userId={userId} />
        </>
    )
}