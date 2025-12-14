import jwt from "jsonwebtoken";
import { getAccessToken } from "./cookies";

export async function decodeAccessToken() {
  try {
    const token = await getAccessToken();
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    console.log(decoded);

    return decoded;
  } catch (err) {
    console.error("Failed to decode access token:", err.message);
    return null;
  }
}
