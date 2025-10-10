import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from '@api/users/users.controller';
import { UserRepositoryImplem } from '@api/adapters/user.repository.implem';
import { UsersService } from './users.service';
import { DriversModule } from '@api/drivers/drivers.module';

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
