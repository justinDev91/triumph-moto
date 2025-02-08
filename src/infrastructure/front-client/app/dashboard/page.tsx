"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/session";

export default function Example() {
  const router = useRouter();
  useEffect(() => {
    async function checkSession() {
      const sessionData = await getSession();
      if (sessionData === null) {
        router.push("/Sign/In");
      }
    }
    checkSession();
  }, [router]);

  return <h1>Content</h1>;
}
