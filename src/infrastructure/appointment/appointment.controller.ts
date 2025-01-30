import { Controller, Post, Body, Param, Put, Delete, Get } from '@nestjs/common';
import { AppointmentStatus } from '@domain/types/AppointmentStatus';
import { AppointmentEntity } from '@domain/entities/appointment/AppointmentEntity';
import { MotorcycleTrialEntity } from '@domain/entities/motorcycle/MotorcycleTrialEntity';
import { RepairEntity } from '@domain/entities/repair/RepairEntity';
import { MaintenanceEntity } from '@domain/entities/maintenance/MaintenanceEntity';
import { LocationEntity } from '@domain/entities/location/LocationEntity';
import { AppointmentReason } from '@domain/types/AppointmentReason';
import { CompanyEntity } from '@domain/entities/company/CompanyEntity';
import { UserEntity } from '@domain/entities/user/UserEntity';
import { AppointmentService } from './appointment.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('appointments') 
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created an appointment',
    type: AppointmentEntity,
  })
  @ApiBody({
    description: 'Appointment details to create a new appointment',
    type: Object,
  })
  public async createAppointment(
    @Body() body: {
      id: string;
      user: UserEntity;
      startTime: Date;
      endTime: Date;
      status: AppointmentStatus;
      createdAt: Date;
      updatedAt: Date;
      reason: AppointmentReason;
      company: CompanyEntity;
      location?: LocationEntity;
      maintenance?: MaintenanceEntity;
      repair?: RepairEntity;
      motorcycleTrial?: MotorcycleTrialEntity;
    }
  ): Promise<AppointmentEntity | Error> {
    const {
      id,
      user,
      startTime,
      endTime,
      status,
      createdAt,
      updatedAt,
      reason,
      company,
      location,
      maintenance,
      repair,
      motorcycleTrial,
    } = body;

    return await this.appointmentService.createAppointment(
      id,
      user,
      startTime,
      endTime,
      status,
      createdAt,
      updatedAt,
      reason,
      company,
      location,
      maintenance,
      repair,
      motorcycleTrial
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing appointment' })
  @ApiParam({ name: 'id', description: 'The ID of the appointment to update' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the appointment',
    type: AppointmentEntity,
  })
  @ApiBody({
    description: 'Updated appointment details',
    type: Object,
  })
  public async updateAppointment(
    @Param('id') id: string,
    @Body() updatedDetails: {
      startTime?: Date;
      endTime?: Date;
      appointmentStatus?: AppointmentStatus;
      reason?: AppointmentReason;
      location?: LocationEntity;
      maintenance?: MaintenanceEntity;
      repair?: RepairEntity;
      motorcycleTrial?: MotorcycleTrialEntity;
    }
  ): Promise<AppointmentEntity | Error> {
    return await this.appointmentService.updateAppointment(id, updatedDetails);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update the status of an appointment' })
  @ApiParam({ name: 'id', description: 'The ID of the appointment to update' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the appointment status',
  })
  @ApiBody({
    description: 'New status for the appointment',
    type: String,
  })
  public async updateAppointmentStatus(
    @Param('id') appointmentId: string,
    @Body('status') newStatus: AppointmentStatus
  ): Promise<void | Error> {
    return await this.appointmentService.updateAppointmentStatus(appointmentId, newStatus);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel an appointment' })
  @ApiParam({ name: 'id', description: 'The ID of the appointment to cancel' })
  @ApiResponse({
    status: 200,
    description: 'Successfully cancelled the appointment',
  })
  public async cancelAppointment(@Param('id') appointmentId: string): Promise<void | Error> {
    return await this.appointmentService.cancelAppointment(appointmentId);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Complete an appointment' })
  @ApiParam({ name: 'id', description: 'The ID of the appointment to complete' })
  @ApiResponse({
    status: 200,
    description: 'Successfully completed the appointment',
  })
  public async completeAppointment(@Param('id') appointmentId: string): Promise<void | Error> {
    return await this.appointmentService.completeAppointment(appointmentId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an appointment' })
  @ApiParam({ name: 'id', description: 'The ID of the appointment to delete' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the appointment',
  })
  public async deleteAppointment(@Param('id') id: string): Promise<void | Error> {
    return await this.appointmentService.deleteAppointment(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get appointment details by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the appointment to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched the appointment details',
    type: Object,
  })
  public async getAppointmentDetails(@Param('id') appointmentId: string): Promise<object | Error> {
    return await this.appointmentService.getAppointmentDetails(appointmentId);
  }
}
