import { MotorcycleTrial } from "@api/motorcycle-trials/motorcycle-trial.entity";
import { MotorcycleTrialEntity } from "@domain/entities/motorcycle/MotorcycleTrialEntity";
import { toOrmMotorcycle } from "../motorcycle/to-orm-motorcycle";
import { toOrmDriver } from "../driver/to-orm-driver";

export const toOrmMotorcycleTrial = (motorcycleTrial: MotorcycleTrialEntity): MotorcycleTrial => {
  const ormMotorcycleTrial = new MotorcycleTrial();

  ormMotorcycleTrial.motorcycle =  ormMotorcycleTrial.motorcycle? toOrmMotorcycle(motorcycleTrial.motorcycle) : null;
  ormMotorcycleTrial.driver = ormMotorcycleTrial.driver ? toOrmDriver(motorcycleTrial.driver) : null;
  ormMotorcycleTrial.startDate = motorcycleTrial.startDate.value;
  ormMotorcycleTrial.endDate = motorcycleTrial.endDate ? motorcycleTrial.endDate.value : null;
  return ormMotorcycleTrial;
};
