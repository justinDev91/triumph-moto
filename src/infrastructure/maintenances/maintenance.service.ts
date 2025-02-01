import { Injectable } from '@nestjs/common';
import { CreateMaintenanceUsecase } from '@application/usecases/maintenance/CreateMaintenanceUsecase';
import { DeleteMaintenanceUsecase } from '@application/usecases/maintenance/DeleteMaintenanceUsecase';
import { FindMaintenanceByConcessionIdUsecase } from '@application/usecases/maintenance/FindMaintenanceByConcessionIdUsecase';
import { FindMaintenanceByMotorcycleIdUsecase } from '@application/usecases/maintenance/FindMaintenanceByMotorcycleIdUsecase';
import { GetAllMaintenanceRecordsUsecase } from '@application/usecases/maintenance/GetAllMaintenanceRecordsUsecase';
import { GetMaintenanceByIdUseCase } from '@application/usecases/maintenance/GetMaintenanceByIdUseCase';
import { MarkMaintenanceAsCompletedUsecase } from '@application/usecases/maintenance/MarkMaintenanceAsCompletedUsecase';
import { PredictNextMaintenanceDateUsecase } from '@application/usecases/maintenance/PredictNextMaintenanceDateUsecase';
import { ScheduleNextMaintenanceUsecase } from '@application/usecases/maintenance/ScheduleNextMaintenanceUsecase';
import { UpdateMaintenanceConcessionUsecase } from '@application/usecases/maintenance/UpdateMaintenanceConcessionUsecase';
import { UpdateMaintenanceDetailsUsecase } from '@application/usecases/maintenance/UpdateMaintenanceDetailsUsecase';
import { UpdateMaintenanceUseCase } from '@application/usecases/maintenance/UpdateMaintenanceUseCase';
import { CheckIfMaintenanceOverdueUsecase } from '@application/usecases/maintenance/CheckIfMaintenanceOverdueUsecase';
import { MaintenanceEntity } from '@domain/entities/maintenance/MaintenanceEntity';
import { MotorcycleEntity } from '@domain/entities/motorcycle/MotorcycleEntity';
import { MaintenanceType } from '@domain/types/MaintenanceType';
import { ConcessionEntity } from '@domain/entities/concession/ConcessionEntity';
import { MaintenanceRepositoryImpleme } from '@infrastructure/adapters/maintenance.repository.implem';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { MotorcycleRepositoryImplem } from '@infrastructure/adapters/motorcycle.repository.implem';
import { ConcessionRepositoryImplem } from '@infrastructure/adapters/concession.repository.implem';

@Injectable()
export class MaintenanceService {
  private readonly createMaintenanceUsecase: CreateMaintenanceUsecase;
  private readonly deleteMaintenanceUsecase: DeleteMaintenanceUsecase;
  private readonly findMaintenanceByConcessionIdUsecase: FindMaintenanceByConcessionIdUsecase;
  private readonly findMaintenanceByMotorcycleIdUsecase: FindMaintenanceByMotorcycleIdUsecase;
  private readonly getAllMaintenanceRecordsUsecase: GetAllMaintenanceRecordsUsecase;
  private readonly getMaintenanceByIdUseCase: GetMaintenanceByIdUseCase;
  private readonly markMaintenanceAsCompletedUsecase: MarkMaintenanceAsCompletedUsecase;
  private readonly predictNextMaintenanceDateUsecase: PredictNextMaintenanceDateUsecase;
  private readonly scheduleNextMaintenanceUsecase: ScheduleNextMaintenanceUsecase;
  private readonly updateMaintenanceConcessionUsecase: UpdateMaintenanceConcessionUsecase;
  private readonly updateMaintenanceDetailsUsecase: UpdateMaintenanceDetailsUsecase;
  private readonly updateMaintenanceUseCase: UpdateMaintenanceUseCase;
  private readonly checkIfMaintenanceOverdueUsecase: CheckIfMaintenanceOverdueUsecase;

