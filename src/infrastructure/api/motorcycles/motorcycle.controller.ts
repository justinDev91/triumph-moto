import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { MotorcycleService } from './motorcycle.service';
import { CreateMotorcycleDto } from './dto/create-motorcycle.dto';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UpdateMotorcycleMileageDto } from './dto/update-motorcycle-mileage.dto';
import { UpdateMotorcycleStatusDto } from './dto/update-motorcycle-status.dto';
import { UpdateMotorcycleServiceDetailsDto } from './dto/update-motorcycle-service-details.dto';

@ApiTags('motorcycles') 
@Controller('motorcycles')
export class MotorcycleController {
  constructor(private readonly motorcycleService: MotorcycleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new motorcycle' })
  @ApiResponse({
    status: 201,
    description: 'Motorcycle successfully created',
  })
  async createMotorcycle(@Body() createMotorcycleDto: CreateMotorcycleDto): Promise<void | Error> {
    return await this.motorcycleService.create(createMotorcycleDto);
  }

  @Put(':id/mileage')
  @ApiOperation({ summary: 'Update the mileage of a motorcycle' })
  @ApiResponse({
    status: 200,
    description: 'Motorcycle mileage updated successfully',
  })
  async updateMileage(
    @Param('id') id: string,
    @Body() updateMotorcycleMileageDto: UpdateMotorcycleMileageDto,
  ): Promise<void | Error> {
    return await this.motorcycleService.updateMileage(id, updateMotorcycleMileageDto.mileage);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update the status of a motorcycle' })
  @ApiResponse({
    status: 200,
    description: 'Motorcycle status updated successfully',
  })
  async updateMotorcycleStatus(
    @Param('id') id: string,
    @Body() data: UpdateMotorcycleStatusDto,
  ): Promise<void | Error> {
    return await this.motorcycleService.updateMotorcycleStatus(id, data.status);
  }

  @Put(':id/service')
  @ApiOperation({ summary: 'Update the service details of a motorcycle' })
  @ApiResponse({
    status: 200,
    description: 'Motorcycle service details updated successfully',
  })
  async updateServiceDetails(
    @Param('id') id: string,
    @Body() data: UpdateMotorcycleServiceDetailsDto,
  ): Promise<void | Error> {
    return await this.motorcycleService.updateServiceDetails(id, data.mileage, data.date);
  }

  @Get(':id/company')
  @ApiOperation({ summary: 'Get the company details associated with a motorcycle' })
  @ApiResponse({
    status: 200,
    description: 'Motorcycle company details retrieved successfully',
    type: Object,
  })
  async getMotorcycleCompanyDetails(@Param('id') motorcycleId: string): Promise<object | null | Error> {
    return await this.motorcycleService.getMotorcycleCompanyDetails(motorcycleId);
  }

  @Get(':id/concession')
  @ApiOperation({ summary: 'Get the concession details associated with a motorcycle' })
  @ApiResponse({
    status: 200,
    description: 'Motorcycle concession details retrieved successfully',
    type: Object,
  })
  async getMotorcycleConcessionDetails(@Param('id') motorcycleId: string): Promise<object | null | Error> {
    return await this.motorcycleService.getMotorcycleConcessionDetails(motorcycleId);
  }

  @Put(':id/company/:companyId')
  @ApiOperation({ summary: 'Assign a motorcycle to a company' })
  @ApiResponse({
    status: 200,
    description: 'Motorcycle assigned to company successfully',
  })
  async assignMotorcycleToCompany(
    @Param('id') motorcycleId: string,
    @Param('companyId') companyId: string,
  ): Promise<void | Error> {
    return await this.motorcycleService.assignMotorcycleToCompany(motorcycleId, companyId);
  }

  @Put(':id/concession/:concessionId')
  @ApiOperation({ summary: 'Assign a motorcycle to a concession' })
  @ApiResponse({
    status: 200,
    description: 'Motorcycle assigned to concession successfully',
  })
  async assignMotorcycleToConcession(
    @Param('id') motorcycleId: string,
    @Param('concessionId') concessionId: string,
  ): Promise<void | Error> {
    return await this.motorcycleService.assignMotorcycleToConcession(motorcycleId, concessionId);
  }

  @Put(':id/remove-company')
  @ApiOperation({ summary: 'Remove a motorcycle from a company' })
  @ApiResponse({
    status: 200,
    description: 'Motorcycle removed from company successfully',
  })
  async removeMotorcycleFromCompany(@Param('id') motorcycleId: string): Promise<void | Error> {
    return await this.motorcycleService.removeMotorcycleFromCompany(motorcycleId);
  }

  @Put(':id/remove-concession')
  @ApiOperation({ summary: 'Remove a motorcycle from a concession' })
  @ApiResponse({
    status: 200,
    description: 'Motorcycle removed from concession successfully',
  })
  async removeMotorcycleFromConcession(@Param('id') motorcycleId: string): Promise<void | Error> {
    return await this.motorcycleService.removeMotorcycleFromConcession(motorcycleId);
  }

  @Get(':id/service-status')
  @ApiOperation({ summary: 'Check the service status of a motorcycle' })
  @ApiResponse({
    status: 200,
    description: 'Service status check completed successfully',
    type: Boolean,
  })
  async checkServiceStatus(@Param('id') motorcycleId: string): Promise<boolean | Error> {
    return await this.motorcycleService.checkServiceStatus(motorcycleId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all motorcycles' })
  @ApiResponse({
    status: 200,
    description: 'All motorcycles retrieved successfully',
    type: [Object],
  })
  async getAllMotorcycles(): Promise<any | Error> {
    return await this.motorcycleService.getAllMotorcycles();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a motorcycle by ID' })
  @ApiResponse({
    status: 200,
    description: 'Motorcycle retrieved successfully',
    type: Object,
  })
  async getMotorcycleById(@Param('id') id: string): Promise<any | Error> {
    return await this.motorcycleService.getMotorcycleById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a motorcycle by ID' })
  @ApiResponse({
    status: 200,
    description: 'Motorcycle deleted successfully',
  })
  async deleteMotorcycle(@Param('id') id: string): Promise<void | Error> {
    return await this.motorcycleService.deleteMotorcycle(id);
  }
}
