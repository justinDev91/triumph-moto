import { Injectable } from '@nestjs/common';
import { CreateMotorcycleTrialUsecase } from '@application/usecases/motorcycleTrial/CreateMotorcycleTrialUsecase';
import { DeleteMotorcycleTrialUsecase } from '@application/usecases/motorcycleTrial/DeleteMotorcycleTrialUsecase';
import { FindMotorcycleTrialByIdUsecase } from '@application/usecases/motorcycleTrial/FindMotorcycleTrialByIdUsecase';
import { EndMotorcycleTrialUsecase } from '@application/usecases/motorcycleTrial/EndMotorcycleTrialUsecase';
import { GetMotorcycleTrialSummaryUsecase } from '@application/usecases/motorcycleTrial/GetMotorcycleTrialSummaryUsecase';
import { CheckMotorcycleTrialStatusUsecase } from '@application/usecases/motorcycleTrial/CheckMotorcycleTrialStatusUsecase';
import { UpdateMotorcycleTrialUsecase } from '@application/usecases/motorcycleTrial/UpdateMotorcycleTrialUsecase';
import { MotorcycleTrialEntity } from '@domain/entities/motorcycle/MotorcycleTrialEntity';
import { MotorcycleTrialRepositoryImplem } from '@infrastructure/adapters/motorcycle.trial.repository.implem';
import { CreateMotorcycleTrialDto } from './dto/create-motorcycle-trial-dto';
import { MotorcycleRepositoryImplem } from '@infrastructure/adapters/motorcycle.repository.implem';
import { DriverRepositoryImplem } from '@infrastructure/adapters/driver.repository.implem';
import { GetAllMotorcyclesTrialUsecase } from '@application/usecases/motorcycleTrial/GetAllMotorcycleTrial;Usecase';

@Injectable()
export class MotorcycleTrialService {
  private readonly createMotorcycleTrialUsecase: CreateMotorcycleTrialUsecase;
  private readonly deleteMotorcycleTrialUsecase: DeleteMotorcycleTrialUsecase;
  private readonly findMotorcycleTrialByIdUsecase: FindMotorcycleTrialByIdUsecase;
  private readonly endMotorcycleTrialUsecase: EndMotorcycleTrialUsecase;
  private readonly getMotorcycleTrialSummaryUsecase: GetMotorcycleTrialSummaryUsecase;
  private readonly checkMotorcycleTrialStatusUsecase: CheckMotorcycleTrialStatusUsecase;
  private readonly updateMotorcycleTrialUsecase: UpdateMotorcycleTrialUsecase;
  private readonly getAllMotorcyclesTrialUsecase : GetAllMotorcyclesTrialUsecase;

  constructor(
    private readonly motorcycleTrialRepository: MotorcycleTrialRepositoryImplem,
    private readonly motorcycleRepository: MotorcycleRepositoryImplem,
    private readonly driverRepository: DriverRepositoryImplem
  ) {
    this.createMotorcycleTrialUsecase = new CreateMotorcycleTrialUsecase(motorcycleTrialRepository, motorcycleRepository, driverRepository);
    this.deleteMotorcycleTrialUsecase = new DeleteMotorcycleTrialUsecase(motorcycleTrialRepository);
    this.findMotorcycleTrialByIdUsecase = new FindMotorcycleTrialByIdUsecase(motorcycleTrialRepository);
    this.endMotorcycleTrialUsecase = new EndMotorcycleTrialUsecase(motorcycleTrialRepository);
    this.getMotorcycleTrialSummaryUsecase = new GetMotorcycleTrialSummaryUsecase(motorcycleTrialRepository);
    this.checkMotorcycleTrialStatusUsecase = new CheckMotorcycleTrialStatusUsecase(motorcycleTrialRepository);
    this.updateMotorcycleTrialUsecase = new UpdateMotorcycleTrialUsecase(motorcycleTrialRepository);
    this.getAllMotorcyclesTrialUsecase = new GetAllMotorcyclesTrialUsecase(motorcycleTrialRepository)
  }

  async create(createMotorcycleTrialDto: CreateMotorcycleTrialDto): Promise<void | Error> {
    const {motorcycleId, driverId, startDate, endDate} = createMotorcycleTrialDto
    return await this.createMotorcycleTrialUsecase.execute(motorcycleId, driverId, startDate, endDate);
  }

  async delete(id: string): Promise<void | Error> {
    return await this.deleteMotorcycleTrialUsecase.execute(id);
  }

  async findById(id: string): Promise<MotorcycleTrialEntity | Error> {
    return await this.findMotorcycleTrialByIdUsecase.execute(id);
  }
   async getAllMotorcyclesTrial(): Promise<MotorcycleTrialEntity[] | Error> {
      return await this.getAllMotorcyclesTrialUsecase.execute();
    }
  
  async endTrial(id: string): Promise<void | Error> {
    return await this.endMotorcycleTrialUsecase.execute(id);
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
