"use server";

import axios from "axios";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function handleLocationSubmit(formData: FormData) {
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const motorcycleId = formData.get("motorcycle");

  const sessionUser = await getSession();

  console.log("Start Date:", startDate);
  console.log("End Date:", endDate);
  console.log("Motorcycle ID:", motorcycleId);

  await axios.post("http://localhost:3000/locations", {
    motorcycleId: motorcycleId,
    userId: sessionUser.sessionUser.id,
    startDate: startDate,
    endDate: endDate,
    cost: 100,
  });
  redirect("/dashboard/location");
}
