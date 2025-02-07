import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositoryInterface } from '@application/repositories/UserRepositoryInterface';
import { Like, Repository } from 'typeorm';
import { User } from '@api/users/user.entity';
import { UserEntity } from '@domain/entities/user/UserEntity';
import { UserNotFoundError } from '@domain/errors/user/UserNotFoundError';
import { toDomainUser } from '@helpers/user/to-domain-user';
import { toOrmUser } from '@helpers/user/to-orm-user';

@Injectable()
export class UserRepositoryImplem implements UserRepositoryInterface {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, 
  ) {}
  
  async toggleStatus(id: string, user: UserEntity): Promise<void> {
      await this.usersRepository.update(id, {
          isActive: user.isActive
        });
  }
  
  async findByStatus(isActive: boolean): Promise<UserEntity[]> {
    const users = await this.usersRepository.find({
      where: {
        isActive: isActive,
      },
    });

    return users.map(toDomainUser) as UserEntity[];
  }

  async findByFirstOrLastName(query: string): Promise<UserEntity[]> {

    const users = await this.usersRepository.find({
      where: [
        { firstName: Like(`%${query}%`) },
        { lastName: Like(`%${query}%`) },
      ],
    });

    return users.map(toDomainUser) as UserEntity[];
  }

  async update(user: UserEntity): Promise<void> {
    const ormUser = toOrmUser(user);
  
    const existingUser = await this.usersRepository.findOne({ where: { id: user.id } });
    if (!existingUser) throw new Error("User not found");
    
    await this.usersRepository.save(ormUser);
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
