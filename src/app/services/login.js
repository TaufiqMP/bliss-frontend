import AlertBox from "../components/Alert";

export async function login(email, password) {
  const backendUrl = "http://bliss-backend-production.up.railway.app";

  try {
    const res = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log('data', data);

    if (data.success) {
      window.location.href = "/dashboard";
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
  }
}
