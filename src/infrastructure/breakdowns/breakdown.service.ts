import { Injectable } from '@nestjs/common';
import { AddRepairToBreakdownUsecase } from '@application/usecases/breakdown/AddRepairToBreakdownUsecase';
import { CheckWarrantyCoverageUsecase } from '@application/usecases/breakdown/CheckWarrantyCoverageUsecase';
import { CreateBreakdownUsecase } from '@application/usecases/breakdown/CreateBreakdownUsecase';
import { FindBreakdownByIdUsecase } from '@application/usecases/breakdown/FindBreakdownByIdUsecase';
import { GetBreakdownRepairHistoryUsecase } from '@application/usecases/breakdown/GetBreakdownRepairHistoryUsecase';
import { RemoveRepairFromBreakdownUsecase } from '@application/usecases/breakdown/RemoveRepairFromBreakdownUsecase';
import { ReportBreakdownUsecase } from '@application/usecases/breakdown/ReportBreakdownUsecase';
import { UpdateBreakdownDescriptionUsecase } from '@application/usecases/breakdown/UpdateBreakdownDescriptionUsecase';
import { GetBreakdownsByMotorcycleIdUsecase } from '@application/usecases/breakdown/GetBreakdownByIdUsecase';
import { BreakdownRepositoryImplem } from '@infrastructure/adapters/breakdown.repository.implem';
import { RepairEntity } from '@domain/entities/repair/RepairEntity';
import { MotorcycleEntity } from '@domain/entities/motorcycle/MotorcycleEntity';
import { BreakdownEntity } from '@domain/entities/breakdown/BreakdownEntity';
import { WarrantyEntity } from '@domain/entities/warranty/WarrantyEntity';
import { CreateBreakDownDto } from './dto/create-breakdown.dto';
import { MotorcycleRepositoryImplem } from '@infrastructure/adapters/motorcycle.repository.implem';
import { WarrantyRepositoryImplem } from '@infrastructure/adapters/warranty.repository.implem';
import { GetAllWarrantiesUseCase } from '@application/usecases/warranty/GetAllWarrantiesUseCase';
import { GetAllBreakdownsTrialUsecase } from '@application/usecases/breakdown/GetAllBreakdownsUsecase';

@Injectable()
export class BreakdownService {
  private readonly addRepairToBreakdownUsecase: AddRepairToBreakdownUsecase;
  private readonly checkWarrantyCoverageUsecase: CheckWarrantyCoverageUsecase;
  private readonly createBreakdownUsecase: CreateBreakdownUsecase;
  private readonly findBreakdownByIdUsecase: FindBreakdownByIdUsecase;
  private readonly getBreakdownsByMotorcycleIdUsecase: GetBreakdownsByMotorcycleIdUsecase;
  private readonly getBreakdownRepairHistoryUsecase: GetBreakdownRepairHistoryUsecase;
  private readonly removeRepairFromBreakdownUsecase: RemoveRepairFromBreakdownUsecase;
  private readonly reportBreakdownUsecase: ReportBreakdownUsecase;
  private readonly updateBreakdownDescriptionUsecase: UpdateBreakdownDescriptionUsecase;
  private readonly getAllBreakdownsTrialUsecase : GetAllBreakdownsTrialUsecase;

  constructor(
    private readonly breakdownRepository: BreakdownRepositoryImplem,
    private readonly motorcycleRepository: MotorcycleRepositoryImplem,
    private readonly warrantyRepository: WarrantyRepositoryImplem
  ) {
    this.addRepairToBreakdownUsecase = new AddRepairToBreakdownUsecase(breakdownRepository);
    this.checkWarrantyCoverageUsecase = new CheckWarrantyCoverageUsecase(breakdownRepository);
    this.createBreakdownUsecase = new CreateBreakdownUsecase(breakdownRepository, motorcycleRepository, warrantyRepository);
    this.findBreakdownByIdUsecase = new FindBreakdownByIdUsecase(breakdownRepository);
    this.getBreakdownsByMotorcycleIdUsecase = new GetBreakdownsByMotorcycleIdUsecase(breakdownRepository);
    this.getBreakdownRepairHistoryUsecase = new GetBreakdownRepairHistoryUsecase(breakdownRepository);
    this.removeRepairFromBreakdownUsecase = new RemoveRepairFromBreakdownUsecase(breakdownRepository);
    this.reportBreakdownUsecase = new ReportBreakdownUsecase(breakdownRepository);
    this.updateBreakdownDescriptionUsecase = new UpdateBreakdownDescriptionUsecase(breakdownRepository);
    this.getAllBreakdownsTrialUsecase = new GetAllBreakdownsTrialUsecase(breakdownRepository)
  }

  async getAllWarranties(): Promise<BreakdownEntity[] | Error> {
        return await this.getAllBreakdownsTrialUsecase.execute();
  }

  public async addRepairToBreakdown(breakdownId: string, repair: RepairEntity): Promise<void | Error> {
    return await this.addRepairToBreakdownUsecase.execute(breakdownId, repair);
  }

  public async checkWarrantyCoverage(breakdownId: string): Promise<boolean | Error> {
    return await this.checkWarrantyCoverageUsecase.execute(breakdownId);
  }

  public async createBreakdown(createBreakDownDto: CreateBreakDownDto): Promise<void | Error> {
    const {motorcycleId, description, warrantyId} = createBreakDownDto
    return await this.createBreakdownUsecase.execute(motorcycleId, description, warrantyId);
  }

  public async findBreakdownById(breakdownId: string): Promise<BreakdownEntity | Error> {
    return await this.findBreakdownByIdUsecase.execute(breakdownId);
  }

  public async getBreakdownsByMotorcycleId(motorcycleId: string): Promise<BreakdownEntity[] | Error> {
    return await this.getBreakdownsByMotorcycleIdUsecase.execute(motorcycleId);
  }

  public async getBreakdownRepairHistory(breakdownId: string): Promise<RepairEntity[] | Error> {
    return await this.getBreakdownRepairHistoryUsecase.execute(breakdownId);
  }

  public async removeRepairFromBreakdown(breakdownId: string, repairId: string): Promise<void | Error> {
    return await this.removeRepairFromBreakdownUsecase.execute(breakdownId, repairId);
  }

  public async reportBreakdown(motorcycle: MotorcycleEntity, descriptionValue: string, reportedDateValue: Date, warranty: WarrantyEntity | null): Promise<void | Error> {
    return await this.reportBreakdownUsecase.execute(motorcycle, descriptionValue, reportedDateValue, warranty);
  }

  public async updateBreakdownDescription(breakdownId: string, newDescription: string): Promise<void | Error> {
    return await this.updateBreakdownDescriptionUsecase.execute(breakdownId, newDescription);
  }
}
