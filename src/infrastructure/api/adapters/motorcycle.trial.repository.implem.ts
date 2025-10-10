import { MotorcycleTrialEntity } from "@domain/entities/motorcycle/MotorcycleTrialEntity";
import { MotorcycleTrialRepositoryInterface } from "@application/repositories/MotorcycleTrialRepositoryInterface";
import { MotorcycleTrialNotFoundError } from "@domain/errors/motorcycle/MotorcycleTrialNotFoundError";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Motorcycle } from "@api/motorcycles/motorcycle.entity";
import { Driver } from "@api/drivers/driver.entity";
import { MotorcycleTrial } from "@api/motorcycle-trials/motorcycle-trial.entity";
import { toDomainMotorcycle } from "@helpers/motorcycle/to-domain-motorcycle";
import { toDomainDriver } from "@helpers/driver/to-domain-driver";
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

  async endTrial(id: string, endDate: Date): Promise<void> {
    await this.motorcycleTrialRepository.update(id, {
      endDate
    });
  }

  async save(motorcycleTrial: MotorcycleTrialEntity): Promise<void> {
        const motorcycle = await this.motorcycleRepository.findOne({
            where: { id: motorcycleTrial.motorcycle.id },
        });

      const driver = await this.driverRepository.findOne(
        {
            where: { id: motorcycleTrial.driver.id },
        }
        );

      const motorcycleTrialToSave = this.motorcycleTrialRepository.create({
        motorcycle,
        driver,
        startDate: motorcycleTrial.startDate.value,
        endDate: motorcycleTrial.endDate ? motorcycleTrial.endDate.value : null,
      });

      await this.motorcycleTrialRepository.save(motorcycleTrialToSave);
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
          trial.motorcycle ? toDomainMotorcycle(trial.motorcycle) as MotorcycleEntity: null,
          trial.driver ? toDomainDriver(trial.driver) : null,
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
