import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceEntity } from '@domain/entities/maintenance/MaintenanceEntity';
import { MotorcycleEntity } from '@domain/entities/motorcycle/MotorcycleEntity';
import { MaintenanceType } from '@domain/types/MaintenanceType';
import { ConcessionEntity } from '@domain/entities/concession/ConcessionEntity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('maintenance') // Group all maintenance endpoints under this tag in Swagger UI
@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new maintenance record' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a maintenance record',
    type: MaintenanceEntity,
  })
  @ApiBody({
    description: 'Maintenance details to be created',
    type: Object,
  })
  async createMaintenance(
    @Body() body: {
      id: string;
      motorcycle: MotorcycleEntity;
      maintenanceType: MaintenanceType;
      date: Date;
      cost: number;
      mileageAtService: number;
      maintenanceIntervalMileage: number;
      maintenanceIntervalTime: number;
      concession: ConcessionEntity | null;
    }
  ): Promise<MaintenanceEntity | Error> {
    return this.maintenanceService.createMaintenance(
      body.id,
      body.motorcycle,
      body.maintenanceType,
      body.date,
      body.cost,
      body.mileageAtService,
      body.maintenanceIntervalMileage,
      body.maintenanceIntervalTime,
      body.concession
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a maintenance record by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the maintenance record to be deleted' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the maintenance record',
  })
  async deleteMaintenance(@Param('id') id: string): Promise<void | Error> {
    return this.maintenanceService.deleteMaintenance(id);
  }

  @Get('concession/:concessionId')
  @ApiOperation({ summary: 'Find maintenance records by concession ID' })
  @ApiParam({ name: 'concessionId', description: 'The ID of the concession' })
  @ApiResponse({
    status: 200,
    description: 'List of maintenance records for the given concession',
    type: [MaintenanceEntity],
  })
  async findMaintenanceByConcessionId(
    @Param('concessionId') concessionId: string
  ): Promise<MaintenanceEntity[] | Error> {
    return this.maintenanceService.findMaintenanceByConcessionId(concessionId);
  }

  @Get('motorcycle/:motorcycleId')
  @ApiOperation({ summary: 'Find maintenance records by motorcycle ID' })
  @ApiParam({ name: 'motorcycleId', description: 'The ID of the motorcycle' })
  @ApiResponse({
    status: 200,
    description: 'List of maintenance records for the given motorcycle',
    type: [MaintenanceEntity],
  })
  async findMaintenanceByMotorcycleId(
    @Param('motorcycleId') motorcycleId: string
  ): Promise<MaintenanceEntity[] | Error> {
    return this.maintenanceService.findMaintenanceByMotorcycleId(motorcycleId);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all maintenance records' })
  @ApiResponse({
    status: 200,
    description: 'List of all maintenance records',
    type: [MaintenanceEntity],
  })
  async getAllMaintenanceRecords(): Promise<MaintenanceEntity[] | Error> {
    return this.maintenanceService.getAllMaintenanceRecords();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get maintenance record by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the maintenance record' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched maintenance record',
    type: MaintenanceEntity,
  })
  async getMaintenanceById(@Param('id') id: string): Promise<MaintenanceEntity | Error> {
    return this.maintenanceService.getMaintenanceById(id);
  }

  @Put('complete/:id')
  @ApiOperation({ summary: 'Mark maintenance as completed' })
  @ApiParam({ name: 'id', description: 'The ID of the maintenance record' })
  @ApiResponse({
    status: 200,
    description: 'Maintenance record marked as completed',
    type: MaintenanceEntity,
  })
  async markMaintenanceAsCompleted(@Param('id') id: string): Promise<MaintenanceEntity | Error> {
    return this.maintenanceService.markMaintenanceAsCompleted(id);
  }

  @Get('next-maintenance-date/:id')
  @ApiOperation({ summary: 'Predict the next maintenance date' })
  @ApiParam({ name: 'id', description: 'The ID of the maintenance record' })
  @ApiResponse({
    status: 200,
    description: 'Predicted next maintenance date',
    type: Date,
  })
  async predictNextMaintenanceDate(@Param('id') id: string): Promise<Date | Error> {
    return this.maintenanceService.predictNextMaintenanceDate(id);
  }

  @Put('schedule-next-maintenance/:id')
  @ApiOperation({ summary: 'Schedule next maintenance' })
  @ApiParam({ name: 'id', description: 'The ID of the maintenance record' })
  @ApiResponse({
    status: 200,
    description: 'Successfully scheduled next maintenance',
  })
  async scheduleNextMaintenance(@Param('id') id: string): Promise<void | Error> {
    return this.maintenanceService.scheduleNextMaintenance(id);
  }

  @Put('update-concession/:maintenanceId')
  @ApiOperation({ summary: 'Update maintenance concession' })
  @ApiParam({ name: 'maintenanceId', description: 'The ID of the maintenance record' })
  @ApiBody({
    description: 'Concession details to update for the maintenance record',
    type: ConcessionEntity,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the maintenance concession',
    type: MaintenanceEntity,
  })
  async updateMaintenanceConcession(
    @Param('maintenanceId') maintenanceId: string,
    @Body() concession: ConcessionEntity
  ): Promise<MaintenanceEntity | Error> {
    return this.maintenanceService.updateMaintenanceConcession(maintenanceId, concession);
  }

  @Put('update-details/:id')
  @ApiOperation({ summary: 'Update maintenance details' })
  @ApiParam({ name: 'id', description: 'The ID of the maintenance record' })
  @ApiBody({
    description: 'Details to update for the maintenance record',
    type: Object,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the maintenance record',
    type: MaintenanceEntity,
  })
  async updateMaintenanceDetails(
    @Param('id') id: string,
    @Body() body: {
      maintenanceType: MaintenanceType;
      date: Date;
      cost: number;
    }
  ): Promise<MaintenanceEntity | Error> {
    return this.maintenanceService.updateMaintenanceDetails(
      id,
      body.maintenanceType,
      body.date,
      body.cost
    );
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update maintenance record' })
  @ApiParam({ name: 'id', description: 'The ID of the maintenance record' })
  @ApiBody({
    description: 'Details to update for the maintenance record',
    type: Object,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the maintenance record',
  })
  async updateMaintenance(
    @Param('id') id: string,
    @Body() body: {
      maintenanceType: MaintenanceType;
      date: Date;
      cost: number;
    }
  ): Promise<void | Error> {
    return this.maintenanceService.updateMaintenance(
      id,
      body.maintenanceType,
      body.date,
      body.cost
    );
  }

  @Get('overdue/:id')
  @ApiOperation({ summary: 'Check if the maintenance is overdue' })
  @ApiParam({ name: 'id', description: 'The ID of the maintenance record' })
  @ApiResponse({
    status: 200,
    description: 'Whether the maintenance is overdue',
    type: Boolean,
  })
  async checkIfMaintenanceOverdue(@Param('id') id: string): Promise<boolean | Error> {
    return this.maintenanceService.checkIfMaintenanceOverdue(id);
  }
}
