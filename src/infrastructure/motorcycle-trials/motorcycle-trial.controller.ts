import { Controller, Post, Get, Delete, Param, Body, Put } from '@nestjs/common';
import { MotorcycleTrialService } from './motorcycle-trial.service';
import { MotorcycleTrialEntity } from '@domain/entities/motorcycle/MotorcycleTrialEntity';
import { UpdateMotorcycleTrialDto } from './dto/update-motorcycle-trial-dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateMotorcycleTrialDto } from './dto/create-motorcycle-trial-dto';

@ApiTags('motorcycle-trials') 
@Controller('motorcycle-trials')
export class MotorcycleTrialController {
  constructor(private readonly motorcycleTrialService: MotorcycleTrialService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new motorcycle trial' })
  @ApiResponse({
    status: 201,
    description: 'Motorcycle trial successfully created',
  })
  async create(@Body() createMotorcycleTrialDto: CreateMotorcycleTrialDto): Promise<void | Error> {
    return await this.motorcycleTrialService.create(createMotorcycleTrialDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all motorcyclesTrial' })
  @ApiResponse({
    status: 200,
    description: 'All motorcycleTrials retrieved successfully',
    type: [Object],
  })
  async getAllMotorcycles(): Promise<MotorcycleTrialEntity[] | Error> {
    return await this.motorcycleTrialService.getAllMotorcyclesTrial();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get motorcycle trial by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the motorcycle trial' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched motorcycle trial',
    type: MotorcycleTrialEntity,
  })
  async findById(@Param('id') id: string): Promise<MotorcycleTrialEntity | Error> {
    return await this.motorcycleTrialService.findById(id);
  }

  @Get(':id/summary')
  @ApiOperation({ summary: 'Get the summary of a motorcycle trial' })
  @ApiParam({ name: 'id', description: 'The ID of the motorcycle trial' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched trial summary',
    type: String,
  })
  async getSummary(@Param('id') id: string): Promise<string | Error> {
    return await this.motorcycleTrialService.getSummary(id);
  }

  @Get(':id/status')
  @ApiOperation({ summary: 'Check the status of a motorcycle trial' })
  @ApiParam({ name: 'id', description: 'The ID of the motorcycle trial' })
  @ApiResponse({
    status: 200,
    description: 'Successfully checked the trial status',
    type: Boolean,
  })
  async checkStatus(@Param('id') id: string): Promise<boolean | Error> {
    return await this.motorcycleTrialService.checkStatus(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update the motorcycle trial' })
  @ApiParam({ name: 'id', description: 'The ID of the motorcycle trial' })
  @ApiResponse({
    status: 200,
    description: 'Motorcycle trial successfully updated',
  })
  async update(
    @Param('id') id: string,
    @Body() updateMotorcycleTrialDto: UpdateMotorcycleTrialDto,
  ): Promise<void | Error> {
    const { endDate } = updateMotorcycleTrialDto;
    return await this.motorcycleTrialService.update(id, new Date(endDate));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a motorcycle trial' })
  @ApiParam({ name: 'id', description: 'The ID of the motorcycle trial' })
  @ApiResponse({
    status: 200,
    description: 'Motorcycle trial successfully deleted',
  })
  async delete(@Param('id') id: string): Promise<void | Error> {
    return await this.motorcycleTrialService.delete(id);
  }

  @Put(':id/end')
  @ApiOperation({ summary: 'End a motorcycle trial' })
  @ApiParam({ name: 'id', description: 'The ID of the motorcycle trial' })
  @ApiResponse({
    status: 200,
    description: 'Motorcycle trial ended successfully',
  })
  async endTrial(@Param('id') id: string): Promise<void | Error> {
    return await this.motorcycleTrialService.endTrial(id);
  }
}
