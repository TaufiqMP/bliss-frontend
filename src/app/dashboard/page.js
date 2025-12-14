import DashboardClient from "./dashboardClient";
import { getAccessToken } from "@/utils/cookies";
import { decodeAccessToken } from "@/utils/jwt";
import { getNasabah, getTopThreeUsers, getCount, getUserData, getNasabahSpecific } from "@/utils/api";
import { redirect } from "next/navigation";

export default async function DashboardServer() {
  const token = await getAccessToken();
  const userId = await decodeAccessToken();

  if (!token || !userId) {
    redirect("/login");
  }

  const userData = await getUserData(userId, token);

  let data;
  if (userData?.data?.role_id === 1) {
    data = await getNasabah();
  } else {
    data = await getNasabahSpecific(userId);
  }

  const topthree = await getTopThreeUsers();
  const openClosed = await getCount(userId);

  return (
    <>
      <DashboardClient data={data.data} token={token} userId={userId} topThree={topthree} openClosed={openClosed} user={userData.data} />
    </>
  )
}