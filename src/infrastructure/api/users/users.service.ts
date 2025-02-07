import { DriverRepositoryImplem } from '@adapters/driver.repository.implem';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepositoryImplem } from '@api/adapters/user.repository.implem';
import { UserEntity } from '@domain/entities/user/UserEntity';
import { DriverEntity } from '@domain/entities/driver/DriverEntity';
import { CreateUserUseCase } from '@application/usecases/user/CreateUserUseCase';
import { GetAllUsersUseCase } from '@application/usecases/user/GetAllUsersUseCase';
import { GetUserByIdUseCase } from '@application/usecases/user/GetUserByIdUseCase';
import { DeleteUserUseCase } from '@application/usecases/user/DeleteUserUseCase';
import { CheckUserIsAdminUsecase } from '@application/usecases/user/CheckUserIsAdminUsecase';
import { GetUserRoleUsecase } from '@application/usecases/user/GetUserRoleUsecase';
import { UserActivateUseCase } from '@application/usecases/user/UserActivateUseCase';
import { UserDeactivateUseCase } from '@application/usecases/user/UserDeactivateUseCase';
import { AddDriverToUserUsecase } from '@application/usecases/user/AddDriverToUserUsecase';
import { GetDriversForUserUsecase } from '@application/usecases/user/GetDriversForUserUsecase';
import { RemoveDriverFromUserUsecase } from '@application/usecases/user/RemoveDriverFromUserUsecase';
import { SearchUserByFirstOrLastNameUseCase } from '@application/usecases/user/SearchUserByFirstOrLastNameUseCase';

@Injectable()
export class UsersService {
  private readonly createUserUseCase: CreateUserUseCase;
  private readonly getAllUsersUseCase: GetAllUsersUseCase;
  private readonly getUserByIdUseCase: GetUserByIdUseCase;
  private readonly deleteUserUseCase: DeleteUserUseCase;
  private readonly checkUserIsAdminUsecase: CheckUserIsAdminUsecase;
  private readonly getUserRoleUsecase: GetUserRoleUsecase;
  private readonly userActivateUseCase: UserActivateUseCase;
  private readonly userDeactivateUseCase: UserDeactivateUseCase;
  private readonly addDriverToUserUsecase: AddDriverToUserUsecase;
  private readonly getDriversForUserUsecase: GetDriversForUserUsecase;
  private readonly removeDriverFromUserUsecase: RemoveDriverFromUserUsecase;
  private readonly searchUserByFirstOrLastNameUseCase: SearchUserByFirstOrLastNameUseCase;

  constructor(
    private readonly userRepository: UserRepositoryImplem,
    private readonly driverRepository: DriverRepositoryImplem
  ) {
    this.createUserUseCase = new CreateUserUseCase(userRepository);
    this.getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
    this.getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
    this.deleteUserUseCase = new DeleteUserUseCase(userRepository);
    this.checkUserIsAdminUsecase = new CheckUserIsAdminUsecase(userRepository);
    this.getUserRoleUsecase = new GetUserRoleUsecase(userRepository);
    this.userActivateUseCase = new UserActivateUseCase(userRepository);
    this.userDeactivateUseCase = new UserDeactivateUseCase(userRepository);
    this.addDriverToUserUsecase = new AddDriverToUserUsecase(userRepository, driverRepository);
    this.getDriversForUserUsecase = new GetDriversForUserUsecase(userRepository, driverRepository);
    this.removeDriverFromUserUsecase = new RemoveDriverFromUserUsecase(userRepository, driverRepository);
    this.searchUserByFirstOrLastNameUseCase = new SearchUserByFirstOrLastNameUseCase(userRepository); 
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity | Error> {
    const { 
      firstName, 
      lastName,
      email, 
      password, 
    } = createUserDto;
  
    return await this.createUserUseCase.execute(
      firstName, 
      lastName, 
      password,    
      email,      
    );
  }

  async findAll(): Promise<UserEntity[] | Error> {
    return this.getAllUsersUseCase.execute();
  }

  async findOne(id: string): Promise<UserEntity | Error> {
    return this.getUserByIdUseCase.execute(id);
  }

  async remove(id: string): Promise<void> {
    return this.deleteUserUseCase.execute(id);
  }

  async checkUserIsAdmin(userId: string): Promise<boolean | Error> {
    return this.checkUserIsAdminUsecase.execute(userId);
  }

  async getUserRole(userId: string): Promise<string | Error> {
    return this.getUserRoleUsecase.execute(userId);
  }

  async activateUser(userId: string): Promise<UserEntity | Error> {
    return this.userActivateUseCase.execute(userId);
  }

  async deactivateUser(userId: string): Promise<UserEntity | Error> {
    return this.userDeactivateUseCase.execute(userId);
  }

  async addDriverToUser(userId: string, driverId: string): Promise<void | Error> {
    return this.addDriverToUserUsecase.execute(userId, driverId);
  }

  async getDriversForUser(userId: string): Promise<DriverEntity[] | Error> {
    return this.getDriversForUserUsecase.execute(userId);
  }

  async removeDriverFromUser(userId: string, driverId: string): Promise<void | Error> {
    return this.removeDriverFromUserUsecase.execute(userId, driverId);
  }

  async searchUsersByFirstOrLastName(query: string): Promise<UserEntity[] | Error> {
    return this.searchUserByFirstOrLastNameUseCase.execute(query);
  }
}
