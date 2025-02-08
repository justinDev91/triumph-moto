"use client";

import { logout } from "@/lib/session";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <button onClick={handleLogout} className="hover:underline text-left w-full">
      Logout
    </button>
  );
}
