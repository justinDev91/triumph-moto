"use client";

import { logout } from "@/lib/session";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      className="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
    >
      Logout
    </button>
  );
}
