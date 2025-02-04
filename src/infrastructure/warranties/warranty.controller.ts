import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { WarrantyService } from './warranty.service';
import { CreateWarrantyDto } from './dto/create.warranty.dto';
import { UpdateWarrantyDto } from './dto/update.warranty.dto';
import { WarrantyEntity } from '@domain/entities/warranty/WarrantyEntity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('warranties') 
@Controller('warranties')
export class WarrantyController {
  constructor(private readonly warrantyService: WarrantyService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Warranty created successfully', type: WarrantyEntity })
  async create(@Body() createWarrantyDto: CreateWarrantyDto): Promise<WarrantyEntity | Error> {
    return await this.warrantyService.create(createWarrantyDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all warranties', type: [WarrantyEntity] })
  async findAll(): Promise<WarrantyEntity[] | Error> {
    return await this.warrantyService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get warranty by ID', type: WarrantyEntity })
  async getById(@Param('id') id: string): Promise<WarrantyEntity | Error> {
    return await this.warrantyService.getById(id);
  }

  @Get('motorcycle/:motorcycleId')
  @ApiResponse({ status: 200, description: 'Get warranty by motorcycle ID', type: WarrantyEntity })
  async getByMotorcycleId(@Param('motorcycleId') motorcycleId: string): Promise<WarrantyEntity | Error> {
    return await this.warrantyService.getByMotorcycleId(motorcycleId);
  }

  @Get(':id/details')
  @ApiResponse({ status: 200, description: 'Get detailed warranty information', type: Object })
  async getDetails(@Param('id') id: string): Promise<object | Error> {
    return await this.warrantyService.getDetails(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update warranty details', type: WarrantyEntity })
  async update(
    @Param('id') id: string,
    @Body() updateWarrantyDto: UpdateWarrantyDto
  ): Promise<void | Error> {
    await this.warrantyService.update(id, updateWarrantyDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete warranty by ID' })
  async delete(@Param('id') id: string): Promise<void | Error> {
    return await this.warrantyService.delete(id);
  }
}
