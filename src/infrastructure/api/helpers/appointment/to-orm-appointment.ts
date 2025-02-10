import { Appointment } from "@api/appointment/appointment.entity";
import { AppointmentEntity } from "@domain/entities/appointment/AppointmentEntity";
import { toOrmMaintenance } from "../maintenance/to-orm-maintenance";
import { toOrmRepair } from "../repair/to-orm-repair";
import { AppointmentStatusEnum } from "@api/types/AppointmentStatusEnum";
import { AppointmentReasonEnum } from "@api/types/AppointmentReasonEnum";
import { toOrmMotorcycleTrial } from "../motorcycleTrial/to-orm-motorcycle-trial";
import { toOrmUserCreate } from "../user/to-orm-user-create";
import { toOrmCompanyCreate } from "../company/to-orm-companyCreate";
import { toOrmLocationCreate } from "../location/to-orm-location-create";

export const toOrmAppointmentCreate = (appointment: AppointmentEntity): Appointment => {
  const ormAppointment = new Appointment();
  ormAppointment.user = ormAppointment.user ? toOrmUserCreate(appointment.user) : null;
  ormAppointment.company =  ormAppointment.company? toOrmCompanyCreate(appointment.company) : null;
  ormAppointment.location = appointment.location ? toOrmLocationCreate(appointment.location) : null;
  ormAppointment.maintenance = appointment.maintenance ? toOrmMaintenance(appointment.maintenance) : null;
  ormAppointment.repair = appointment.repair ? toOrmRepair(appointment.repair) : null;
  ormAppointment.motorcycleTrial = appointment.motorcycleTrial ? toOrmMotorcycleTrial(appointment.motorcycleTrial) : null;
  ormAppointment.startTime = new Date(appointment.startTime);
  ormAppointment.endTime = new Date(appointment.endTime);
  ormAppointment.appointmentStatus = appointment.getStatus() as AppointmentStatusEnum;
  ormAppointment.reason = appointment.getReason() as AppointmentReasonEnum;

  return ormAppointment;
};
