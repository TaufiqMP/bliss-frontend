import DashboardClient from "./dashboardClient";
import { getAccessToken } from "@/utils/cookies";
import { decodeAccessToken } from "@/utils/jwt";
import { getTopThreeUsers } from "@/utils/api";
import { getCount } from "@/utils/api";
import { getUserData } from "@/utils/api";
import { redirect } from "next/navigation";

export default async function DashboardServer() {
  const res = await fetch('https://bliss-backend-production.up.railway.app/nasabah');
  const data = await res.json();

  const token = await getAccessToken();
  const userId = await decodeAccessToken();

  const topthree = await getTopThreeUsers();

  const openClosed = await getCount(userId);
  const userData = await getUserData(userId, token);

  /*
  if (!userId) {
    redirect("/login");
  }
    */


  return (
    <>
      <DashboardClient data={data.data} token={token} userId={userId} topThree={topthree} openClosed={openClosed} user={userData.data} />
    </>
  )
}