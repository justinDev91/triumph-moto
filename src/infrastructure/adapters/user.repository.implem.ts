import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositoryInterface } from '@application/repositories/UserRepositoryInterface';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { UserEntity } from '@domain/entities/user/UserEntity';
import { UserNotFoundError } from '@domain/errors/user/UserNotFoundError';

@Injectable()
export class UserRepositoryImplem implements UserRepositoryInterface {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, 
  ) {}

  async update(user: UserEntity): Promise<void> {
    const userOrmEntity = this.toOrmEntity(user);
    await this.usersRepository.save(userOrmEntity);
  }

  private toDomain(user: User): UserEntity {
    const userEntity = UserEntity.create(
      user.id,
      user.firstName,
      user.lastName,
      user.password,
      user.createdAt,
      user.administrator,
      user.updatedAt,
      user.isActive,
    );

    if (userEntity instanceof Error) {
      throw userEntity;
    }

    return userEntity;
  }

  private toOrmEntity(user: UserEntity): User {
    const userOrmEntity = new User();
    userOrmEntity.firstName = user.firstName.value;
    userOrmEntity.lastName = user.lastName.value;
    userOrmEntity.password = user.password.value;
    userOrmEntity.createdAt = user.createdAt;
    userOrmEntity.updatedAt = user.updatedAt;
    userOrmEntity.isActive = user.isActive;
    userOrmEntity.administrator = user.isAdmin();
    return userOrmEntity;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const userOrmEntity = this.toOrmEntity(user);
    const savedUser = await this.usersRepository.save(userOrmEntity);
    return this.toDomain(savedUser);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.usersRepository.find();
    return users.map(this.toDomain);
  }

  async findOne(id: string): Promise<UserEntity | UserNotFoundError> {
    const user = await this.usersRepository.findOne({ where: { id } });
    
    if(!user) return new UserNotFoundError();

    return this.toDomain(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
