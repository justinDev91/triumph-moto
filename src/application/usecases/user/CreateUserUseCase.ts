import { UserRepositoryInterface } from "@application/repositories/UserRepositoryInterface";
import { UserEntity } from "@domain/entities/user/UserEntity";

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface, 
  ) {}

  async execute(
    id: string,
    firstName: string,
    lastName: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    administrator: boolean,
    isActive: boolean = true,
  ): Promise<UserEntity | Error> { 

    const user = UserEntity.create(
      id,
      firstName,
      lastName,
      password,
      createdAt,
      administrator,  
      updatedAt,
      isActive, 
    );

    if (user instanceof Error) return user; 
    
    return this.userRepository.create(user); 
  }
}
