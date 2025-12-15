import DashboardAdminClient from "./DashboardAdminClient"
import { getAccessToken } from "@/utils/cookies";
import { decodeAccessToken } from "@/utils/jwt";
import { getUserData } from "@/utils/api";


export const dynamic = 'force-dynamic';

export default async function ServerAdmin() {
  const token = await getAccessToken();

  const userId = await decodeAccessToken();

  const userData = await getUserData(userId, token);

    return(
        <>
            <DashboardAdminClient user={userData.data.user}/>
        </>
    )
}