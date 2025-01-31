import { Controller, Post, Body, Param, Put, Delete, Get } from '@nestjs/common';
import { CompanyEntity } from '@domain/entities/company/CompanyEntity';
import { ConcessionEntity } from '@domain/entities/concession/ConcessionEntity';
import { DriverEntity } from '@domain/entities/driver/DriverEntity';
import { MotorcycleEntity } from '@domain/entities/motorcycle/MotorcycleEntity';
import { CompanyService } from './company.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateCompanyDto } from './dto/create-user-dto';
import { UpdateCompanyNameDto } from './dto/update-company-name-dto';

@ApiTags('companies') 
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a company',
    type: CompanyEntity,
  })
  public async createCompany(
    @Body() createCompanyDto: CreateCompanyDto): Promise<void | Error> {
    await this.companyService.createCompany(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all companies',
    type: [CompanyEntity],
  })
  public async getAllCompanies(): Promise<CompanyEntity[] | Error> {
    return await this.companyService.getAllCompanies();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the company' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched the company details',
    type: CompanyEntity,
  })
  public async getCompanyById(@Param('id') companyId: string): Promise<CompanyEntity | Error> {
    return await this.companyService.getCompanyById(companyId);
  }
  
  @Put(':id')
  @ApiOperation({ summary: 'Update the name of a company' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the company name',
    type: CompanyEntity,
  })
  public async updateCompanyName(
    @Param('id') companyId: string,
    @Body() updateCompanyNameDto : UpdateCompanyNameDto
  ): Promise<CompanyEntity | Error> {
    return await this.companyService.updateCompanyName(companyId, updateCompanyNameDto.name);
  }

  @Post(':id/concessions')
  @ApiOperation({ summary: 'Add a concession to a company' })
  @ApiParam({ name: 'id', description: 'The ID of the company' })
  @ApiResponse({
    status: 200,
    description: 'Successfully added a concession to the company',
    type: CompanyEntity,
  })
  @ApiBody({
    description: 'Concession data to be added to the company',
    type: ConcessionEntity,
  })
  public async addConcessionToCompany(
    @Param('id') companyId: string,
    @Body() concession: ConcessionEntity
  ): Promise<void | Error> {
    return await this.companyService.addConcessionToCompany(concession, companyId);
  }

  @Delete(':id/concessions/:concessionId')
  @ApiOperation({ summary: 'Remove a concession from a company' })
  @ApiParam({ name: 'id', description: 'The ID of the company' })
  @ApiParam({ name: 'concessionId', description: 'The ID of the concession' })
  @ApiResponse({
    status: 200,
    description: 'Successfully removed the concession from the company',
  })
  public async removeConcessionFromCompany(
    @Param('id') companyId: string,
    @Param('concessionId') concessionId: string
  ): Promise<void | Error> {
    return await this.companyService.removeConcessionFromCompany(companyId, concessionId);
  }

  @Post(':id/drivers')
  @ApiOperation({ summary: 'Add a driver to a company' })
  @ApiParam({ name: 'id', description: 'The ID of the company' })
  @ApiResponse({
    status: 200,
    description: 'Successfully added a driver to the company',
    type: CompanyEntity,
  })
  @ApiBody({
    description: 'Driver data to be added to the company',
    type: DriverEntity,
  })
  public async addDriverToCompany(
    @Param('id') companyId: string,
    @Body() driver: DriverEntity
  ): Promise<CompanyEntity | Error> {
    return await this.companyService.addDriverToCompany(companyId, driver);
  }

  @Get(':id/drivers')
  @ApiOperation({ summary: 'Get all drivers for a company' })
  @ApiParam({ name: 'id', description: 'The ID of the company' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched the company drivers',
    type: [DriverEntity],
  })
  public async getCompanyDrivers(@Param('id') companyId: string): Promise<DriverEntity[] | Error> {
    return this.companyService.getCompanyDrivers(companyId);
  }

  @Delete(':id/drivers/:driverId')
  @ApiOperation({ summary: 'Remove a driver from a company' })
  @ApiParam({ name: 'id', description: 'The ID of the company' })
  @ApiParam({ name: 'driverId', description: 'The ID of the driver' })
  @ApiResponse({
    status: 200,
    description: 'Successfully removed the driver from the company',
    type: CompanyEntity,
  })
  public async removeDriverFromCompany(
    @Param('id') companyId: string,
    @Param('driverId') driverId: string
  ): Promise<CompanyEntity | Error> {
    return await this.companyService.removeDriverFromCompany(companyId, driverId);
  }

  @Post(':id/motorcycles')
  @ApiOperation({ summary: 'Add a motorcycle to a company' })
  @ApiParam({ name: 'id', description: 'The ID of the company' })
  @ApiResponse({
    status: 200,
    description: 'Successfully added a motorcycle to the company',
    type: CompanyEntity,
  })
  @ApiBody({
    description: 'Motorcycle data to be added to the company',
    type: MotorcycleEntity,
  })
  public async addMotorcycleToCompany(
    @Param('id') companyId: string,
    @Body() motorcycle: MotorcycleEntity
  ): Promise<CompanyEntity | Error> {
    return await this.companyService.addMotorcycleToCompany(companyId, motorcycle);
  }

  @Delete(':id/motorcycles/:motorcycleId')
  @ApiOperation({ summary: 'Remove a motorcycle from a company' })
  @ApiParam({ name: 'id', description: 'The ID of the company' })
  @ApiParam({ name: 'motorcycleId', description: 'The ID of the motorcycle' })
  @ApiResponse({
    status: 200,
    description: 'Successfully removed the motorcycle from the company',
    type: CompanyEntity,
  })
  public async removeMotorcycleFromCompany(
    @Param('id') companyId: string,
    @Param('motorcycleId') motorcycleId: string
  ): Promise<CompanyEntity | Error> {
    return await this.companyService.removeMotorcycleFromCompany(companyId, motorcycleId);
  }
}
