import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "@domain/entities/user/UserEntity";
import { DriverEntity } from "@domain/entities/driver/DriverEntity";
import { ResponseUserDto } from "./dto/response-user.dto";
import { toResponseUserDto } from "./dto/to-user-dto";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: "User created successfully",
    type: UserEntity,
  })
  async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<ResponseUserDto | Error> {
    const user = await this.usersService.create(createUserDto);
    if (user instanceof Error) return user;
    return toResponseUserDto(user);
  }

  @Get("search")
  @ApiResponse({
    status: 200,
    description: "Search users by first or last name",
    type: [UserEntity],
  })
  async searchUsers(
    @Query("query") query: string
  ): Promise<ResponseUserDto[] | Error> {
    const users = await this.usersService.searchUsersByFirstOrLastName(query);
    if (users instanceof Error) return users;
    return users.map(toResponseUserDto);
  }

  @Get("filter-by-status")
  async filterByStatus(
    @Query("status") status: "active" | "inactive"
  ): Promise<UserEntity[] | Error> {
    return await this.usersService.filterUsersByStatus(status);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: "Get all users",
    type: [UserEntity],
  })
  async findAll(): Promise<ResponseUserDto[] | Error> {
    const users = await this.usersService.findAll();
    if (users instanceof Error) return users;
    return users.map(toResponseUserDto);
  }

  @Get(":id")
  @ApiResponse({ status: 200, description: "Get user by ID", type: UserEntity })
  async findOne(@Param("id") id: string): Promise<ResponseUserDto | Error> {
    const user = await this.usersService.findOne(id);
    if (user instanceof Error) return user;
    return toResponseUserDto(user);
  }

  @Get("email/:email")
  @ApiResponse({
    status: 200,
    description: "Get user by email",
    type: UserEntity,
  })
  async findOneByEmail(
    @Param("email") email: string
  ): Promise<ResponseUserDto | Error> {
    const user = await this.usersService.findOneByEmail(email);
    if (user instanceof Error) return user;
    return toResponseUserDto(user);
  }

  @Delete(":id")
  @ApiResponse({ status: 200, description: "Delete user by ID" })
  remove(@Param("id") id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Get(":id/check-admin")
  @ApiResponse({
    status: 200,
    description: "Check if the user is an administrator",
  })
  async checkUserIsAdmin(@Param("id") id: string): Promise<boolean | Error> {
    return this.usersService.checkUserIsAdmin(id);
  }

  @Get(":id/role")
  @ApiResponse({ status: 200, description: "Get user role" })
  async getUserRole(@Param("id") id: string): Promise<string | Error> {
    return this.usersService.getUserRole(id);
  }

  @Put(":id/activate")
  @ApiResponse({ status: 200, description: "Activate the user" })
  async activateUser(
    @Param("id") id: string
  ): Promise<ResponseUserDto | Error> {
    const user = await this.usersService.activateUser(id);
    if (user instanceof Error) return user;
    return toResponseUserDto(user);
  }

  @Put(":id/deactivate")
  @ApiResponse({ status: 200, description: "Deactivate the user" })
  async deactivateUser(
    @Param("id") id: string
  ): Promise<ResponseUserDto | Error> {
    const user = await this.usersService.deactivateUser(id);
    if (user instanceof Error) return user;
    return toResponseUserDto(user);
  }

  @Post(":id/drivers/:driverId")
  @ApiResponse({ status: 201, description: "Add a driver to a user" })
  async addDriverToUser(
    @Param("id") userId: string,
    @Param("driverId") driverId: string
  ): Promise<void | Error> {
    return this.usersService.addDriverToUser(userId, driverId);
  }

  @Get(":id/drivers")
  @ApiResponse({
    status: 200,
    description: "Get all drivers for a user",
    type: [DriverEntity],
  })
  async getDriversForUser(
    @Param("id") userId: string
  ): Promise<DriverEntity[] | Error> {
    return this.usersService.getDriversForUser(userId);
  }

  @Delete(":id/drivers/:driverId")
  @ApiResponse({ status: 200, description: "Remove a driver from a user" })
  async removeDriverFromUser(
    @Param("id") userId: string,
    @Param("driverId") driverId: string
  ): Promise<void | Error> {
    return this.usersService.removeDriverFromUser(userId, driverId);
  }

  @Patch(":id/toggle-status")
  async toggleUserStatus(@Param("id") userId: string): Promise<void> {
    this.usersService.toggleUserStatus(userId);
  }
}
