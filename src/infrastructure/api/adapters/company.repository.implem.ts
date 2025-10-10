import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepositoryInterface } from '@application/repositories/CompanyRepositoryInterface';
import { Company } from '@api/companies/company.entity';
import { CompanyEntity } from '@domain/entities/company/CompanyEntity';
import { CompanyNotFoundError } from '@domain/errors/company/CompanyNotFoundError';
import { ConcessionEntity } from '@domain/entities/concession/ConcessionEntity';
import { toOrmCompany } from '@helpers/company/to-orm-company';
import { toOrmConcession } from '@helpers/concession/to-orm-concession';
import { toDomainCompany } from '@helpers/company/to-domain-company';
import { ConcessionNotFoundError } from '@domain/errors/concession/ConcessionNotFoundError';
import { ConcessionAlreadAssignedError } from '@domain/errors/company/ConcessionAlreadAssignedError';
import { Concession } from '@api/concessions/concession.entity';
import { ConcessionNotAssignedError } from '@domain/errors/company/ConcessionNotAssignedError';
import { Driver } from '@api/drivers/driver.entity';
import { DriverNotFoundError } from '@domain/errors/driver/DriverNotFoundError';
import { DriverAlreadAssignedError } from '@domain/errors/company/DriverAlreadAssignedError';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';
import { MotorcycleNotFoundError } from '@domain/errors/motorcycle/MotorcycleNotFoundError';
import { MotorcycleAlreadAssignedError } from '@domain/errors/company/MotorcycleAlreadAssignedError';
import { MotorcycleNotAssignedError } from '@domain/errors/company/MotorcycleNotAssignedError';

@Injectable()
export class CompanyRepositoryImplem implements CompanyRepositoryInterface {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>, 

