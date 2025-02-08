export default async function getSessionUser() {
  const response = await fetch("/api/get-session", {
    method: "GET",
    credentials: "include",
  });
  if (response.ok) {
    return await response.json();
  } else {
    return { ok: false };
  }
}
