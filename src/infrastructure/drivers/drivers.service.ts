import { GetDriverByIdUseCase } from './../../application/usecases/driver/GetDriverByIdUseCase';
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
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverRepositoryImplem } from '@infrastructure/adapters/driver.repository.implem';
import { CompanyRepositoryImplem } from '@infrastructure/adapters/company.repository.implem'; 
import { DriverEntity } from '@domain/entities/driver/DriverEntity';
import { GetAllDriversUsecase } from '@application/usecases/driver/GetAllDriversUsecase';
import { DeleteDriverUseCase } from '@application/usecases/driver/DeleteDriverUseCase';

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
  private readonly getAllDriversUsecase: GetAllDriversUsecase;
  private readonly deleteDriverUseCase: DeleteDriverUseCase;
  private readonly getDriverByIdUseCase: GetDriverByIdUseCase;

  constructor(
    private readonly driverRepository: DriverRepositoryImplem,
    private readonly companyRepository: CompanyRepositoryImplem,
  ) {
    this.addDrivingRecordUsecase = new AddDrivingRecordUsecase(driverRepository);
    this.getAllDriversUsecase = new GetAllDriversUsecase(driverRepository);
    this.deleteDriverUseCase = new DeleteDriverUseCase(driverRepository);
    this.getDriverByIdUseCase = new GetDriverByIdUseCase(driverRepository);
    this.checkIncidentHistoryUsecase = new CheckIncidentHistoryUsecase(driverRepository);
    this.createDriverUsecase = new CreateDriverUsecase(driverRepository);
    this.updateDriverContactInfoUsecase = new UpdateDriverContactInfoUsecase(driverRepository);
    this.updateDriverExperienceUsecase = new UpdateDriverExperienceUsecase(driverRepository);
    this.getCompanyDetailsUseCase = new GetCompanyDetailsUseCase(driverRepository);
    this.removeDriverFromCompanyUseCase = new RemoveDriverFromCompanyUseCase(driverRepository);
    this.assignDriverToCompanyUseCase = new AssignDriverToCompanyUseCase(driverRepository, companyRepository); // Initialize use case
  }

  async create(createDriverDto: CreateDriverDto): Promise<DriverEntity | Error> {
    const {
      name,
      licenseType,
      license,
      yearsOfExperience,
      email,
      phone,
    } = createDriverDto;

    return await this.createDriverUsecase.execute(
      name,
      licenseType,
      license,
      yearsOfExperience,
      email,
      phone,
    );
  }

  async findAll(): Promise<DriverEntity[] | Error> {
      return this.getAllDriversUsecase.execute();
  }

  async findOne(id: string): Promise<DriverEntity | Error> {
    return this.getDriverByIdUseCase.execute(id);
  }
  
  async remove(id: string): Promise<void> {
    return this.deleteDriverUseCase.execute(id);
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

  async updateExperience(driverId: string, years: number): Promise<DriverEntity | Error> {
    return await this.updateDriverExperienceUsecase.execute(driverId, years);
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
