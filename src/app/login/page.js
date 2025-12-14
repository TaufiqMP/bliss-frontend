import LoginPage from "./LoginClient"
import { getAccessToken } from "@/utils/cookies"
import { redirect } from "next/navigation";

export default async function LoginServer() {
  const accessToken = await getAccessToken();


  return (
    <>
      <LoginPage />
    </>
  )
}