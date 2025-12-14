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

  const decoded = await decodeAccessToken();

  let data;

  if (decoded.role_id === 1) {
    data = await getNasabah();
  } else {
    data = await getNasabahSpecific(decoded.user_id);
  }

  const topthree = await getTopThreeUsers();

  const openClosed = await getCount(decoded.user_id);

  const userData = await getUserData(decoded.user_id, token);

  if (!token || !userId) {
    redirect("/login");
  }


  return (
    <>
      <DashboardClient data={data.data} token={token} userId={decoded.user_id} topThree={topthree} openClosed={openClosed} user={userData.data} />
    </>
  )
}