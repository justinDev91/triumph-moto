import { Controller, Post, Body, Param, Put, Delete, Get } from '@nestjs/common';
import { AppointmentEntity } from '@domain/entities/appointment/AppointmentEntity';
import { AppointmentService } from './appointment.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, } from '@nestjs/swagger';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

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
  public async createAppointment(@Body() createAppointmentDto : CreateAppointmentDto ): Promise<void | Error> {
    await this.appointmentService.createAppointment(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all appointments' })
  @ApiResponse({
    status: 200,
    description: 'All appointments retrieved successfully',
    type: [AppointmentEntity],
  })
  async getAllbreakdowns(): Promise<AppointmentEntity[] | Error> {
    return await this.appointmentService.getAllAppointments();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing appointment' })
  @ApiParam({ name: 'id', description: 'The ID of the appointment to update' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the appointment',
    type: AppointmentEntity,
  })
  public async updateAppointment(
    @Param('id') id: string,
    @Body() updateAppointmentDto : UpdateAppointmentDto): Promise<void | Error> {
    await this.appointmentService.updateAppointment(id, updateAppointmentDto);
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
