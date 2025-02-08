"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import activation from "@/app/actions/activation";

export default function ActivatePage() {
  const router = useRouter();
  const { id } = useParams();
  const [message, setMessage] = useState<string>("Activation en cours...");
  if (typeof id !== "string") {
    throw new Error("Invalid id");
  }

  useEffect(() => {
    const activate = async () => {
      try {
        const response = await activation(id);
        if (response === 200) {
          router.push("/Sign/In");
        } else {
          setMessage("Une erreur est survenue lors de l'activation.");
        }
      } catch (error) {
        setMessage("Une erreur est survenue lors de l'activation.");
        console.error("An error occurred during activation:", error);
      }
    };
    activate();
  }, [id, router]);

  return <div>{message}</div>;
}
