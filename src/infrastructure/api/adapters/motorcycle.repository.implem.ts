import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MotorcycleRepositoryInterface } from '@application/repositories/MotorcycleRepositoryInterface';
import { MotorcycleEntity } from '@domain/entities/motorcycle/MotorcycleEntity';
import { MotorcycleNotFoundError } from '@domain/errors/motorcycle/MotorcycleNotFoundError';
import { toOrmMotorcycle } from '@helpers/motorcycle/to-orm-motorcycle';
import { toDomainMotorcycle } from '@helpers/motorcycle/to-domain-motorcycle';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';
import { Company } from '@api/companies/company.entity';
import { toOrmCompany } from '@helpers/company/to-orm-company';
import { MotorStatusEnum } from '@api/types/MotorStatusEnum';

@Injectable()
export class MotorcycleRepositoryImplem implements MotorcycleRepositoryInterface {
  constructor(
    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>,
  ) {}
  
  async updateServiceDetails(id: string, nextServiceMileage: number, lastServiceDate: Date): Promise<void> {
    await this.motorcycleRepository.update(id, {
      nextServiceMileage,
      lastServiceDate: new Date(lastServiceDate),
      updatedAt: new Date(),
    });
  }

  async updateStatus(id: string, status: MotorStatusEnum): Promise<void> {
    await this.motorcycleRepository.update(id, {
      status,
      updatedAt: new Date(),
    });
  }

  async updateMileage(id: string, mileage: number): Promise<void>  {
    await this.motorcycleRepository.update(id, {
      mileage,
      updatedAt: new Date(),
    });
  }

  async save(motorcycle: MotorcycleEntity): Promise<void> {
    const motorcycleOrm = toOrmMotorcycle(motorcycle);
  
    if (motorcycle.company) {
      let companyOrm = await this.motorcycleRepository.manager.findOne(Company, {
        where: { id: motorcycle.company.id },
      });
  
      if (!companyOrm) {
        companyOrm = this.motorcycleRepository.manager.create(Company, toOrmCompany(motorcycle.company));
        await this.motorcycleRepository.manager.save(Company, companyOrm);
      }
  
      motorcycleOrm.company = companyOrm;
    }
    await this.motorcycleRepository.save(motorcycleOrm);
  }
  

  async findAll(): Promise<MotorcycleEntity[] | Error> {
    const allMotorcycles = await this.motorcycleRepository.find({
      relations : ['company', 'concession']
    });
    if (!allMotorcycles || allMotorcycles.length === 0) return new MotorcycleNotFoundError();

    return allMotorcycles.map(toDomainMotorcycle) as MotorcycleEntity[]
  }

  async findById(id: string): Promise<MotorcycleEntity | Error> {
    const motorcycleOrm = await this.motorcycleRepository.findOne({
      where: { id },
      relations : ['company', 'concession']
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
