export async function registerUser({ username, email, password }) {
   const url = `http://bliss-backend-production.up.railway.app/auth/register`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || JSON.stringify(data) || 'Register failed');
  }
  return data;
}
