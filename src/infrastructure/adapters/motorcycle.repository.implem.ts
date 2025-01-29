import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MotorcycleRepositoryInterface } from '@application/repositories/MotorcycleRepositoryInterface';
import { MotorcycleEntity } from '@domain/entities/motorcycle/MotorcycleEntity';
import { MotorcycleNotFoundError } from '@domain/errors/motorcycle/MotorcycleNotFoundError';
import { toOrmMotorcycle } from '@infrastructure/helpers/motorcycle/to-orm-motorcycle';
import { toDomainMotorcycle } from '@infrastructure/helpers/motorcycle/to-domain-motorcycle';
import { Motorcycle } from '@infrastructure/motorcycles/motorcycle.entity';

@Injectable()
export class MotorcycleRepositoryImplem implements MotorcycleRepositoryInterface {
  constructor(
    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>,
  ) {}

  async save(motorcycle: MotorcycleEntity): Promise<void> {
    const motorcycleOrm = toOrmMotorcycle(motorcycle);
    await this.motorcycleRepository.save(motorcycleOrm);
  }

  async findAll(): Promise<MotorcycleEntity[] | Error> {
    const allMotorcycles = await this.motorcycleRepository.find();
    if (!allMotorcycles || allMotorcycles.length === 0) return new MotorcycleNotFoundError();
    
    return allMotorcycles.map(toDomainMotorcycle) as MotorcycleEntity[]
  }

  async findById(id: string): Promise<MotorcycleEntity | Error> {
    const motorcycleOrm = await this.motorcycleRepository.findOne({
      where: { id },
    });

    if (!motorcycleOrm) return new MotorcycleNotFoundError();

    return toDomainMotorcycle(motorcycleOrm);
  }

  async delete(id: string): Promise<void> {
    await this.motorcycleRepository.delete(id);
  }

  async update(motorcycle: MotorcycleEntity): Promise<void> {
    const motorcycleOrm = toOrmMotorcycle(motorcycle);
    await this.motorcycleRepository.update(motorcycleOrm.id, motorcycleOrm);
  }
}
