import { MotorcycleTrialEntity } from "@domain/entities/motorcycle/MotorcycleTrialEntity";
import { MotorcycleTrial } from "@infrastructure/motorcycle-trials/motorcycle-trial.entity";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { toDomainMotorcycle } from "../motorcycle/to-domain-motorcycle";
import { toDomainDriver } from "../driver/to-domain-driver";

export const toDomainMotorcycleTrial = (motorcycleTrialOrm: MotorcycleTrial): MotorcycleTrialEntity | Error => {
  const motorcycle = toDomainMotorcycle(motorcycleTrialOrm.motorcycle);
  const driver = toDomainDriver(motorcycleTrialOrm.driver);

  return MotorcycleTrialEntity.create(
    motorcycleTrialOrm.id,
    motorcycle as MotorcycleEntity,
    driver,
    motorcycleTrialOrm.startDate,
    motorcycleTrialOrm.endDate
  );
};
