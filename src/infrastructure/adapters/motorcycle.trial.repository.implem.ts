import { MotorcycleTrialEntity } from "@domain/entities/motorcycle/MotorcycleTrialEntity";
import { MotorcycleTrialRepositoryInterface } from "@application/repositories/MotorcycleTrialRepositoryInterface";
import { MotorcycleTrialNotFoundError } from "@domain/errors/motorcycle/MotorcycleTrialNotFoundError";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Motorcycle } from "@infrastructure/motorcycles/motorcycle.entity";
import { Driver } from "@infrastructure/drivers/driver.entity";
import { MotorcycleTrial } from "@infrastructure/motorcycle-trials/motorcycle-trial.entity";
import { toDomainMotorcycle } from "@infrastructure/helpers/motorcycle/to-domain-motorcycle";
import { toDomainDriver } from "@infrastructure/helpers/driver/to-domain-driver";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";

export class MotorcycleTrialRepositoryImplem implements MotorcycleTrialRepositoryInterface {
  constructor(
    @InjectRepository(MotorcycleTrial)
    private readonly motorcycleTrialRepository: Repository<MotorcycleTrial>,

    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>,

    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async save(motorcycleTrial: MotorcycleTrialEntity): Promise<void> {
    try {
        const motorcycle = await this.motorcycleRepository.findOne({
            where: { id: motorcycleTrial.motorcycle.id },
        });

      const driver = await this.driverRepository.findOne(
        {
            where: { id: motorcycleTrial.driver.id },
        }
        );

      const motorcycleTrialToSave = this.motorcycleTrialRepository.create({
        id: motorcycleTrial.id,
        motorcycle,
        driver,
        startDate: motorcycleTrial.startDate.value,
        endDate: motorcycleTrial.endDate ? motorcycleTrial.endDate.value : null,
      });

      await this.motorcycleTrialRepository.save(motorcycleTrialToSave);
    } catch (error) {
      throw new Error("Failed to save motorcycle trial");
    }
  }

  async findById(id: string): Promise<MotorcycleTrialEntity | Error> {
    try {
      const motorcycleTrial = await this.motorcycleTrialRepository.findOne({
        where: { id },
        relations: ["motorcycle", "driver"],
      });

      if (!motorcycleTrial) {
        return new MotorcycleTrialNotFoundError();
      }

      const motorcycle = toDomainMotorcycle(motorcycleTrial.motorcycle)

      if(motorcycle instanceof Error) return motorcycle

      const driver = toDomainDriver(motorcycleTrial.driver)

      const motorcycleTrialEntity = MotorcycleTrialEntity.create(
        motorcycleTrial.id,
        motorcycle,
        driver,
        motorcycleTrial.startDate,
        motorcycleTrial.endDate,
      );

      return motorcycleTrialEntity;
    } catch (error) {
      throw new Error("Failed to find motorcycle trial");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const motorcycleTrial = await this.motorcycleTrialRepository.findOne({ where: { id } });

      if (!motorcycleTrial) throw new MotorcycleTrialNotFoundError();
      
      await this.motorcycleTrialRepository.remove(motorcycleTrial);
    } catch (error) {
      throw new Error("Failed to delete motorcycle trial");
    }
  }

  async findAll(): Promise<MotorcycleTrialEntity[] | Error> {
    try {
      const motorcycleTrials = await this.motorcycleTrialRepository.find({
        relations: ["motorcycle", "driver"],
      });

      if (!motorcycleTrials.length) return new MotorcycleTrialNotFoundError();
      
      const motorcycleTrialEntities = motorcycleTrials.map((trial) =>
         MotorcycleTrialEntity.create(
          trial.id,
          toDomainMotorcycle(trial.motorcycle) as MotorcycleEntity,
          toDomainDriver(trial.driver),
          trial.startDate,
          trial.endDate,
        ),
      );

      if(motorcycleTrialEntities instanceof Error) return motorcycleTrialEntities

      return motorcycleTrialEntities as MotorcycleTrialEntity[]
      
    } catch (error) {
      throw new Error("Failed to find motorcycle trials");
    }
  }

  async update(motorcycleTrial: MotorcycleTrialEntity): Promise<void> {
    try {
      const motorcycleTrialToUpdate = await this.motorcycleTrialRepository.findOne({
        where: { id: motorcycleTrial.id },
      });

      if (!motorcycleTrialToUpdate) {
        throw new MotorcycleTrialNotFoundError();
      }

      motorcycleTrialToUpdate.startDate = motorcycleTrial.startDate.value;
      motorcycleTrialToUpdate.endDate = motorcycleTrial.endDate ? motorcycleTrial.endDate.value : null;

      await this.motorcycleTrialRepository.save(motorcycleTrialToUpdate);
    } catch (error) {
      throw new Error("Failed to update motorcycle trial");
    }
  }
}
