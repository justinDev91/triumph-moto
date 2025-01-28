import { Injectable } from '@nestjs/common';
import { AddDrivingRecordUsecase } from '@application/usecases/driver/AddDrivingRecordUsecase';
import { CheckIncidentHistoryUsecase } from '@application/usecases/driver/CheckIncidentHistoryUsecase';
import { CreateDriverUsecase } from '@application/usecases/driver/CreateDriverUsecase';
import { UpdateDriverContactInfoUsecase } from '@application/usecases/driver/UpdateDriverContactInfoUsecase';
import { UpdateDriverExperienceUsecase } from '@application/usecases/driver/UpdateDriverExperienceUsecase';
import { GetCompanyDetailsUseCase } from '@application/usecases/driver/GetCompanyDetailsUseCase';
import { RemoveDriverFromCompanyUseCase } from '@application/usecases/driver/RemoveDriverFromCompanyUseCase';
import { AssignDriverToCompanyUseCase } from '@application/usecases/driver/AssignDriverToCompanyUseCase'; 
import { DrivingRecord } from '@domain/types/motorcycle';
import { CreateDriverDto } from './dto/CreateDriverDto';
import { DriverRepositoryImplem } from '@infrastructure/adapters/driver.repository.implem';
import { CompanyRepositoryImplem } from '@infrastructure/adapters/company.repository.implem'; 

@Injectable()
export class DriversService {
  private readonly addDrivingRecordUsecase: AddDrivingRecordUsecase;
  private readonly checkIncidentHistoryUsecase: CheckIncidentHistoryUsecase;
  private readonly createDriverUsecase: CreateDriverUsecase;
  private readonly updateDriverContactInfoUsecase: UpdateDriverContactInfoUsecase;
  private readonly updateDriverExperienceUsecase: UpdateDriverExperienceUsecase;
  private readonly getCompanyDetailsUseCase: GetCompanyDetailsUseCase;
  private readonly removeDriverFromCompanyUseCase: RemoveDriverFromCompanyUseCase;
  private readonly assignDriverToCompanyUseCase: AssignDriverToCompanyUseCase;

  constructor(
    private readonly driverRepository: DriverRepositoryImplem,
    private readonly companyRepository: CompanyRepositoryImplem,
  ) {
    this.addDrivingRecordUsecase = new AddDrivingRecordUsecase(driverRepository);
    this.checkIncidentHistoryUsecase = new CheckIncidentHistoryUsecase(driverRepository);
    this.createDriverUsecase = new CreateDriverUsecase(driverRepository);
    this.updateDriverContactInfoUsecase = new UpdateDriverContactInfoUsecase(driverRepository);
    this.updateDriverExperienceUsecase = new UpdateDriverExperienceUsecase(driverRepository);
    this.getCompanyDetailsUseCase = new GetCompanyDetailsUseCase(driverRepository);
    this.removeDriverFromCompanyUseCase = new RemoveDriverFromCompanyUseCase(driverRepository);
    this.assignDriverToCompanyUseCase = new AssignDriverToCompanyUseCase(driverRepository, companyRepository); // Initialize use case
  }

  async create(createDriverDto: CreateDriverDto): Promise<void | Error> {
    const {
      id,
      name,
      licenseType,
      license,
      yearsOfExperience,
      email,
      phone,
    } = createDriverDto;

    return await this.createDriverUsecase.execute(
      id,
      name,
      licenseType,
      license,
      yearsOfExperience,
      email,
      phone,
    );
  }

  async addDrivingRecord(driverId: string, record: DrivingRecord): Promise<void | Error> {
    return this.addDrivingRecordUsecase.execute(driverId, record);
  }

  async checkIncidentHistory(driverId: string): Promise<boolean | Error> {
    return this.checkIncidentHistoryUsecase.execute(driverId);
  }

  async updateContactInfo(driverId: string, email: string, phone: string): Promise<void | Error> {
    return this.updateDriverContactInfoUsecase.execute(driverId, email, phone);
  }

  async updateExperience(driverId: string, years: number): Promise<void | Error> {
    return this.updateDriverExperienceUsecase.execute(driverId, years);
  }

  async getCompanyDetails(driverId: string): Promise<object | Error> {
    return this.getCompanyDetailsUseCase.execute(driverId);
  }

  async removeDriverFromCompany(driverId: string): Promise<void | Error> {
    return this.removeDriverFromCompanyUseCase.execute(driverId);
  }

  async assignDriverToCompany(driverId: string, companyId: string): Promise<void | Error> {
    return this.assignDriverToCompanyUseCase.execute(driverId, companyId);
  }
}
