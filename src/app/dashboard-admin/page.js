import DashboardAdminClient from "./AdminClient"
import { getAccessToken } from "@/utils/cookies";
import { decodeAccessToken } from "@/utils/jwt";
import { getUserData } from "@/utils/api";

export default async function() {
  const token = await getAccessToken();
  const userId = await decodeAccessToken();

  const userData = await getUserData(userId, token);

    return(
        <>
            <DashboardAdminClient user={userData.data.user}/>
        </>
    )
}