import { Controller, Post, Get, Param, Body, Delete, Put } from '@nestjs/common';
import { RepairEntity } from '@domain/entities/repair/RepairEntity';
import { CommonRepairAction } from '@domain/types/motorcycle';
import { RepairService } from './repair.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRepairDto } from './dto/create-repair.dto';

@ApiTags('repair') 
@Controller('repair')
export class RepairController {
  constructor(private readonly repairService: RepairService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Repair created successfully', type: RepairEntity })
  async createRepair(
    @Body() createRepairDto: CreateRepairDto): Promise<void | Error> {
      await this.repairService.createRepair(createRepairDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all repairs', type: [RepairEntity] })
  async getAllRepairs(): Promise<RepairEntity[] | Error> {
    return await this.repairService.getAllRepairs();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get repair by ID', type: RepairEntity })
  async getRepairById(@Param('id') id: string): Promise<RepairEntity | Error> {
    return this.repairService.getRepairById(id);
  }

  @Get('breakdown/:breakdownId')
  @ApiResponse({ status: 200, description: 'Get repairs by breakdown ID', type: [RepairEntity] })
  async getRepairsByBreakdownId(@Param('breakdownId') breakdownId: string): Promise<RepairEntity[] | Error> {
    return this.repairService.getRepairsByBreakdownId(breakdownId);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete repair by ID' })
  async deleteRepair(@Param('id') id: string): Promise<void | Error> {
    return this.repairService.deleteRepair(id);
  }

  @Post(':repairId/high-cost/:threshold')
  @ApiResponse({ status: 200, description: 'Check if the repair cost is above a threshold', type: Boolean })
  async checkHighCostRepair(
    @Param('repairId') repairId: string,
    @Param('threshold') threshold: number
  ): Promise<boolean | Error> {
    return this.repairService.checkHighCostRepair(repairId, threshold);
  }

  @Get(':repairId/warranty')
  @ApiResponse({ status: 200, description: 'Check warranty coverage for repair', type: Boolean })
  async checkRepairWarrantyCoverage(@Param('repairId') repairId: string): Promise<boolean | Error> {
    return this.repairService.checkRepairWarrantyCoverage(repairId);
  }

  @Put(':repairId/actions')
  @ApiResponse({ status: 200, description: 'Update repair actions' })
  async updateRepairActions(
    @Param('repairId') repairId: string,
    @Body() newActions: CommonRepairAction[]
  ): Promise<void | Error> {
    return this.repairService.updateRepairActions(repairId, newActions);
  }

}
