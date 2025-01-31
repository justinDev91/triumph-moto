import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { ConcessionService } from './concession.service';
import { ConcessionEntity } from '@domain/entities/concession/ConcessionEntity';
import { MotorcycleEntity } from '@domain/entities/motorcycle/MotorcycleEntity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateConcessionDto } from './dto/create-concession.dto';
import { UpdateConcessionNameDto } from './dto/update-concession-name.dto';

@ApiTags('concessions') 
@Controller('concessions')
export class ConcessionController {
  constructor(private readonly concessionService: ConcessionService) {}

  
  @Post()
  @ApiOperation({ summary: 'Create a new concession' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a concession',
    type: ConcessionEntity,  
  })
  async createConcession(
    @Body() createConcessionDto: CreateConcessionDto
  ): Promise<void | Error> {
    await this.concessionService.createConcession(createConcessionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all concession' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all concession',
    type: [ConcessionEntity],
  })
  public async getAllConcession(): Promise<ConcessionEntity[] | Error> {
    return await this.concessionService.getAllConcessions();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update the name of a concession' })
  @ApiParam({ name: 'id', description: 'The ID of the concession' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the concession name',
    type: ConcessionEntity,
  })
  async updateConcessionName(
    @Param('id') concessionId: string,
    @Body() updateConcessionNameDto : UpdateConcessionNameDto
  ): Promise<ConcessionEntity | Error> {
    return this.concessionService.updateConcessionName(concessionId, updateConcessionNameDto.name);
  }

  @Post(':id/motorcycle')
  @ApiOperation({ summary: 'Add a motorcycle to a concession' })
  @ApiParam({ name: 'id', description: 'The ID of the concession' })
  @ApiResponse({
    status: 200,
    description: 'Successfully added a motorcycle to the concession',
    type: ConcessionEntity,
  })
  @ApiBody({
    description: 'Motorcycle data to be added to the concession',
    type: MotorcycleEntity,
  })
  async addMotorcycleToConcession(
    @Param('id') concessionId: string,
    @Body() motorcycle: MotorcycleEntity
  ): Promise<ConcessionEntity | Error> {
    return this.concessionService.addMotorcycleToConcession(concessionId, motorcycle);
  }

  @Delete(':concessionId/motorcycle/:motorcycleId')
  @ApiOperation({ summary: 'Remove a motorcycle from a concession' })
  @ApiParam({ name: 'concessionId', description: 'The ID of the concession' })
  @ApiParam({ name: 'motorcycleId', description: 'The ID of the motorcycle' })
  @ApiResponse({
    status: 200,
    description: 'Successfully removed the motorcycle from the concession',
    type: ConcessionEntity,
  })
  async removeMotorcycleFromConcession(
    @Param('concessionId') concessionId: string,
    @Param('motorcycleId') motorcycleId: string
  ): Promise<ConcessionEntity | Error> {
    return this.concessionService.removeMotorcycleFromConcession(concessionId, motorcycleId);
  }

  @Post(':id/assign')
  @ApiOperation({ summary: 'Assign a concession to a company' })
  @ApiParam({ name: 'id', description: 'The ID of the concession' })
  @ApiResponse({
    status: 200,
    description: 'Successfully assigned the concession to the company',
  })
  @ApiBody({
    description: 'Company ID to assign the concession to',
    type: Object,
  })
  async assignConcessionToCompany(
    @Param('id') concessionId: string,
    @Body() { companyId }: { companyId: string }
  ): Promise<void | Error> {
    return this.concessionService.assignConcessionToCompany(concessionId, companyId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a concession' })
  @ApiParam({ name: 'id', description: 'The ID of the concession' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the concession',
  })
  async deleteConcession(@Param('id') id: string): Promise<void | Error> {
    return this.concessionService.deleteConcession(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific concession' })
  @ApiParam({ name: 'id', description: 'The ID of the concession' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched the concession details',
    type: ConcessionEntity,
  })
  async getConcessionDetails(@Param('id') id: string): Promise<ConcessionEntity | Error> {
    return this.concessionService.getConcessionDetails(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a concession' })
  @ApiParam({ name: 'id', description: 'The ID of the concession' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the concession',
    type: ConcessionEntity,
  })
  async updateConcession(
    @Param('id') id: string,
    @Body() updateConcessionNameDto : UpdateConcessionNameDto
  ): Promise<ConcessionEntity | Error> {
    return this.concessionService.updateConcession(id, updateConcessionNameDto.name);
  }
}
