import { UserRepositoryInterface } from "@application/repositories/UserRepositoryInterface";
import { UserEntity } from "@domain/entities/user/UserEntity";

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface, 
  ) {}

  async execute(
    firstName: string,
    lastName: string,
    password: string,
    email: string,
  ): Promise<UserEntity | Error> { 

    const user = UserEntity.create(
      null,
      firstName,
      lastName,
      email,
      password,
      null,
      null,
      null,
      null
    );

    if (user instanceof Error) return user; 
    
    return this.userRepository.create(user); 
  }
}
