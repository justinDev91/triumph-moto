"use server";

import axios from "axios";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function handleAppointmentSubmit(formData: FormData) {
  const startTime = formData.get("startTime");
  const endTime = formData.get("endTime");
  const reason = formData.get("reason");
  const companyId = formData.get("companyId");
  const locationId = formData.get("locationId");
  const repairId = formData.get("repairId") || null;

  const sessionUser = await getSession();

  await axios.post("http://localhost:3000/appointments", {
    userId: sessionUser.sessionUser.id,
    startTime,
    endTime,
    reason,
    companyId,
    locationId,
    repairId,
    status: "Scheduled",
  });

  redirect("/dashboard/appointment");
}
