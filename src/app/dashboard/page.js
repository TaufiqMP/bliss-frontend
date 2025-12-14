import DashboardClient from "./dashboardClient";
import { getAccessToken } from "@/utils/cookies";
import { decodeAccessToken } from "@/utils/jwt";
import { getNasabah, getTopThreeUsers } from "@/utils/api";
import { getCount } from "@/utils/api";
import { getUserData } from "@/utils/api";
import { redirect } from "next/navigation";

export default async function DashboardServer() {
  const data = await getNasabah();

  const token = await getAccessToken();
  console.log(`INI TOKENNNNNNNNN : ${token}`);

  const userId = await decodeAccessToken();

  const topthree = await getTopThreeUsers();

  const openClosed = await getCount(userId);
  const userData = await getUserData(userId, token);

  if (!token || !userId) {
    redirect("/login");
  }


  return (
    <>
      <DashboardClient data={data} token={token} userId={userId} topThree={topthree} openClosed={openClosed} user={userData.data} />
    </>
  )
}