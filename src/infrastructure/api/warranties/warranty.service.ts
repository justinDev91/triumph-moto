import { Injectable } from '@nestjs/common';
import { WarrantyRepositoryImplem } from '@adapters/warranty.repository.implem';
import { CreateWarrantyUsecase } from '@application/usecases/warranty/CreateWarrantyUsecase';
import { DeleteWarrantyUsecase } from '@application/usecases/warranty/DeleteWarrantyUsecase';
import { GetWarrantyByIdUsecase } from '@application/usecases/warranty/GetWarrantyByIdUsecase';
import { GetWarrantyByMotorcycleIdUsecase } from '@application/usecases/warranty/GetWarrantyByMotorcycleIdUsecase';
import { GetWarrantyDetailsUsecase } from '@application/usecases/warranty/GetWarrantyDetailsUsecase';
import { UpdateWarrantyUsecase } from '@application/usecases/warranty/UpdateWarrantyUsecase';
import { WarrantyEntity } from '@domain/entities/warranty/WarrantyEntity';
import { CreateWarrantyDto } from './dto/create.warranty.dto';
import { UpdateWarrantyDto } from './dto/update.warranty.dto';
import { GetAllWarrantiesUseCase } from '@application/usecases/warranty/GetAllWarrantiesUseCase';
import { MotorcycleRepositoryImplem } from '@adapters/motorcycle.repository.implem';

@Injectable()
export class WarrantyService {
  private readonly createWarrantyUsecase: CreateWarrantyUsecase;
  private readonly deleteWarrantyUsecase: DeleteWarrantyUsecase;
  private readonly getWarrantyByIdUsecase: GetWarrantyByIdUsecase;
  private readonly getWarrantyByMotorcycleIdUsecase: GetWarrantyByMotorcycleIdUsecase;
  private readonly getWarrantyDetailsUsecase: GetWarrantyDetailsUsecase;
  private readonly updateWarrantyUsecase: UpdateWarrantyUsecase;
  private readonly getAllWarrantiesUseCase: GetAllWarrantiesUseCase;

  constructor(
    private readonly warrantyRepository: WarrantyRepositoryImplem,
    private readonly motorcycleRepository: MotorcycleRepositoryImplem,

  ) {
    this.createWarrantyUsecase = new CreateWarrantyUsecase(warrantyRepository, motorcycleRepository);
    this.deleteWarrantyUsecase = new DeleteWarrantyUsecase(warrantyRepository);
    this.getWarrantyByIdUsecase = new GetWarrantyByIdUsecase(warrantyRepository);
    this.getWarrantyByMotorcycleIdUsecase = new GetWarrantyByMotorcycleIdUsecase(warrantyRepository);
    this.getWarrantyDetailsUsecase = new GetWarrantyDetailsUsecase(warrantyRepository);
    this.updateWarrantyUsecase = new UpdateWarrantyUsecase(warrantyRepository);
    this.getAllWarrantiesUseCase = new GetAllWarrantiesUseCase(warrantyRepository);
  }

  async create(createWarrantyDto : CreateWarrantyDto): Promise<WarrantyEntity | Error> {
    const {motorcycleId, startDate, endDate, coverageDetails, isActive} = createWarrantyDto;
    return await this.createWarrantyUsecase.execute(motorcycleId, startDate, endDate, coverageDetails, isActive);
  }

  async delete(id: string): Promise<void | Error> {
    return await this.deleteWarrantyUsecase.execute(id);
  }

  async findAll(): Promise<WarrantyEntity[] | Error> {
      return this.getAllWarrantiesUseCase.execute();
  }

  async getById(id: string): Promise<WarrantyEntity | Error> {
    return await this.getWarrantyByIdUsecase.execute(id);
  }

  async getByMotorcycleId(motorcycleId: string): Promise<WarrantyEntity | Error> {
    return await this.getWarrantyByMotorcycleIdUsecase.execute(motorcycleId);
  }

  async getDetails(id: string): Promise<object | Error> {
    return await this.getWarrantyDetailsUsecase.execute(id);
  }

  async update(id :string, updateWarrantyDto: UpdateWarrantyDto): Promise<void | Error> {
    const {coverageDetails, isActive} = updateWarrantyDto;
    await this.updateWarrantyUsecase.execute(id, coverageDetails, isActive);
  }
}
