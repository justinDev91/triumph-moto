import { Injectable } from '@nestjs/common';
import { CreateMotorcycleTrialUsecase } from '@application/usecases/motorcycleTrial/CreateMotorcycleTrialUsecase';
import { DeleteMotorcycleTrialUsecase } from '@application/usecases/motorcycleTrial/DeleteMotorcycleTrialUsecase';
import { FindMotorcycleTrialByIdUsecase } from '@application/usecases/motorcycleTrial/FindMotorcycleTrialByIdUsecase';
import { EndMotorcycleTrialUsecase } from '@application/usecases/motorcycleTrial/EndMotorcycleTrialUsecase';
import { GetMotorcycleTrialSummaryUsecase } from '@application/usecases/motorcycleTrial/GetMotorcycleTrialSummaryUsecase';
import { CheckMotorcycleTrialStatusUsecase } from '@application/usecases/motorcycleTrial/CheckMotorcycleTrialStatusUsecase';
import { UpdateMotorcycleTrialUsecase } from '@application/usecases/motorcycleTrial/UpdateMotorcycleTrialUsecase';
import { MotorcycleTrialEntity } from '@domain/entities/motorcycle/MotorcycleTrialEntity';
import { DriverEntity } from '@domain/entities/driver/DriverEntity';
import { MotorcycleEntity } from '@domain/entities/motorcycle/MotorcycleEntity';
import { MotorcycleTrialRepositoryImplem } from '@infrastructure/adapters/motorcycle.trial.repository.implem';

@Injectable()
export class MotorcycleTrialService {
  private readonly createMotorcycleTrialUsecase: CreateMotorcycleTrialUsecase;
  private readonly deleteMotorcycleTrialUsecase: DeleteMotorcycleTrialUsecase;
  private readonly findMotorcycleTrialByIdUsecase: FindMotorcycleTrialByIdUsecase;
  private readonly endMotorcycleTrialUsecase: EndMotorcycleTrialUsecase;
  private readonly getMotorcycleTrialSummaryUsecase: GetMotorcycleTrialSummaryUsecase;
  private readonly checkMotorcycleTrialStatusUsecase: CheckMotorcycleTrialStatusUsecase;
  private readonly updateMotorcycleTrialUsecase: UpdateMotorcycleTrialUsecase;

  constructor(
    private readonly motorcycleTrialRepository: MotorcycleTrialRepositoryImplem,
  ) {
    this.createMotorcycleTrialUsecase = new CreateMotorcycleTrialUsecase(motorcycleTrialRepository);
    this.deleteMotorcycleTrialUsecase = new DeleteMotorcycleTrialUsecase(motorcycleTrialRepository);
    this.findMotorcycleTrialByIdUsecase = new FindMotorcycleTrialByIdUsecase(motorcycleTrialRepository);
    this.endMotorcycleTrialUsecase = new EndMotorcycleTrialUsecase(motorcycleTrialRepository);
    this.getMotorcycleTrialSummaryUsecase = new GetMotorcycleTrialSummaryUsecase(motorcycleTrialRepository);
    this.checkMotorcycleTrialStatusUsecase = new CheckMotorcycleTrialStatusUsecase(motorcycleTrialRepository);
    this.updateMotorcycleTrialUsecase = new UpdateMotorcycleTrialUsecase(motorcycleTrialRepository);
  }

  async create(
    id: string,
    motorcycle: MotorcycleEntity,
    driver: DriverEntity,
    startDate: Date,
    endDate: Date,
  ): Promise<void | Error> {
    return await this.createMotorcycleTrialUsecase.execute(id, motorcycle, driver, startDate, endDate);
  }

  async delete(id: string): Promise<void | Error> {
    return await this.deleteMotorcycleTrialUsecase.execute(id);
  }

  async findById(id: string): Promise<MotorcycleTrialEntity | Error> {
    return await this.findMotorcycleTrialByIdUsecase.execute(id);
  }

  async endTrial(id: string, endDate: Date): Promise<void | Error> {
    return await this.endMotorcycleTrialUsecase.execute(id, endDate);
  }

  async getSummary(id: string): Promise<string | Error> {
    return await this.getMotorcycleTrialSummaryUsecase.execute(id);
  }

  async checkStatus(id: string): Promise<boolean | Error> {
    return await this.checkMotorcycleTrialStatusUsecase.execute(id);
  }

  async update(id: string, endDate: Date): Promise<void | Error> {
    return await this.updateMotorcycleTrialUsecase.execute(id, endDate);
  }
}
