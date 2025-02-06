import { Injectable } from '@nestjs/common';
import { CreateMotorcycleUsecase } from '@application/usecases/motorcycle/CreateMotorcycleUsecase';
import { UpdateMileageUsecase } from '@application/usecases/motorcycle/UpdateMileageUsecase';
import { UpdateMotorcycleStatusUsecase } from '@application/usecases/motorcycle/UpdateMotorcycleStatusUsecase';
import { UpdateServiceDetailsUsecase } from '@application/usecases/motorcycle/UpdateServiceDetailsUsecase';
import { GetMotorcycleCompanyDetailsUsecase } from '@application/usecases/motorcycle/GetMotorcycleCompanyDetailsUsecase';
import { GetMotorcycleConcessionDetailsUsecase } from '@application/usecases/motorcycle/GetMotorcycleConcessionDetailsUsecase';
import { AssignMotorcycleToCompanyUsecase } from '@application/usecases/motorcycle/AssignMotorcycleToCompanyUsecase';
import { RemoveMotorcycleFromCompanyUsecase } from '@application/usecases/motorcycle/RemoveMotorcycleFromCompanyUsecase';
import { RemoveMotorcycleFromConcessionUsecase } from '@application/usecases/motorcycle/RemoveMotorcycleFromConcessionUsecase';
import { CheckServiceStatusUsecase } from '@application/usecases/motorcycle/CheckServiceStatusUsecase';
import { MotorStatus } from '@domain/types/motorcycle';
import { MotorcycleRepositoryImplem } from '@adapters/motorcycle.repository.implem';
import { CompanyRepositoryImplem } from '@adapters/company.repository.implem';
import { CreateMotorcycleDto } from './dto/create-motorcycle.dto';
import { AssignMotorcycleToConcessionUsecase } from '@application/usecases/motorcycle/AssignMotorcycleToConcessionUsecase';
import { ConcessionRepositoryImplem } from '@adapters/concession.repository.implem';
import { MotorcycleEntity } from '@domain/entities/motorcycle/MotorcycleEntity';
import { GetAllMotorcyclesUsecase } from '@application/usecases/motorcycle/GetAllMotorcyclesUsecase';
import { MotorStatusEnum } from '@api/types/MotorStatusEnum';

@Injectable()
export class MotorcycleService {
  private readonly createMotorcycleUsecase: CreateMotorcycleUsecase;
  private readonly updateMileageUsecase: UpdateMileageUsecase;
  private readonly updateMotorcycleStatusUsecase: UpdateMotorcycleStatusUsecase;
  private readonly updateServiceDetailsUsecase: UpdateServiceDetailsUsecase;
  private readonly getMotorcycleCompanyDetailsUsecase: GetMotorcycleCompanyDetailsUsecase;
  private readonly getMotorcycleConcessionDetailsUsecase: GetMotorcycleConcessionDetailsUsecase;
  private readonly assignMotorcycleToCompanyUsecase: AssignMotorcycleToCompanyUsecase;
  private readonly assignMotorcycleToConcessionUsecase: AssignMotorcycleToConcessionUsecase;
  private readonly removeMotorcycleFromCompanyUsecase: RemoveMotorcycleFromCompanyUsecase;
  private readonly removeMotorcycleFromConcessionUsecase: RemoveMotorcycleFromConcessionUsecase;
  private readonly checkServiceStatusUsecase: CheckServiceStatusUsecase;
  private readonly getAllMotorcyclesUsecase : GetAllMotorcyclesUsecase;

