import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '@domain/entities/user/UserEntity';
import { DriverEntity } from '@domain/entities/driver/DriverEntity';
import { UserDto } from './dto/response-user.dto';
import { toUserDto } from './dto/to-user-dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'User created successfully', type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity | Error> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all users', type: [UserEntity] })
  findAll(): Promise<UserEntity[] | Error> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get user by ID', type: UserEntity })
  async findOne(@Param('id') id: string): Promise<UserDto | Error> {
      const user = await this.usersService.findOne(id);
  
      if (user instanceof Error) return user;
      
      const userDto = toUserDto(user);
  
      return userDto;
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete user by ID' })
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Get(':id/check-admin')
  @ApiResponse({ status: 200, description: 'Check if the user is an administrator' })
  async checkUserIsAdmin(@Param('id') id: string): Promise<boolean | Error> {
    return this.usersService.checkUserIsAdmin(id);
  }

  @Get(':id/role')
  @ApiResponse({ status: 200, description: 'Get user role' })
  async getUserRole(@Param('id') id: string): Promise<string | Error> {
    return this.usersService.getUserRole(id);
  }

  @Put(':id/activate')
  @ApiResponse({ status: 200, description: 'Activate the user' })
  async activateUser(@Param('id') id: string): Promise<UserEntity | Error> {
    return this.usersService.activateUser(id);
  }

  @Put(':id/deactivate')
  @ApiResponse({ status: 200, description: 'Deactivate the user' })
  async deactivateUser(@Param('id') id: string): Promise<UserEntity | Error> {
    return this.usersService.deactivateUser(id);
  }

  @Post(':id/drivers')
  @ApiResponse({ status: 201, description: 'Add a driver to a user' })
  async addDriverToUser(
    @Param('id') userId: string,
    @Body() driver: DriverEntity
  ): Promise<void | Error> {
    return this.usersService.addDriverToUser(userId, driver);
  }

  @Get(':id/drivers')
  @ApiResponse({ status: 200, description: 'Get all drivers for a user', type: [DriverEntity] })
  async getDriversForUser(@Param('id') userId: string): Promise<DriverEntity[] | Error> {
    return this.usersService.getDriversForUser(userId);
  }

  @Delete(':id/drivers/:driverId')
  @ApiResponse({ status: 200, description: 'Remove a driver from a user' })
  async removeDriverFromUser(
    @Param('id') userId: string,
    @Param('driverId') driverId: string
  ): Promise<void | Error> {
    return this.usersService.removeDriverFromUser(userId, driverId);
  }
}
