import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDriverDto } from './dto/CreateDriverDto';
import { DriverEntity } from '@domain/entities/driver/DriverEntity';
import { DrivingRecord } from '@domain/types/motorcycle';
import { DriversService } from './drivers.service';

@ApiTags('drivers')
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Driver created successfully', type: DriverEntity })
  async create(@Body() createDriverDto: CreateDriverDto): Promise<void | Error> {
    return this.driversService.create(createDriverDto);
  }

  @Put(':id/add-record')
  @ApiResponse({ status: 200, description: 'Add a driving record to the driver' })
  async addDrivingRecord(
    @Param('id') driverId: string,
    @Body() record: DrivingRecord,
  ): Promise<void | Error> {
    return this.driversService.addDrivingRecord(driverId, record);
  }

  @Get(':id/check-incidents')
  @ApiResponse({ status: 200, description: 'Check if the driver has incident history' })
  async checkIncidentHistory(@Param('id') driverId: string): Promise<boolean | Error> {
    return this.driversService.checkIncidentHistory(driverId);
  }

  @Put(':id/update-contact')
  @ApiResponse({ status: 200, description: 'Update the driver’s contact information' })
  async updateContactInfo(
    @Param('id') driverId: string,
    @Body() updateContactInfoDto: { email: string; phone: string },
  ): Promise<void | Error> {
    const { email, phone } = updateContactInfoDto;
    return this.driversService.updateContactInfo(driverId, email, phone);
  }

  @Put(':id/update-experience')
  @ApiResponse({ status: 200, description: 'Update the driver’s years of experience' })
  async updateExperience(
    @Param('id') driverId: string,
    @Body() updateExperienceDto: { years: number },
  ): Promise<void | Error> {
    const { years } = updateExperienceDto;
    return this.driversService.updateExperience(driverId, years);
  }

  @Get(':id/company-details')
  @ApiResponse({ status: 200, description: 'Get company details of the driver' })
  async getCompanyDetails(@Param('id') driverId: string): Promise<object | Error> {
    return this.driversService.getCompanyDetails(driverId);
  }

  @Delete(':id/remove-from-company')
  @ApiResponse({ status: 200, description: 'Remove the driver from their company' })
  async removeDriverFromCompany(@Param('id') driverId: string): Promise<void | Error> {
    return this.driversService.removeDriverFromCompany(driverId);
  }

    @Post(':driverId/assign-to-company/:companyId')
    @ApiResponse({ status: 200, description: 'Driver assigned to company successfully' })
    async assignDriverToCompany(
      @Param('driverId') driverId: string,
      @Param('companyId') companyId: string,
    ): Promise<void | Error> {
      return this.driversService.assignDriverToCompany(driverId, companyId);
    }
}
