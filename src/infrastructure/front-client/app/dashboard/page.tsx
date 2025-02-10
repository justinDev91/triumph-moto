"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/session";

export default function Example() {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      const sessionData = await getSession();
      if (isMounted && sessionData === null) {
        router.push("/Sign/In");
      }
    }

    checkSession();

    return () => {
      isMounted = false;
    };
  }, []);

  return <h1>Content</h1>;
}
