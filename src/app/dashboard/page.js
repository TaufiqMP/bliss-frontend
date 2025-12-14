import DashboardClient from "./dashboardClient";
import { getAccessToken } from "@/utils/cookies";
import { decodeAccessToken } from "@/utils/jwt";
import { getNasabah, getTopThreeUsers, getCount, getUserData, getNasabahSpecific, getCountAdmin } from "@/utils/api";
import { redirect } from "next/navigation";

export default async function DashboardServer() {
  const token = await getAccessToken();

  const userId = await decodeAccessToken();

  const topthree = await getTopThreeUsers();

  const openClosed = await getCount(userId);

  const userData = await getUserData(userId, token);

  let data;
  if (userData?.data?.user?.role_id == 1) {
    data = await getNasabah();
  } else {
    data = await getNasabahSpecific(userId);
  }

  let count;
  if (userData?.data?.user?.role_id == 1) {
    count = await getCountAdmin();
  } else {
    count = await getCount(userId);
  }

  if (!token || !userId) {
    redirect("/login");
  }

  return (
    <>
      <DashboardClient data={data.data} token={token} userId={userId} topThree={topthree} openClosed={count} user={userData.data} />
    </>
  )
}