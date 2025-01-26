import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UserRepositoryImplem } from '../adapters/user.repository.implem';
import { UsersService } from './users.service';
import { DriversModule } from '@infrastructure/drivers/drivers.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  DriversModule
  ],
  providers: [
    UserRepositoryImplem, 
    UsersService
  ],
  
  controllers: [UsersController],
  exports: [UsersService, UserRepositoryImplem]
})
export class UsersModule {}
