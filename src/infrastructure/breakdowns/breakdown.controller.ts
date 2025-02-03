import { Controller, Post, Body, Param, Put, Delete, Get } from '@nestjs/common';
import { BreakdownEntity } from '@domain/entities/breakdown/BreakdownEntity';
import { RepairEntity } from '@domain/entities/repair/RepairEntity';
import { MotorcycleEntity } from '@domain/entities/motorcycle/MotorcycleEntity';
import { WarrantyEntity } from '@domain/entities/warranty/WarrantyEntity';
import { BreakdownService } from './breakdown.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateBreakDownDto } from './dto/create-breakdown.dto';
import { UpdateDescriptionBreakDownDto } from './dto/update-description-breakdown.dto';

@ApiTags('breakdowns') 
@Controller('breakdowns')
export class BreakdownController {
  constructor(private readonly breakdownService: BreakdownService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new breakdown report' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a breakdown report',
    type: BreakdownEntity,
  })
  public async createBreakdown(
    @Body() createBreakDownDto: CreateBreakDownDto
  ): Promise<void | Error> {
    return await this.breakdownService.createBreakdown(createBreakDownDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all breakdowns' })
  @ApiResponse({
    status: 200,
    description: 'All breakdowns retrieved successfully',
    type: [Object],
  })
  async getAllbreakdowns(): Promise<BreakdownEntity[] | Error> {
    return await this.breakdownService.getAllWarranties();
  }
  
  @Put(':id/description')
  @ApiOperation({ summary: 'Update the description of a breakdown' })
  @ApiParam({ name: 'id', description: 'The ID of the breakdown' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the breakdown description',
  })
  @ApiBody({
    description: 'New description for the breakdown',
    type: String,
  })
  public async updateBreakdownDescription(
    @Param('id') breakdownId: string,
    @Body() updateDescriptionBreakDownDto: UpdateDescriptionBreakDownDto
  ): Promise<void | Error> {
    return await this.breakdownService.updateBreakdownDescription(breakdownId, updateDescriptionBreakDownDto.description);
  }

  @Post(':id/repair')
  @ApiOperation({ summary: 'Add a repair to a breakdown report' })
  @ApiParam({ name: 'id', description: 'The ID of the breakdown' })
  @ApiResponse({
    status: 200,
    description: 'Successfully added a repair to the breakdown',
  })
  @ApiBody({
    description: 'Repair data to be added to the breakdown report',
    type: RepairEntity,
  })
  public async addRepairToBreakdown(
    @Param('id') breakdownId: string,
    @Body() repair: RepairEntity
  ): Promise<void | Error> {
    return await this.breakdownService.addRepairToBreakdown(breakdownId, repair);
  }

  @Delete(':id/repair/:repairId')
  @ApiOperation({ summary: 'Remove a repair from a breakdown report' })
  @ApiParam({ name: 'id', description: 'The ID of the breakdown' })
  @ApiParam({ name: 'repairId', description: 'The ID of the repair' })
  @ApiResponse({
    status: 200,
    description: 'Successfully removed the repair from the breakdown',
  })
  public async removeRepairFromBreakdown(
    @Param('id') breakdownId: string,
    @Param('repairId') repairId: string
  ): Promise<void | Error> {
    return await this.breakdownService.removeRepairFromBreakdown(breakdownId, repairId);
  }

  @Get(':id/warranty')
  @ApiOperation({ summary: 'Check warranty coverage for a breakdown' })
  @ApiParam({ name: 'id', description: 'The ID of the breakdown' })
  @ApiResponse({
    status: 200,
    description: 'Successfully checked warranty coverage',
    type: Boolean,
  })
  public async checkWarrantyCoverage(
    @Param('id') breakdownId: string,
  ): Promise<boolean | Error> {
    return await this.breakdownService.checkWarrantyCoverage(breakdownId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get breakdown report by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the breakdown report' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched the breakdown report',
    type: BreakdownEntity,
  })
  public async findBreakdownById(@Param('id') breakdownId: string): Promise<BreakdownEntity | Error> {
    return await this.breakdownService.findBreakdownById(breakdownId);
  }

  @Get('motorcycle/:motorcycleId')
  @ApiOperation({ summary: 'Get all breakdowns for a motorcycle' })
  @ApiParam({ name: 'motorcycleId', description: 'The ID of the motorcycle' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched breakdowns for the motorcycle',
    type: [BreakdownEntity],
  })
  public async getBreakdownsByMotorcycleId(
    @Param('motorcycleId') motorcycleId: string
  ): Promise<BreakdownEntity[] | Error> {
    return await this.breakdownService.getBreakdownsByMotorcycleId(motorcycleId);
  }

  @Get(':id/repair-history')
  @ApiOperation({ summary: 'Get repair history for a breakdown' })
  @ApiParam({ name: 'id', description: 'The ID of the breakdown' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched the repair history for the breakdown',
    type: [RepairEntity],
  })
  public async getBreakdownRepairHistory(@Param('id') breakdownId: string): Promise<RepairEntity[] | Error> {
    return await this.breakdownService.getBreakdownRepairHistory(breakdownId);
  }

}
