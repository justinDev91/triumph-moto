import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { SparePartEntity } from '@domain/entities/order/SparePartEntity';
import { SparePartService } from './spare-part.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('spare-parts') 
@Controller('spare-parts')
export class SparePartController {
  constructor(private readonly sparePartService: SparePartService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Spare part created successfully' })
  async createSparePart(
    @Body() createSparePartDto: { name: string; quantityInStock: number; criticalLevel: number; cost: number }
  ): Promise<void | Error> {
    return this.sparePartService.createSparePart(
      createSparePartDto.name,
      createSparePartDto.quantityInStock,
      createSparePartDto.criticalLevel,
      createSparePartDto.cost
    );
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get spare part by ID', type: SparePartEntity })
  async getSparePartById(@Param('id') id: string): Promise<SparePartEntity | Error> {
    return this.sparePartService.getSparePartById(id);
  }

  @Patch(':id/reserve')
  @ApiResponse({ status: 200, description: 'Reserve spare part', type: Boolean })
  async reserveSparePart(@Param('id') id: string, @Body() body: { quantity: number }): Promise<boolean | Error> {
    return this.sparePartService.reserveSparePart(id, body.quantity);
  }

  @Patch(':id/restock')
  @ApiResponse({ status: 200, description: 'Restock spare part' })
  async restockSparePart(@Param('id') id: string, @Body() body: { quantity: number }): Promise<void | Error> {
    return this.sparePartService.restockSparePart(id, body.quantity);
  }

  @Patch(':id/use')
  @ApiResponse({ status: 200, description: 'Use spare part', type: Boolean })
  async useSparePart(@Param('id') id: string, @Body() body: { quantity: number }): Promise<boolean | Error> {
    return this.sparePartService.useSparePart(id, body.quantity);
  }
}
