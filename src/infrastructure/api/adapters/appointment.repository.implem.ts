import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppointmentRepositoryInterface } from "@application/repositories/AppointmentRepositoryInterface";
import { AppointmentEntity } from "@domain/entities/appointment/AppointmentEntity";
import { AppointmentNotFoundError } from "@domain/errors/appointment/AppointmentNotFoundError";
import { AppointmentReasonEnum } from '@api/types/AppointmentReasonEnum';
import { toDomainAppointment } from "@helpers/appointment/to-domain-appointment";
import { toOrmAppointmentCreate } from "@helpers/appointment/to-orm-appointment";
import { Appointment } from "@api/appointment/appointment.entity";
import { AppointmentStatusEnum } from "@api/types/AppointmentStatusEnum";
import { Maintenance } from "../maintenances/maintenance.entity";
import { MaintenanceTypeEnum } from "../types/MaintenanceTypeEnum";

@Injectable()
export class AppointmentRepositoryImplem implements AppointmentRepositoryInterface {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,

    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>
  ) {}

 
  async complete(id: string): Promise<void> {
     await this.appointmentRepository.update(id, {
      appointmentStatus: AppointmentStatusEnum.Completed,
      updatedAt: new Date(),
    });
  }
  
  async cancel(id: string): Promise<void> {
    await this.appointmentRepository.update(id, {
      appointmentStatus: AppointmentStatusEnum.Cancelled,
      updatedAt: new Date(),
    });
  }

  async updateStatus(
    id: string, 
    appointmentStatus: AppointmentStatusEnum,
    reason: AppointmentReasonEnum
  ): Promise<void> {

    await this.appointmentRepository.update(id, {
      appointmentStatus,
      reason
    }) 
  }

  async findById(appointmentId: string): Promise<AppointmentEntity | Error> {
    try {
      const appointment = await this.appointmentRepository.findOne({
        where: { id: appointmentId },
        relations: ["user", "company", "location", "maintenance", "motorcycleTrial"],
      });

      if (!appointment) {
        return new AppointmentNotFoundError();
      }

      return toDomainAppointment(appointment);
    } catch (error) {
      throw new Error("Failed to find appointment");
    }
  }

  async findAll(): Promise<AppointmentEntity[] | Error> {
    try {
      const appointments = await this.appointmentRepository.find({
        relations: [
          "user", 
          "company", 
          "location", 
          "maintenance", 
          "motorcycleTrial",
        ],
      });
      
      if (!appointments.length) {
        return new AppointmentNotFoundError("No appointments found");
      }
  
      return appointments.map(toDomainAppointment);
    } catch (error) {
      throw new Error("Failed to retrieve all appointments");
    }
  }

  async findByUser(userId: string): Promise<AppointmentEntity[] | Error> {
    try {
      const appointments = await this.appointmentRepository.find({
        where: { user: { id: userId } },
        relations: ["company", "location", "maintenance", "repair", "motorcycleTrial"],
      });
      return appointments.map(toDomainAppointment);
    } catch (error) {
      throw new Error("Failed to find appointments for user");
    }
  }

  async findByCompany(companyId: string): Promise<AppointmentEntity[] | Error> {
    try {
      const appointments = await this.appointmentRepository.find({
        where: { company: { id: companyId } },
        relations: ["user", "location", "maintenance", "repair", "motorcycleTrial"],
      });
      return appointments.map(toDomainAppointment);
    } catch (error) {
      throw new Error("Failed to find appointments for company");
    }
  }

  async findByDateRange(startTime: Date, endTime: Date, companyId: string): Promise<AppointmentEntity[] | Error> {
    try {
      const appointments = await this.appointmentRepository.find({
        where: {
          startTime: startTime,
          endTime: endTime,
          company: { id: companyId },
        },
        relations: ["user", "location", "maintenance", "repair", "motorcycleTrial"],
      });
      return appointments.map(toDomainAppointment);
    } catch (error) {
      throw new Error("Failed to find appointments in the given date range");
    }
  }

  async save(appointment: AppointmentEntity): Promise<void> {
    try {
      const appointmentToSave = toOrmAppointmentCreate(appointment);
  
      const existingMaintenance = await this.maintenanceRepository.findOne({
        where: { id: appointment.maintenance.id },
      });
  
      if (existingMaintenance) {
        console.log("update maintenance...", )
        await this.maintenanceRepository.update(existingMaintenance.id, {
          maintenanceType: MaintenanceTypeEnum[appointment.maintenance.maintenanceType],
          date: appointmentToSave.maintenance.date,
          cost: appointmentToSave.maintenance.cost,
          mileageAtService: appointmentToSave.maintenance.mileageAtService,
          maintenanceIntervalMileage: appointmentToSave.maintenance.maintenanceIntervalMileage,
          maintenanceIntervalTime: appointmentToSave.maintenance.maintenanceIntervalTime,
        });
      } else {
        await this.appointmentRepository.save(appointmentToSave);
      }
    } catch (error) {
      console.error("Error saving appointment", error);
      throw new Error("Failed to save appointment");
    }
  }  

  async update(appointment: AppointmentEntity): Promise<void> {
    try {
      const appointmentToUpdate = toOrmAppointmentCreate(appointment);
      await this.appointmentRepository.update(appointment.id, appointmentToUpdate);
    } catch (error) {
      throw new Error("Failed to update appointment");
    }
  }

  async delete(appointmentId: string): Promise<void> {
    try {
      await this.appointmentRepository.delete(appointmentId);
    } catch (error) {
      throw new Error("Failed to delete appointment");
    }
  }
}
