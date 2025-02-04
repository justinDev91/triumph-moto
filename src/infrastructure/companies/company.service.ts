import { Injectable } from '@nestjs/common';
import { CompanyEntity } from '@domain/entities/company/CompanyEntity';
import { AddConcessionToCompanyUseCase } from '@application/usecases/company/AddConcessionToCompanyUseCase';
import { AddDriverToCompanyUsecase } from '@application/usecases/company/AddDriverToCompanyUsecase';
import { AddMotorcycleToCompanyUsecase } from '@application/usecases/company/AddMotorcycleToCompanyUsecase';
import { CreateCompanyUsecase } from '@application/usecases/company/CreateCompanyUsecase';
import { GetCompanyDriversUsecase } from '@application/usecases/company/GetCompanyDriversUsecase';
import { RemoveConcessionFromCompanyUseCase } from '@application/usecases/company/RemoveConcessionFromCompanyUseCase';
import { RemoveDriverFromCompanyUsecase } from '@application/usecases/company/RemoveDriverFromCompanyUsecase';
import { RemoveMotorcycleFromCompanyUsecase } from '@application/usecases/company/RemoveMotorcycleFromCompanyUsecase';
import { UpdateCompanyNameUsecase } from '@application/usecases/company/UpdateCompanyNameUsecase';
import { CompanyRepositoryImplem } from '@infrastructure/adapters/company.repository.implem';
import { DriverEntity } from '@domain/entities/driver/DriverEntity';
import { MotorcycleEntity } from '@domain/entities/motorcycle/MotorcycleEntity';
import { GetAllCompaniesUsecase } from '@application/usecases/company/GetAllCompaniesUsecase';
import { CreateCompanyDto } from './dto/create-user-dto';
import { UserRepositoryImplem } from '@infrastructure/adapters/user.repository.implem';
import { GetCompanyByIdUsecase } from '@application/usecases/company/GetCompanyByIdUsecase';
import { ConcessionRepositoryImplem } from '@infrastructure/adapters/concession.repository.implem';
import { DriverRepositoryImplem } from '@infrastructure/adapters/driver.repository.implem';
import { MotorcycleRepositoryImplem } from '@infrastructure/adapters/motorcycle.repository.implem';

@Injectable()
export class CompanyService {
  public readonly addConcessionToCompanyUseCase: AddConcessionToCompanyUseCase;
  public readonly addDriverToCompanyUsecase: AddDriverToCompanyUsecase;
  public readonly addMotorcycleToCompanyUsecase: AddMotorcycleToCompanyUsecase;
  public readonly createCompanyUsecase: CreateCompanyUsecase;
  public readonly getCompanyDriversUsecase: GetCompanyDriversUsecase;
  public readonly removeConcessionFromCompanyUseCase: RemoveConcessionFromCompanyUseCase;
  public readonly removeDriverFromCompanyUsecase: RemoveDriverFromCompanyUsecase;
  public readonly removeMotorcycleFromCompanyUsecase: RemoveMotorcycleFromCompanyUsecase;
  public readonly updateCompanyNameUsecase: UpdateCompanyNameUsecase;
  private readonly getAllCompaniesUsecase: GetAllCompaniesUsecase
  private readonly getCompanyByIdUsecase: GetCompanyByIdUsecase

  constructor(
    private readonly companyRepository: CompanyRepositoryImplem,
    private readonly userRepository: UserRepositoryImplem,
    private readonly concessionRepository: ConcessionRepositoryImplem,
    private readonly driverRepository: DriverRepositoryImplem,
    private readonly motorcycleRepository: MotorcycleRepositoryImplem
  ) {
    this.addConcessionToCompanyUseCase = new AddConcessionToCompanyUseCase(companyRepository, concessionRepository);
    this.addDriverToCompanyUsecase = new AddDriverToCompanyUsecase(companyRepository, driverRepository);
    this.addMotorcycleToCompanyUsecase = new AddMotorcycleToCompanyUsecase(companyRepository, motorcycleRepository);
    this.createCompanyUsecase = new CreateCompanyUsecase(companyRepository, userRepository);
    this.getCompanyDriversUsecase = new GetCompanyDriversUsecase(companyRepository);
    this.removeConcessionFromCompanyUseCase = new RemoveConcessionFromCompanyUseCase(companyRepository);
    this.removeDriverFromCompanyUsecase = new RemoveDriverFromCompanyUsecase(companyRepository);
    this.removeMotorcycleFromCompanyUsecase = new RemoveMotorcycleFromCompanyUsecase(companyRepository);
    this.updateCompanyNameUsecase = new UpdateCompanyNameUsecase(companyRepository);
    this.getAllCompaniesUsecase =  new GetAllCompaniesUsecase(companyRepository);
    this.getCompanyByIdUsecase = new GetCompanyByIdUsecase(companyRepository)
  }

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<void | Error> {
    const { userId, name } = createCompanyDto;
    return await this.createCompanyUsecase.execute(name, userId);
  }

  public async getAllCompanies(): Promise<CompanyEntity[] | Error> {
    return await this.getAllCompaniesUsecase.execute();
  }

  public async getCompanyById(companyId: string): Promise<CompanyEntity | Error> {
    return await this.getCompanyByIdUsecase.execute(companyId);
  }

  async addConcessionToCompany(companyId: string, concessionId: string): Promise<void | Error> {
    return await this.addConcessionToCompanyUseCase.execute(companyId, concessionId);
  }

  async addDriverToCompany(companyId: string, driverId: string): Promise< void | Error> {
    return await this.addDriverToCompanyUsecase.execute(companyId, driverId);
  }

  async addMotorcycleToCompany(companyId: string, motorcycleId: string): Promise<void | Error> {
    return await this.addMotorcycleToCompanyUsecase.execute(companyId, motorcycleId);
  }

  getCompanyDrivers(companyId: string): DriverEntity[] | Error {
    return this.getCompanyDriversUsecase.execute(companyId) as unknown as DriverEntity[];
  }

  async removeConcessionFromCompany(companyId: string, concessionId: string): Promise<void | Error> {
    return await this.removeConcessionFromCompanyUseCase.execute(companyId, concessionId);
  }

  async removeDriverFromCompany(companyId: string, driverId: string): Promise<void | Error> {
    return await this.removeDriverFromCompanyUsecase.execute(companyId, driverId);
  }

  async removeMotorcycleFromCompany(companyId: string, motorcycleId: string): Promise<void | Error> {
    return await this.removeMotorcycleFromCompanyUsecase.execute(companyId, motorcycleId);
  }

  async updateCompanyName(companyId: string, newName: string): Promise<CompanyEntity | Error> {
    return await this.updateCompanyNameUsecase.execute(companyId, newName);
  }
}
