import { RepairRepositoryImplem } from '@adapters/repair.repository.implem';
import { Injectable } from "@nestjs/common";
import { RepairEntity } from "@domain/entities/repair/RepairEntity";
import { CommonRepairAction } from "@domain/types/motorcycle";
import { AssociateRepairWithMotorcycleUseCase } from "@application/usecases/repair/AssociateRepairWithMotorcycleUseCase";
import { CheckHighCostRepairUseCase } from "@application/usecases/repair/CheckHighCostRepairUseCase";
import { CheckRepairWarrantyCoverageUseCase } from "@application/usecases/repair/CheckRepairWarrantyCoverageUseCase";
import { CreateRepairUsecase } from "@application/usecases/repair/CreateRepairUsecase";
import { DeleteRepairUsecase } from "@application/usecases/repair/DeleteRepairUsecase";
import { GetRepairByIdUsecase } from "@application/usecases/repair/GetRepairByIdUsecase";
import { GetRepairsByBreakdownIdUsecase } from "@application/usecases/repair/GetRepairsByBreakdownIdUsecase";
import { UpdateRepairActionsUseCase } from "@application/usecases/repair/UpdateRepairActionsUseCase";
import { UpdateRepairUsecase } from "@application/usecases/repair/UpdateRepairUsecase";
import { BreakdownRepositoryImplem } from '@adapters/breakdown.repository.implem';
import { CreateRepairDto } from './dto/create-repair.dto';
import { GetAllRepairsUsecase } from '@application/usecases/repair/GetAllRepairsUsecase';

@Injectable()
export class RepairService {
  private readonly associateRepairWithMotorcycleUseCase: AssociateRepairWithMotorcycleUseCase;
  private readonly checkHighCostRepairUseCase: CheckHighCostRepairUseCase;
  private readonly checkRepairWarrantyCoverageUseCase: CheckRepairWarrantyCoverageUseCase;
  private readonly createRepairUsecase: CreateRepairUsecase;
  private readonly deleteRepairUsecase: DeleteRepairUsecase;
  private readonly getRepairByIdUsecase: GetRepairByIdUsecase;
  private readonly getRepairsByBreakdownIdUsecase: GetRepairsByBreakdownIdUsecase;
  private readonly updateRepairActionsUseCase: UpdateRepairActionsUseCase;
  private readonly updateRepairUsecase: UpdateRepairUsecase;
  private readonly getAllRepairsUsecase: GetAllRepairsUsecase;

  constructor(
    private readonly repairRepository: RepairRepositoryImplem,
    private readonly breakdownRepository: BreakdownRepositoryImplem
  ) {
    this.associateRepairWithMotorcycleUseCase = new AssociateRepairWithMotorcycleUseCase(
      repairRepository,
      breakdownRepository
    );
    this.checkHighCostRepairUseCase = new CheckHighCostRepairUseCase(repairRepository);
    this.checkRepairWarrantyCoverageUseCase = new CheckRepairWarrantyCoverageUseCase(repairRepository);
    this.createRepairUsecase = new CreateRepairUsecase(repairRepository, breakdownRepository);
    this.deleteRepairUsecase = new DeleteRepairUsecase(repairRepository);
    this.getRepairByIdUsecase = new GetRepairByIdUsecase(repairRepository);
    this.getRepairsByBreakdownIdUsecase = new GetRepairsByBreakdownIdUsecase(repairRepository);
    this.updateRepairActionsUseCase = new UpdateRepairActionsUseCase(repairRepository);
    this.updateRepairUsecase = new UpdateRepairUsecase(repairRepository);
    this.getAllRepairsUsecase = new GetAllRepairsUsecase(repairRepository)
  }

  async createRepair(createRepairDto: CreateRepairDto): Promise<void | Error> {
    const {breakdownId, repairDate, actions, cost} = createRepairDto
    await this.createRepairUsecase.execute(breakdownId, repairDate, actions, cost);
  }

  async getAllRepairs(): Promise<RepairEntity[] | Error> {
    return await this.getAllRepairsUsecase.execute();
  } 

  async getRepairById(id: string): Promise<RepairEntity | Error> {
    return this.getRepairByIdUsecase.execute(id);
  }

  async getRepairsByBreakdownId(breakdownId: string): Promise<RepairEntity[] | Error> {
    return this.getRepairsByBreakdownIdUsecase.execute(breakdownId);
  }

  async deleteRepair(id: string): Promise<void | Error> {
    return this.deleteRepairUsecase.execute(id);
  }

  async associateRepairWithMotorcycle(repairId: string): Promise<void | Error> {
    return this.associateRepairWithMotorcycleUseCase.execute(repairId);
  }

  async checkHighCostRepair(repairId: string, threshold: number): Promise<boolean | Error> {
    return this.checkHighCostRepairUseCase.execute(repairId, threshold);
  }

  async checkRepairWarrantyCoverage(repairId: string): Promise<boolean | Error> {
    return this.checkRepairWarrantyCoverageUseCase.execute(repairId);
  }

  async updateRepairActions(repairId: string, newActions: CommonRepairAction[]): Promise<void | Error> {
    return this.updateRepairActionsUseCase.execute(repairId, newActions);
  }

  async updateRepair(repair: RepairEntity): Promise<RepairEntity | Error> {
    return this.updateRepairUsecase.execute(repair);
  }
}
