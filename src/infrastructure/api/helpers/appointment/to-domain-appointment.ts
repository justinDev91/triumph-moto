import { AppointmentEntity } from "@domain/entities/appointment/AppointmentEntity";
import { toDomainUser } from "../user/to-domain-user";
import { toDomainCompany } from "../company/to-domain-company";
import { toDomainLocation } from "../location/to-domain-location";
import { toDomainMaintenance } from "../maintenance/to-domain-maintenance";
import { toDomainRepair } from "../repair/to-domain-repair";
import { UserEntity } from "@domain/entities/user/UserEntity";
import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { RepairEntity } from "@domain/entities/repair/RepairEntity";
import { MotorcycleTrialEntity } from "@domain/entities/motorcycle/MotorcycleTrialEntity";
import { Appointment } from "@api/appointment/appointment.entity";
import { toDomainMotorcycleTrial } from "../motorcycleTrial/to-domain-motorcycle-trial";

export const toDomainAppointment = (appointmentOrm: Appointment): AppointmentEntity => {
  const user = appointmentOrm.user ? toDomainUser(appointmentOrm.user) : null;
  const company = appointmentOrm.company ? toDomainCompany(appointmentOrm.company) : null;
  const location = appointmentOrm.location ? toDomainLocation(appointmentOrm.location) : null;
  const maintenance = appointmentOrm.maintenance ? toDomainMaintenance(appointmentOrm.maintenance) : null;
  const repair = appointmentOrm.repair ? toDomainRepair(appointmentOrm.repair) : null;
  const motorcycleTrial = appointmentOrm.motorcycleTrial ? toDomainMotorcycleTrial(appointmentOrm.motorcycleTrial) : null;

  return AppointmentEntity.create(
    appointmentOrm.id,
    user as UserEntity,
    appointmentOrm.startTime,
    appointmentOrm.endTime,
    appointmentOrm.appointmentStatus,
    appointmentOrm.createdAt,
    appointmentOrm.updatedAt,
    appointmentOrm.reason,
    company as CompanyEntity,
    location,
    maintenance,
    repair as RepairEntity | null,
    motorcycleTrial as MotorcycleTrialEntity | null
  ) as AppointmentEntity;
};
