import { Injectable } from "@nestjs/common";
import { CreateSparePartUsecase } from "@application/usecases/sparePart/CreateSparePartUsecase";
import { GetSparePartByIdUsecase } from "@application/usecases/sparePart/GetSparePartByIdUsecase";
import { ReserveSparePartUsecase } from "@application/usecases/sparePart/ReserveSparePartUsecase";
import { RestockSparePartUsecase } from "@application/usecases/sparePart/RestockSparePartUsecase";
import { UseSparePartUsecase } from "@application/usecases/sparePart/UseSparePartUsecase";
import { SparePartEntity } from "@domain/entities/order/SparePartEntity";
import { SparePartRepositoryImplem } from "@infrastructure/adapters/spare.part.repository.implem";

@Injectable()
export class SparePartService {
  private readonly createSparePartUsecase: CreateSparePartUsecase;
  private readonly getSparePartByIdUsecase: GetSparePartByIdUsecase;
  private readonly reserveSparePartUsecase: ReserveSparePartUsecase;
  private readonly restockSparePartUsecase: RestockSparePartUsecase;
  private readonly useSparePartUsecase: UseSparePartUsecase;

  constructor(private readonly sparePartRepository: SparePartRepositoryImplem) {
    this.createSparePartUsecase = new CreateSparePartUsecase(sparePartRepository);
    this.getSparePartByIdUsecase = new GetSparePartByIdUsecase(sparePartRepository);
    this.reserveSparePartUsecase = new ReserveSparePartUsecase(sparePartRepository);
    this.restockSparePartUsecase = new RestockSparePartUsecase(sparePartRepository);
    this.useSparePartUsecase = new UseSparePartUsecase(sparePartRepository);
  }

  async createSparePart(
    name: string,
    quantityInStock: number,
    criticalLevel: number,
    cost: number
  ): Promise<void | Error> {
    return this.createSparePartUsecase.execute(name, quantityInStock, criticalLevel, cost);
  }

  async getSparePartById(id: string): Promise<SparePartEntity | Error> {
    return this.getSparePartByIdUsecase.execute(id);
  }

  async reserveSparePart(id: string, quantity: number): Promise<boolean | Error> {
    return this.reserveSparePartUsecase.execute(id, quantity);
  }

  async restockSparePart(id: string, quantity: number): Promise<void | Error> {
    return this.restockSparePartUsecase.execute(id, quantity);
  }

  async useSparePart(id: string, quantity: number): Promise<boolean | Error> {
    return this.useSparePartUsecase.execute(id, quantity);
  }
}
