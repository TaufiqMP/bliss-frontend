import { cookies } from "next/headers";

export async function getCookie(name) {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(name);
    return cookie?.value || null;
  } catch (error) {
    console.log("Error getting cookie:", error);
    return null;
  }
}

export async function getAllCookies() {
  try {
    const cookieStore = await cookies();
    const allCookies = {};
    
    cookieStore.getAll().forEach((cookie) => {
      allCookies[cookie.name] = cookie.value;
    });
    
    return allCookies;
  } catch (error) {
    console.log("Error getting all cookies:", error);
    return {};
  }
}


export async function getAccessToken() {
  return getCookie("accessToken");
}

export async function getRefreshToken() {
  return getCookie("refreshToken");
}