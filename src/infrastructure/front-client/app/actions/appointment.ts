import { createAppointment } from "@/hooks/appointment/appointment.service";
import { CreateAppointmentDto } from "@/hooks/appointment/dto/create-appointment.tdo";
import { getSession } from "@/lib/session";
const sessionUser = await getSession();


export const handleAppointmentSubmit = async (formData: any) => {
  const appointmentData: CreateAppointmentDto = {
    userId: sessionUser.sessionUser.id,
    startTime: new Date(formData.startTime),
    endTime: new Date(formData.endTime),
    status: "Scheduled", 
    reason: formData.reason,
    companyId: formData.companyId,
    locationId: formData.locationId ? formData.locationId : undefined,
    maintenanceId: formData.maintenanceId ? formData.maintenanceId : undefined,
    repairId: formData.repairId ? formData.repairId : undefined,
    motorcycleTrialId: formData.motorcycleTrialId ? formData.motorcycleTrialId : undefined,
  };

  try {
    const appointment = await createAppointment(appointmentData);
    console.log("Appointment Created: ", appointment);
  } catch (error) {
    console.error("Error creating appointment: ", error);
  }
};