  constructor(
    private readonly maintenanceRepository: MaintenanceRepositoryImpleme,
    private readonly motorcycleRepository: MotorcycleRepositoryImplem,
    private readonly concessionRepository: ConcessionRepositoryImplem
  ) {
    this.createMaintenanceUsecase = new CreateMaintenanceUsecase(maintenanceRepository, motorcycleRepository, concessionRepository);
    this.deleteMaintenanceUsecase = new DeleteMaintenanceUsecase(maintenanceRepository);
    this.findMaintenanceByConcessionIdUsecase = new FindMaintenanceByConcessionIdUsecase(maintenanceRepository);
    this.findMaintenanceByMotorcycleIdUsecase = new FindMaintenanceByMotorcycleIdUsecase(maintenanceRepository);
    this.getAllMaintenanceRecordsUsecase = new GetAllMaintenanceRecordsUsecase(maintenanceRepository);
    this.getMaintenanceByIdUseCase = new GetMaintenanceByIdUseCase(maintenanceRepository);
    this.markMaintenanceAsCompletedUsecase = new MarkMaintenanceAsCompletedUsecase(maintenanceRepository);
    this.predictNextMaintenanceDateUsecase = new PredictNextMaintenanceDateUsecase(maintenanceRepository);
    this.scheduleNextMaintenanceUsecase = new ScheduleNextMaintenanceUsecase(maintenanceRepository);
    this.updateMaintenanceConcessionUsecase = new UpdateMaintenanceConcessionUsecase(maintenanceRepository);
    this.updateMaintenanceDetailsUsecase = new UpdateMaintenanceDetailsUsecase(maintenanceRepository);
    this.updateMaintenanceUseCase = new UpdateMaintenanceUseCase(maintenanceRepository);
    this.checkIfMaintenanceOverdueUsecase = new CheckIfMaintenanceOverdueUsecase(maintenanceRepository);
  }

  public async createMaintenance(createMaintenanceDto : CreateMaintenanceDto): Promise<void | Error> {
    const {
      motorcycleId, 
      maintenanceType, 
      date,cost, 
      mileageAtService, 
      maintenanceIntervalMileage, 
      maintenanceIntervalTime, 
      concessionId 
    } = createMaintenanceDto
    await this.createMaintenanceUsecase.execute(
      motorcycleId,
      maintenanceType,
      date,
      cost,
      mileageAtService,
      maintenanceIntervalMileage,
      maintenanceIntervalTime,
      concessionId
    );
  }

  public async deleteMaintenance(id: string): Promise<void | Error> {
    return this.deleteMaintenanceUsecase.execute(id);
  }

  public async findMaintenanceByConcessionId(concessionId: string): Promise<MaintenanceEntity[] | Error> {
    return this.findMaintenanceByConcessionIdUsecase.execute(concessionId);
  }

  public async findMaintenanceByMotorcycleId(motorcycleId: string): Promise<MaintenanceEntity[] | Error> {
    return this.findMaintenanceByMotorcycleIdUsecase.execute(motorcycleId);
  }

  public async getAllMaintenanceRecords(): Promise<MaintenanceEntity[] | Error> {
    return this.getAllMaintenanceRecordsUsecase.execute();
  }

  public async getMaintenanceById(id: string): Promise<MaintenanceEntity | Error> {
    return this.getMaintenanceByIdUseCase.execute(id);
  }

  public async markMaintenanceAsCompleted(id: string): Promise<MaintenanceEntity | Error> {
    return this.markMaintenanceAsCompletedUsecase.execute(id);
  }

  public async predictNextMaintenanceDate(id: string): Promise<Date | Error> {
    return this.predictNextMaintenanceDateUsecase.execute(id);
  }

  public async scheduleNextMaintenance(id: string): Promise<void | Error> {
    return this.scheduleNextMaintenanceUsecase.execute(id);
  }

  public async updateMaintenanceConcession(
    maintenanceId: string,
    concession: ConcessionEntity
  ): Promise<MaintenanceEntity | Error> {
    return this.updateMaintenanceConcessionUsecase.execute(maintenanceId, concession);
  }

  public async updateMaintenanceDetails(
    id: string,
    maintenanceType: MaintenanceType,
    date: Date,
    cost: number
  ): Promise<MaintenanceEntity | Error> {
    return this.updateMaintenanceDetailsUsecase.execute(id, maintenanceType, date, cost);
  }

  public async updateMaintenance(
    id: string,
    maintenanceType: MaintenanceType,
    date: Date,
    cost: number
  ): Promise<void | Error> {
    return this.updateMaintenanceUseCase.execute(id, maintenanceType, date, cost);
  }

  public async checkIfMaintenanceOverdue(id: string): Promise<boolean | Error> {
    return this.checkIfMaintenanceOverdueUsecase.execute(id);
  }
}
