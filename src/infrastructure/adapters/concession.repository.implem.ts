import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConcessionRepositoryInterface } from "@application/repositories/ConcessionRepositoryInterface";
import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";
import { Concession } from "@infrastructure/concessions/concession.entity";
import { Motorcycle } from "@infrastructure/motorcycles/motorcycle.entity";
import { User } from "@infrastructure/users/user.entity";
import { Company } from "@infrastructure/companies/company.entity";
import { toDomainUser } from "@infrastructure/helpers/user/to-domain-user";
import { toDomainCompany } from "@infrastructure/helpers/company/to-domain-company";
import { toDomainMotorcycle } from "@infrastructure/helpers/motorcycle/to-domain-motorcycle";
import { UserEntity } from "@domain/entities/user/UserEntity";
import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { ConcessionNotFoundError } from "@domain/errors/concession/ConcessionNotFoundError";

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
