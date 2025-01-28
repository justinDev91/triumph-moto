import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositoryInterface } from '@application/repositories/UserRepositoryInterface';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { UserEntity } from '@domain/entities/user/UserEntity';
import { UserNotFoundError } from '@domain/errors/user/UserNotFoundError';
import { toDomainUser } from '@infrastructure/helpers/to-domain-user';
import { toOrmUser } from '@infrastructure/helpers/to-orm-user';

@Injectable()
export class UserRepositoryImplem implements UserRepositoryInterface {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, 
  ) {}

  async update(user: UserEntity): Promise<void> {
    const userOrmEntity = toOrmUser(user);
    await this.usersRepository.save(userOrmEntity);
  }


    async create(user: UserEntity): Promise<UserEntity | Error> {
    const userOrmEntity = toOrmUser(user);
    
    const savedUser = await this.usersRepository.save(userOrmEntity);
    return toDomainUser(savedUser);
  }

  async findAll(): Promise<UserEntity[] | Error> {
    const users = await this.usersRepository.find();
    return users.map(toDomainUser)  as UserEntity[];
  }

  async findOne(id: string): Promise<UserEntity | Error> {
    const user = await this.usersRepository.findOne({ where: { id } });
    
    if(!user) return new UserNotFoundError();

    return toDomainUser(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
