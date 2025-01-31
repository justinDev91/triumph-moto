import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { SparePartEntity } from '@domain/entities/order/SparePartEntity';
import { SparePartService } from './spare-part.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { ReserveSparePartDto } from './dto/reserve-spare-part.tdo';
import { RestockSparePartDto } from './dto/restock-spare-part.dto';
import { toSparePartResponse } from './dto/to-spare-part-response.dto.';
import { ResponseSparePartDto } from './dto/response-spare-part.dto';
import { UseSparePartDto } from './dto/use-spare-part.dto';

@ApiTags('spare-parts') 
@Controller('spare-parts')
export class SparePartController {
  constructor(private readonly sparePartService: SparePartService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Spare part created successfully' })
  async createSparePart(
    @Body() createSparePartDto: CreateSparePartDto
  ): Promise<void | Error> {
    return this.sparePartService.createSparePart(createSparePartDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get spare part by ID', type: SparePartEntity })
  async getSparePartById(@Param('id') id: string): Promise<ResponseSparePartDto | Error> {
    const sparePart= await this.sparePartService.getSparePartById(id);
   
    if(sparePart instanceof Error) return sparePart
    return toSparePartResponse(sparePart)
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all spare parts', type: [SparePartEntity] })
  async getAllSpareParts(): Promise<SparePartEntity[] | Error> {
    return this.sparePartService.getAllSpareParts();
  }

  @Patch(':id/reserve')
  @ApiResponse({ status: 200, description: 'Reserve spare part', type: Boolean })
  async reserveSparePart(@Param('id') id: string, @Body() reserveSparePartDto : ReserveSparePartDto): Promise<boolean | Error> {
    return this.sparePartService.reserveSparePart(id, reserveSparePartDto.quantity);
  }

  @Patch(':id/restock')
  @ApiResponse({ status: 200, description: 'Restock spare part' })
  async restockSparePart(@Param('id') id: string, @Body() restockSparePartDto: RestockSparePartDto): Promise<void | Error> {
    return this.sparePartService.restockSparePart(id, restockSparePartDto.quantity);
  }

  @Patch(':id/use')
  @ApiResponse({ status: 200, description: 'Use spare part', type: Boolean })
  async useSparePart(@Param('id') id: string, @Body() useSparePartDto : UseSparePartDto): Promise<boolean | Error> {
    return this.sparePartService.useSparePart(id, useSparePartDto.quantity);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Remove spare part' })
  async removeSparePart(@Param('id') id: string): Promise<void | Error> {
    return this.sparePartService.removeSparePart(id);
  }
}
