import DashboardClient from "./dashboardClient";
import { getAccessToken } from "@/utils/cookies";
import { decodeAccessToken } from "@/utils/jwt";
import { getNasabah, getTopThreeUsers } from "@/utils/api";
import { getCount } from "@/utils/api";
import { getUserData } from "@/utils/api";
import { redirect } from "next/navigation";
import { getNasabahSpecific } from "@/utils/api";

export default async function DashboardServer() {


  const token = await getAccessToken();

  const userId = await decodeAccessToken();

  const data = await getNasabahSpecific(userId);

  const topthree = await getTopThreeUsers();

  const openClosed = await getCount(userId);

  const userData = await getUserData(userId, token);

  if (!token || !userId) {
    redirect("/login");
  }


  return (
    <>
      <DashboardClient data={data.data} token={token} userId={userId} topThree={topthree} openClosed={openClosed} user={userData.data} />
    </>
  )
}