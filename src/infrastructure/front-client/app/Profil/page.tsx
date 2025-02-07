"use client";
import getSessionUser from "@/hooks/user/getSessionUser";
import React, { useEffect } from "react";

export default function Profil() {
  useEffect(() => {
    async function checkSession() {
      const getSessionResponse = await getSessionUser();
      console.log(getSessionResponse);
    }
    checkSession();
  }, []);
  return <div>page</div>;
}
