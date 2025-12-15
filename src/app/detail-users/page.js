export const dynamic = "force-dynamic";

import DetailsUsersPage from "./DetailClient";
import { redirect } from "next/navigation";
import { getAccessToken } from "@/utils/cookies";
import { decodeAccessToken } from "@/utils/jwt";
import { getUserData } from "@/utils/api";

export default async function Page() {

  const token = await getAccessToken();
  const userId = await decodeAccessToken();

  const userData = await getUserData(userId, token);

  if (!token || !userId) {
    redirect("/login");
  }
    
  return (
    <>
      <DetailsUsersPage user={userData.data.user} token={token} userId={userId} /> 
    </>
  )
}
