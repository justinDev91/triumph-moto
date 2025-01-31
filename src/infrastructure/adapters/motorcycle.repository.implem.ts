import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MotorcycleRepositoryInterface } from '@application/repositories/MotorcycleRepositoryInterface';
import { MotorcycleEntity } from '@domain/entities/motorcycle/MotorcycleEntity';
import { MotorcycleNotFoundError } from '@domain/errors/motorcycle/MotorcycleNotFoundError';
import { toOrmMotorcycle } from '@infrastructure/helpers/motorcycle/to-orm-motorcycle';
import { toDomainMotorcycle } from '@infrastructure/helpers/motorcycle/to-domain-motorcycle';
import { Motorcycle } from '@infrastructure/motorcycles/motorcycle.entity';
import { Company } from '@infrastructure/companies/company.entity';
import { toOrmCompany } from '@infrastructure/helpers/company/to-orm-company';

@Injectable()
export class MotorcycleRepositoryImplem implements MotorcycleRepositoryInterface {
  constructor(
    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>,
  ) {}

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
