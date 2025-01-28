import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepositoryInterface } from '@application/repositories/CompanyRepositoryInterface';
import { Company } from '@infrastructure/companies/company.entity';
import { CompanyEntity } from '@domain/entities/company/CompanyEntity';
import { CompanyNotFoundError } from '@domain/errors/company/CompanyNotFoundError';
import { ConcessionEntity } from '@domain/entities/concession/ConcessionEntity';
import { toOrmCompany } from '@infrastructure/helpers/to-orm-company';
import { toOrmConcession } from '@infrastructure/helpers/to-orm-concession';
import { toDomainCompany } from '@infrastructure/helpers/to-domain-company';

@Injectable()
export class CompanyRepositoryImplem implements CompanyRepositoryInterface {
  constructor(
    @InjectRepository(Company) private readonly companyRepo: Repository<Company>, 
  ) {}

  async save(company: CompanyEntity): Promise<void> {
    const companyOrm = toOrmCompany(company);
    await this.companyRepo.save(companyOrm);
  }

  async update(company: CompanyEntity): Promise<void | Error> {
    const companyOrm = await this.companyRepo.findOne({ where: { id: company.id } });
    if (!companyOrm) return new CompanyNotFoundError();

    const companyOrmEntity = toOrmCompany(company);

    if(companyOrmEntity instanceof Error) return companyOrmEntity
    
    companyOrmEntity.createdAt = companyOrm.createdAt;

    await this.companyRepo.save(companyOrmEntity);
  }

  async findById(identifier: string): Promise<CompanyEntity | Error> {
    const companyOrm = await this.companyRepo.findOne({ where: { id: identifier } });
    if (!companyOrm) return new CompanyNotFoundError();

    return toDomainCompany(companyOrm);
  }

  async findByName(name: string): Promise<CompanyEntity | Error> {
    const companyOrm = await this.companyRepo.findOne({ where: { name } });
    if (!companyOrm) return new CompanyNotFoundError();
    
    return toDomainCompany(companyOrm);
  }

  async addConcessionToCompany(companyId: string, concession: ConcessionEntity): Promise<void | Error> {
    const companyOrm = await this.companyRepo.findOne({
      where: { id: companyId },
      relations: ['concessions'], 
    });
    
    if (!companyOrm) throw new CompanyNotFoundError();
  
    const concessionOrm = toOrmConcession(concession);
  
    companyOrm.concessions.push(concessionOrm);
  
    await this.companyRepo.save(companyOrm);
  }

  async removeConcessionFromCompany(companyId: string, concessionId: string): Promise<void | Error> {
    const companyOrm = await this.companyRepo.findOne({ where: { id: companyId }, relations: ['concessions'] });
    if (!companyOrm) return new CompanyNotFoundError();

    companyOrm.concessions = companyOrm.concessions.filter(c => c.id !== concessionId);
    await this.companyRepo.save(companyOrm);
  }

}
