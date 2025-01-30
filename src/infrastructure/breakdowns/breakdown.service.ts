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

  constructor(
    private readonly breakdownRepository: BreakdownRepositoryImplem
  ) {
    this.addRepairToBreakdownUsecase = new AddRepairToBreakdownUsecase(breakdownRepository);
    this.checkWarrantyCoverageUsecase = new CheckWarrantyCoverageUsecase(breakdownRepository);
    this.createBreakdownUsecase = new CreateBreakdownUsecase(breakdownRepository);
    this.findBreakdownByIdUsecase = new FindBreakdownByIdUsecase(breakdownRepository);
    this.getBreakdownsByMotorcycleIdUsecase = new GetBreakdownsByMotorcycleIdUsecase(breakdownRepository);
    this.getBreakdownRepairHistoryUsecase = new GetBreakdownRepairHistoryUsecase(breakdownRepository);
    this.removeRepairFromBreakdownUsecase = new RemoveRepairFromBreakdownUsecase(breakdownRepository);
    this.reportBreakdownUsecase = new ReportBreakdownUsecase(breakdownRepository);
    this.updateBreakdownDescriptionUsecase = new UpdateBreakdownDescriptionUsecase(breakdownRepository);
  }

  public async addRepairToBreakdown(breakdownId: string, repair: RepairEntity): Promise<void | Error> {
    return await this.addRepairToBreakdownUsecase.execute(breakdownId, repair);
  }

  public async checkWarrantyCoverage(breakdownId: string, checkDate: Date): Promise<boolean | Error> {
    return await this.checkWarrantyCoverageUsecase.execute(breakdownId, checkDate);
  }

  public async createBreakdown(id: string, motorcycle: MotorcycleEntity, description: string, reportedDate: Date, warranty: WarrantyEntity | null): Promise<BreakdownEntity | Error> {
    return await this.createBreakdownUsecase.execute(id, motorcycle, description, reportedDate, warranty);
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