  constructor(
    private readonly motorcycleRepository: MotorcycleRepositoryImplem,
    private readonly companyRepository: CompanyRepositoryImplem,
    private readonly concessionRepository: ConcessionRepositoryImplem,
  ) {
    this.createMotorcycleUsecase = new CreateMotorcycleUsecase(motorcycleRepository);
    this.updateMileageUsecase = new UpdateMileageUsecase(motorcycleRepository);
    this.updateMotorcycleStatusUsecase = new UpdateMotorcycleStatusUsecase(motorcycleRepository);
    this.updateServiceDetailsUsecase = new UpdateServiceDetailsUsecase(motorcycleRepository);
    this.getMotorcycleCompanyDetailsUsecase = new GetMotorcycleCompanyDetailsUsecase(motorcycleRepository, companyRepository);
    this.getMotorcycleConcessionDetailsUsecase = new GetMotorcycleConcessionDetailsUsecase(motorcycleRepository);
    this.assignMotorcycleToCompanyUsecase = new AssignMotorcycleToCompanyUsecase(motorcycleRepository, companyRepository);
    this.removeMotorcycleFromCompanyUsecase = new RemoveMotorcycleFromCompanyUsecase(motorcycleRepository);
    this.removeMotorcycleFromConcessionUsecase = new RemoveMotorcycleFromConcessionUsecase(motorcycleRepository);
    this.checkServiceStatusUsecase = new CheckServiceStatusUsecase(motorcycleRepository);
    this.assignMotorcycleToConcessionUsecase = new AssignMotorcycleToConcessionUsecase(motorcycleRepository, concessionRepository);
    this.getAllMotorcyclesUsecase = new GetAllMotorcyclesUsecase(motorcycleRepository)
  }

  async create(createMotorcycleDto: CreateMotorcycleDto): Promise<void | Error> {
    const {
      brand,
      model,
      year,
      mileage,
      status,
      purchaseDate,
      lastServiceDate,
      nextServiceMileage,
      company
    } = createMotorcycleDto;

    return await this.createMotorcycleUsecase.execute(
      brand,
      model,
      year,
      mileage,
      status,
      purchaseDate,
      lastServiceDate,
      nextServiceMileage,
      company
    );
  }

  async getAllMotorcycles(): Promise<MotorcycleEntity[] | Error> {
    return await this.getAllMotorcyclesUsecase.execute();
  }

  async getMotorcycleById(id: string): Promise<MotorcycleEntity | Error> {
    return await this.motorcycleRepository.findById(id);
  }

  async deleteMotorcycle(id: string): Promise<void | Error> {
    return await this.motorcycleRepository.delete(id);
  }

  async updateMileage(id: string, newMileage: number): Promise<void | Error> {
    return await this.updateMileageUsecase.execute(id, newMileage);
  }

  async updateMotorcycleStatus(id: string, newStatus: MotorStatusEnum): Promise<void | Error> {
    return await this.updateMotorcycleStatusUsecase.execute(id, newStatus);
  }

  async updateServiceDetails(
    id: string,
    newServiceMileage: number,
    serviceDate: Date,
  ): Promise<void | Error> {
    return await this.updateServiceDetailsUsecase.execute(id, newServiceMileage, serviceDate);
  }

  async getMotorcycleCompanyDetails(motorcycleId: string): Promise<object | null | Error> {
    return await this.getMotorcycleCompanyDetailsUsecase.execute(motorcycleId);
  }

  async getMotorcycleConcessionDetails(motorcycleId: string): Promise<object | null | Error> {
    return await this.getMotorcycleConcessionDetailsUsecase.execute(motorcycleId);
  }

  async assignMotorcycleToCompany(
    motorcycleId: string,
    companyId: string,
  ): Promise<void | Error> {
    return await this.assignMotorcycleToCompanyUsecase.execute(motorcycleId, companyId);
  }

  async assignMotorcycleToConcession(
    motorcycleId: string,
    concessionId: string,
  ): Promise<void | Error> {
    return await this.assignMotorcycleToConcessionUsecase.execute(motorcycleId, concessionId);
  }

  async removeMotorcycleFromCompany(motorcycleId: string): Promise<void | Error> {
    return await this.removeMotorcycleFromCompanyUsecase.execute(motorcycleId);
  }

  async removeMotorcycleFromConcession(motorcycleId: string): Promise<void | Error> {
    return await this.removeMotorcycleFromConcessionUsecase.execute(motorcycleId);
  }

  async checkServiceStatus(motorcycleId: string): Promise<boolean | Error> {
    return await this.checkServiceStatusUsecase.execute(motorcycleId);
  }
  

}
