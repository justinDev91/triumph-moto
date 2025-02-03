import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationEntity } from '@domain/entities/location/LocationEntity';
import { LocationStatusEnum } from '@infrastructure/types/LocationStatusEnum';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateLocationDto } from './dto/create-location.dto';

@ApiTags('locations')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new location record' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a location record',
    type: LocationEntity,
  })
  async create(
    @Body() createLocationDto: CreateLocationDto): Promise<void | Error> {
    await this.locationService.createLocation(createLocationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get location record by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the location' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched the location record',
    type: LocationEntity,
  })
  async getLocationById(@Param('id') id: string): Promise<LocationEntity | Error> {
    return this.locationService.getLocationById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all location records' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all location records',
    type: [LocationEntity],
  })
  async getAllLocations(): Promise<LocationEntity[] | Error> {
    return this.locationService.getAllLocations();
  }

  @Get('motorcycle/:motorcycleId')
  @ApiOperation({ summary: 'Find location records by motorcycle ID' })
  @ApiParam({ name: 'motorcycleId', description: 'The ID of the motorcycle' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched location records for the given motorcycle',
    type: [LocationEntity],
  })
  async findLocationByMotorcycle(@Param('motorcycleId') motorcycleId: string): Promise<LocationEntity[] | Error> {
    return this.locationService.findLocationByMotorcycle(motorcycleId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Find location records by user ID' })
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched location records for the given user',
    type: [LocationEntity],
  })
  async findLocationByUser(@Param('userId') userId: string): Promise<LocationEntity[] | Error> {
    return this.locationService.findLocationByUser(userId);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Find location records by status' })
  @ApiParam({ name: 'status', description: 'The status of the location', enum: LocationStatusEnum })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched location records for the given status',
    type: [LocationEntity],
  })
  async findLocationsByStatus(@Param('status') status: LocationStatusEnum): Promise<LocationEntity[] | Error> {
    return this.locationService.findLocationsByStatus(status);
  }

  @Put(':id/calculate-cost')
  @ApiOperation({ summary: 'Calculate the cost for a specific location' })
  @ApiParam({ name: 'id', description: 'The ID of the location' })
  @ApiResponse({
    status: 200,
    description: 'Successfully calculated the cost for the location',
    type: Number,
  })
  async calculateLocationCost(@Param('id') id: string): Promise<number | Error> {
    return this.locationService.calculateLocationCost(id);
  }

  @Put(':id/end')
  @ApiOperation({ summary: 'End a location record' })
  @ApiParam({ name: 'id', description: 'The ID of the location' })
  @ApiBody({
    description: 'End date for the location record',
    type: Object,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully ended the location record',
    type: LocationEntity,
  })
  async endLocation(
    @Param('id') id: string,
  ): Promise<void | Error> {
    await  this.locationService.endLocation(id);
  }

  @Put(':id/cancel')
  @ApiOperation({ summary: 'Cancel a location record' })
  @ApiParam({ name: 'id', description: 'The ID of the location' })
  @ApiResponse({
    status: 200,
    description: 'Successfully canceled the location record',
    type: LocationEntity,
  })
  async cancelLocation(@Param('id') id: string): Promise<void | Error> {
    await this.locationService.cancelLocation(id);
  }

}
