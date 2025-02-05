import { Appointment } from "@infrastructure/appointment/appointment.entity";
import { AppointmentEntity } from "@domain/entities/appointment/AppointmentEntity";
import { toOrmLocation } from "../location/to-orm-location";
import { toOrmMaintenance } from "../maintenance/to-orm-maintenance";
import { toOrmRepair } from "../repair/to-orm-repair";
import { AppointmentStatusEnum } from "@infrastructure/types/AppointmentStatusEnum";
import { AppointmentReasonEnum } from "@infrastructure/types/AppointmentReasonEnum";
import { toOrmMotorcycleTrial } from "../motorcycleTrial/to-orm-motorcycle-trial";
import { toOrmUserCreate } from "../user/to-orm-user-create";
import { toOrmCompanyCreate } from "../company/to-orm-companyCreate";

export const toOrmAppointmentCreate = (appointment: AppointmentEntity): Appointment => {
  const ormAppointment = new Appointment();
  ormAppointment.user = toOrmUserCreate(appointment.user);
  ormAppointment.company = toOrmCompanyCreate(appointment.company);
  ormAppointment.location = appointment.location ? toOrmLocation(appointment.location) : null;
  ormAppointment.maintenance = appointment.maintenance ? toOrmMaintenance(appointment.maintenance) : null;
  ormAppointment.repair = appointment.repair ? toOrmRepair(appointment.repair) : null;
  ormAppointment.motorcycleTrial = appointment.motorcycleTrial ? toOrmMotorcycleTrial(appointment.motorcycleTrial) : null;
  ormAppointment.startTime = new Date(appointment.startTime);
  ormAppointment.endTime = new Date(appointment.endTime);
  ormAppointment.appointmentStatus = appointment.getStatus() as AppointmentStatusEnum;
  ormAppointment.reason = appointment.getReason() as AppointmentReasonEnum;

  return ormAppointment;
};
