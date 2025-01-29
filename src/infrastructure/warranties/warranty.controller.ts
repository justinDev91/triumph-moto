import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { WarrantyService } from './warranty.service';
import { CreateWarrantyDto } from './dto/create.warranty.dto';
import { UpdateWarrantyDto } from './dto/update.warranty.dto';
import { WarrantyEntity } from '@domain/entities/warranty/WarrantyEntity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('warranties')
export class WarrantyController {
  constructor(private readonly warrantyService: WarrantyService) {}

  @Post()
  async create(@Body() createWarrantyDto: CreateWarrantyDto): Promise<WarrantyEntity | Error> {
    return await this.warrantyService.create(createWarrantyDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all warranties', type: [WarrantyEntity] })
  async findAll(): Promise<WarrantyEntity[] | Error> {
    return await this.warrantyService.findAll();;
  }
  

  @Get(':id')
  async getById(@Param('id') id: string): Promise<WarrantyEntity | Error> {
    return await this.warrantyService.getById(id);
  }

  @Get('motorcycle/:motorcycleId')
  async getByMotorcycleId(@Param('motorcycleId') motorcycleId: string): Promise<WarrantyEntity | Error> {
    return await this.warrantyService.getByMotorcycleId(motorcycleId);
  }

  @Get(':id/details')
  async getDetails(@Param('id') id: string): Promise<object | Error> {
    return await this.warrantyService.getDetails(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWarrantyDto: UpdateWarrantyDto
  ): Promise<WarrantyEntity | Error> {
    return await this.warrantyService.update(updateWarrantyDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void | Error> {
    return await this.warrantyService.delete(id);
  }
}