    @InjectRepository(Concession)
    private readonly concessionRepository: Repository<Concession>,
    
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,

    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>,
  ) {}
  
  async removeMotorcycle(companyId: string, motorcycleId: string): Promise<void | Error> {
    const motorcycle = await this.motorcycleRepository.findOne({ where: { id: motorcycleId }, relations: ["company"] });
    if (!motorcycle) return new MotorcycleNotFoundError();
    
    const company = await this.companyRepository.findOne(
      { where: { id: companyId }, relations: ["motorcycles"] }
    );
    if (!company) return new CompanyNotFoundError();
    
    if (!company?.motorcycles?.some(motorcycle => motorcycle.id === motorcycleId)) {
      return new MotorcycleNotAssignedError();
    }

    company.motorcycles = company.motorcycles.filter(motorcycle => motorcycle.id !== motorcycleId);

    await this.motorcycleRepository.update(motorcycleId, {
      company: null,
      updatedAt: new Date(),
    });

    await this.companyRepository.save(company);
  }
  
  async addMotorcycle(companyId: string, motorcycleId: string): Promise<void | Error> {
    const company = await this.companyRepository.findOne({ 
      where: { id: companyId }, 
      relations: ["motorcycles"] 
    });
    if (!company) return new CompanyNotFoundError();

    const motorcycle = await this.motorcycleRepository.findOne({ 
        where: { id: motorcycleId },
        relations: ["company"]
    });
    if (!motorcycle) return new MotorcycleNotFoundError();

    if (company.motorcycles?.some(existingMotorcycle => existingMotorcycle.id === motorcycleId)) {
      return new MotorcycleAlreadAssignedError();
    }

    await this.motorcycleRepository.update(motorcycleId, {
      company,
      updatedAt: new Date(),
    });

    company.motorcycles.push(motorcycle);
    await this.companyRepository.save(company);
  }
  
  async removeDriver(companyId: string, driverId: string): Promise<void | Error> {
    const driver = await this.driverRepository.findOne({ where: { id: driverId }, relations: ["company"] });
    if (!driver) return new DriverNotFoundError();
    
    const company = await this.companyRepository.findOne(
      { where: { id: companyId }, relations: ["drivers"] }
    );
    if (!company) return new CompanyNotFoundError();
    
    if (!company?.drivers?.some(driver => driver.id === driverId)) {
      return new ConcessionNotAssignedError();
    }

    company.drivers = company.drivers.filter(driver => driver.id !== driverId);

    await this.driverRepository.update(driverId, {
      company: null,
      updatedAt: new Date(),
    });

    await this.companyRepository.save(company);
  }

  async addDriver(companyId: string, driverId: string): Promise<void | Error> {
    const company = await this.companyRepository.findOne({ 
      where: { id: companyId }, 
      relations: ["drivers"] 
    });
    if (!company) return new CompanyNotFoundError();

    const driver = await this.driverRepository.findOne({ 
        where: { id: driverId },
        relations: ["company"]
    });
    if (!driver) return new DriverNotFoundError();

    if (company.drivers?.some(existingDriver => existingDriver.id === driverId)) {
      return new DriverAlreadAssignedError();
    }

    await this.driverRepository.update(driverId, {
      company,
      updatedAt: new Date(),
    });

    company.drivers.push(driver);
    await this.companyRepository.save(company);
  }

  async removeConcession(companyId: string, concessionId: string): Promise<void | Error> {
    const concession = await this.concessionRepository.findOne({ where: { id: concessionId }, relations: ["companies"] });
    if (!concession) return new ConcessionNotFoundError();
    
    const company = await this.companyRepository.findOne(
      { where: { id: companyId }, relations: ["concessions"] }
    );
    if (!company) return new CompanyNotFoundError();
    
    if (!company?.concessions?.some(company => company.id === concessionId)) {
      return new ConcessionNotAssignedError();
    }

    company.concessions = company.concessions.filter(company => company.id !== concessionId);

    await this.concessionRepository.update(concessionId, {
      company: null,
      updatedAt: new Date(),
    });

    await this.companyRepository.save(company);
  }

  async addConcession(companyId: string, concessionId: string): Promise<void | Error> {
    const concession = await this.concessionRepository.findOne({ where: { id: concessionId }, relations: ["company"] });
    if (!concession) return new ConcessionNotFoundError();

    const company = await this.companyRepository.findOne({ where: { id: companyId }, relations: ["concessions"] });
    if (!company) return new CompanyNotFoundError();

    if (company.concessions?.some(existingConcession => existingConcession.id === concessionId)) {
        return new ConcessionAlreadAssignedError();
    }

    await this.concessionRepository.update(concessionId, {
      company,
      updatedAt: new Date(),
    });

    company.concessions.push(concession);

    await this.companyRepository.save(company);
  }


  async save(company: CompanyEntity): Promise<void> {
    const companyOrm = toOrmCompany(company);    
    await this.companyRepository.save(companyOrm);
  }

  async update(company: CompanyEntity): Promise<void | Error> {
    const companyOrm = await this.companyRepository.findOne({ where: { id: company.id } });
    if (!companyOrm) return new CompanyNotFoundError();
    
    const companyOrmEntity = toOrmCompany(company);

    if(companyOrmEntity instanceof Error) return companyOrmEntity
    
    await this.companyRepository.save(companyOrmEntity);
  }

  async findAll(): Promise<CompanyEntity[] | Error> {
    const companiesOrm = await this.companyRepository.find(
      { relations: ['concessions', 'user', 'drivers', 'motorcycles'] }
    );
    if (!companiesOrm.length) return new CompanyNotFoundError();
    
    const companies = companiesOrm.map(companyOrm => toDomainCompany(companyOrm));

    if(companies instanceof Error) return companies

    return companies as CompanyEntity[];
  }
  
  async findById(identifier: string): Promise<CompanyEntity | Error> {
    const companyOrm = await this.companyRepository.findOne(
      { where: { id: identifier },
      relations: ['concessions', 'user', 'drivers', 'motorcycles']
      },
    );
    if (!companyOrm) return new CompanyNotFoundError();
    return toDomainCompany(companyOrm);
  }

  async findByName(name: string): Promise<CompanyEntity | Error> {
    const companyOrm = await this.companyRepository.findOne(
      { where: { name },
      relations: ['concessions', 'user', 'drivers', 'motorcycles']
      }
    );
    if (!companyOrm) return new CompanyNotFoundError();
    
    return toDomainCompany(companyOrm);
  }

  async addConcessionToCompany(companyId: string, concession: ConcessionEntity): Promise<void | Error> {
    const companyOrm = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['concessions'], 
    });
    
    if (!companyOrm) throw new CompanyNotFoundError();
  
    const concessionOrm = toOrmConcession(concession);
  
    companyOrm.concessions.push(concessionOrm);
  
    await this.companyRepository.save(companyOrm);
  }

  async removeConcessionFromCompany(companyId: string, concessionId: string): Promise<void | Error> {
    const companyOrm = await this.companyRepository.findOne({ where: { id: companyId }, relations: ['concessions'] });
    if (!companyOrm) return new CompanyNotFoundError();

    companyOrm.concessions = companyOrm.concessions.filter(c => c.id !== concessionId);
    await this.companyRepository.save(companyOrm);
  }

}
