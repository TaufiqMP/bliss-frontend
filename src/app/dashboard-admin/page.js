import DashboardAdminClient from "./AdminClient"

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