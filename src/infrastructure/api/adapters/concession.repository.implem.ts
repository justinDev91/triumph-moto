import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConcessionRepositoryInterface } from "@application/repositories/ConcessionRepositoryInterface";
import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";
import { Concession } from "@api/concessions/concession.entity";
import { Motorcycle } from "@api/motorcycles/motorcycle.entity";
import { User } from "@api/users/user.entity";
import { Company } from "@api/companies/company.entity";
import { toDomainUser } from "@helpers/user/to-domain-user";
import { toDomainCompany } from "@helpers/company/to-domain-company";
import { toDomainMotorcycle } from "@helpers/motorcycle/to-domain-motorcycle";
import { UserEntity } from "@domain/entities/user/UserEntity";
import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { ConcessionNotFoundError } from "@domain/errors/concession/ConcessionNotFoundError";
import { MotorcycleNotFoundError } from "@domain/errors/motorcycle/MotorcycleNotFoundError";
import { MotorcycleAlreadAssignedError } from "@domain/errors/company/MotorcycleAlreadAssignedError";
import { MotorcycleNotAssignedError } from "@domain/errors/company/MotorcycleNotAssignedError";
import { CompanyAlreadyExisteError } from "@domain/errors/company/CompanyAlreadyExisteError";

@Injectable()
export class ConcessionRepositoryImplem implements ConcessionRepositoryInterface {
  constructor(
    @InjectRepository(Concession)
    private readonly concessionRepository: Repository<Concession>,

    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>
  ) {}
  
  async addCompany(concessionId: string, companyId: string): Promise<void | Error> {
    const concession = await this.concessionRepository.findOne({ 
      where: { id: concessionId }, 
      relations: ["company"] 
    });
    if (!concession) return new ConcessionNotFoundError();

    const company = await this.companyRepository.findOne({ 
        where: { id: companyId },
        relations: ["concessions"]
    });
    if (!company) return new MotorcycleNotFoundError();
    
    if (company.concessions?.some(existingConcession=> existingConcession.id === concessionId)) {
      return new CompanyAlreadyExisteError();
    }

    await this.concessionRepository.update(concessionId, {
      company,
      updatedAt: new Date(),
    });
    company.concessions.push(concession);
    await this.companyRepository.save(concession);
  }
  
  async removeMotorcycle(concessionId: string, motorcycleId: string): Promise<void | Error> {
    const motorcycle = await this.motorcycleRepository.findOne({ where: { id: motorcycleId }, relations: ["concession"] });
        if (!motorcycle) return new MotorcycleNotFoundError();
        
        const concession = await this.concessionRepository.findOne(
          { where: { id: concessionId }, relations: ["motorcycles"] }
        );
        if (!concession) return new ConcessionNotFoundError();
        
        if (!concession?.motorcycles?.some(motorcycle => motorcycle.id === motorcycleId)) {
          return new MotorcycleNotAssignedError();
        }
    
        concession.motorcycles = concession.motorcycles.filter(motorcycle => motorcycle.id !== motorcycleId);
    
        await this.motorcycleRepository.update(motorcycleId, {
          concession: null,
          updatedAt: new Date(),
        });
    
        await this.concessionRepository.save(concession);
  }

  async addMotorcycle(concessionId: string, motorcycleId: string): Promise<void | Error> {
     const concession = await this.concessionRepository.findOne({ 
          where: { id: concessionId }, 
          relations: ["motorcycles"] 
        });
        if (!concession) return new ConcessionNotFoundError();
    
        const motorcycle = await this.motorcycleRepository.findOne({ 
            where: { id: motorcycleId },
            relations: ["concession"]
        });
        if (!motorcycle) return new MotorcycleNotFoundError();
    
        if (concession.motorcycles?.some(existingMotorcycle => existingMotorcycle.id === motorcycleId)) {
          return new MotorcycleAlreadAssignedError();
        }
    
        await this.motorcycleRepository.update(motorcycleId, {
          concession,
          updatedAt: new Date(),
        });
    
        concession.motorcycles.push(motorcycle);
        await this.concessionRepository.save(concession);
  }

  async save(concession: ConcessionEntity): Promise<void> {
    try {
      const concessionToSave = this.concessionRepository.create({
        name: concession.name.value,
        user: await this.userRepository.findOne({
          where: { id: concession.user.id },
        }),
        company: await this.companyRepository.findOne({
          where: { id: concession.company.id },
        }),
      });
      await this.concessionRepository.save(concessionToSave);

    } catch (error) {
      throw new Error("Failed to save concession");
    }
  }

  async findById(identifier: string): Promise<ConcessionEntity | Error> {
    try {
      const concession = await this.concessionRepository.findOne({
        where: { id: identifier },
        relations: ["user", "motorcycles", "company"],
      });

      if (!concession) {
        return new ConcessionNotFoundError();
      }

      const user = toDomainUser(concession.user);
      if (user instanceof Error) return user;

      const company = toDomainCompany(concession.company);
      if (company instanceof Error) return company;

      const concessionEntity = ConcessionEntity.create(
        concession.id,
        concession.name,
        user,
        company,
        concession.createdAt,
        concession.updatedAt
      );
      if (concessionEntity instanceof Error) {
        return concessionEntity;
      }

      concession.motorcycles.forEach((motorcycle) => {
        const motorcycleEntity = toDomainMotorcycle(motorcycle);
        if (motorcycleEntity instanceof Error) return;
        concessionEntity.addMotorcycle(motorcycleEntity);
      });

      return concessionEntity;
    } catch (error) {
      throw new Error("Failed to find concession");
    }
  }

  async findAll(): Promise<ConcessionEntity[] | Error> {
    try {
      const concessions = await this.concessionRepository.find({
        relations: ["user", "motorcycles", "company"],
      });

      if (concessions.length === 0) {
        return new Error("No concessions found");
      }

      const concessionEntities = concessions.map((concession) => {
        const user = toDomainUser(concession.user) as UserEntity;
        const company = toDomainCompany(concession.company) as CompanyEntity;

        const concessionEntity = ConcessionEntity.create(
          concession.id,
          concession.name,
          user,
          company,
          concession.createdAt,
          concession.updatedAt
        );
        if (concessionEntity instanceof Error) {
          throw new Error("Failed to create concession entity");
        }

        concession.motorcycles.forEach((motorcycle) => {
          const motorcycleEntity = toDomainMotorcycle(motorcycle);
          if (motorcycleEntity instanceof Error) return;
          concessionEntity.addMotorcycle(motorcycleEntity);
        });

        return concessionEntity;
      });

      return concessionEntities;
    } catch (error) {
      throw new Error("Failed to find all concessions");
    }
  }

  async update(concession: ConcessionEntity): Promise<void> {
    try {
      const concessionToUpdate = await this.concessionRepository.findOne({
        where: { id: concession.id },
        relations: ["user", "motorcycles", "company"],
      });

      if (!concessionToUpdate) throw new ConcessionNotFoundError();

      concessionToUpdate.name = concession.name.value;
      concessionToUpdate.updatedAt = new Date();

      await this.concessionRepository.save(concessionToUpdate);
    } catch (error) {
      throw new Error("Failed to update concession");
    }
  }

  async remove(identifier: string): Promise<void> {
    try {
      const concessionToRemove = await this.concessionRepository.findOne({
        where: { id: identifier },
      });

      if (!concessionToRemove) throw new Error("Concession not found");

      await this.concessionRepository.remove(concessionToRemove);
    } catch (error) {
      throw new Error("Failed to remove concession");
    }
  }
}
