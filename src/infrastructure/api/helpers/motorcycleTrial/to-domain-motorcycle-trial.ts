import { MotorcycleTrialEntity } from "@domain/entities/motorcycle/MotorcycleTrialEntity";
import { MotorcycleTrial } from "@api/motorcycle-trials/motorcycle-trial.entity";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { toDomainMotorcycle } from "../motorcycle/to-domain-motorcycle";
import { toDomainDriver } from "../driver/to-domain-driver";

export const toDomainMotorcycleTrial = (motorcycleTrialOrm: MotorcycleTrial): MotorcycleTrialEntity | Error => {
  const motorcycle = motorcycleTrialOrm.motorcycle ?  toDomainMotorcycle(motorcycleTrialOrm.motorcycle): null;
  const driver = motorcycleTrialOrm.driver ? toDomainDriver(motorcycleTrialOrm.driver) : null;

  return MotorcycleTrialEntity.create(
    motorcycleTrialOrm.id,
    motorcycle as MotorcycleEntity,
    driver,
    motorcycleTrialOrm.startDate,
    motorcycleTrialOrm.endDate
  );
};
