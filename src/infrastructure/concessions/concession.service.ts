import { Injectable } from '@nestjs/common';
import { ConcessionEntity } from '@domain/entities/concession/ConcessionEntity';
import { AddMotorcycleToConcessionUsecase } from '@application/usecases/concession/AddMotorcycleToConcessionUsecase';
import { AssignConcessionToCompanyUseCase } from '@application/usecases/concession/AssignConcessionToCompanyUseCase';
import { CreateConcessionUsecase } from '@application/usecases/concession/CreateConcessionUsecase';
import { DeleteConcessionUsecase } from '@application/usecases/concession/DeleteConcessionUsecase';
import { RemoveMotorcycleFromConcessionUsecase } from '@application/usecases/concession/RemoveMotorcycleFromConcessionUsecase';
import { UpdateConcessionUsecase } from '@application/usecases/concession/UpdateConcessionUsecase';
import { UpdateConcessionNameUsecase } from '@application/usecases/concession/UpdateConcessionNameUsecase';
import { GetConcessionDetailsUseCase } from '@application/usecases/concession/GetConcessionDetailsUsecase';
import { MotorcycleEntity } from '@domain/entities/motorcycle/MotorcycleEntity';
import { UserEntity } from '@domain/entities/user/UserEntity';
import { CompanyEntity } from '@domain/entities/company/CompanyEntity';
import { ConcessionRepositoryImplem } from '@infrastructure/adapters/concession.repository.implem';
import { CompanyRepositoryImplem } from '@infrastructure/adapters/company.repository.implem';

@Injectable()
export class ConcessionService {
  private readonly addMotorcycleToConcessionUsecase: AddMotorcycleToConcessionUsecase;
  private readonly assignConcessionToCompanyUseCase: AssignConcessionToCompanyUseCase;
  private readonly createConcessionUsecase: CreateConcessionUsecase;
  private readonly deleteConcessionUsecase: DeleteConcessionUsecase;
  private readonly getConcessionDetailsUseCase: GetConcessionDetailsUseCase;
  private readonly removeMotorcycleFromConcessionUsecase: RemoveMotorcycleFromConcessionUsecase;
  private readonly updateConcessionUsecase: UpdateConcessionUsecase;
  private readonly updateConcessionNameUsecase: UpdateConcessionNameUsecase;

  constructor(
    private readonly concessionRepository: ConcessionRepositoryImplem,
    private readonly companyRepository: CompanyRepositoryImplem
  ) {
    this.addMotorcycleToConcessionUsecase = new AddMotorcycleToConcessionUsecase(concessionRepository);
    this.assignConcessionToCompanyUseCase = new AssignConcessionToCompanyUseCase(concessionRepository, companyRepository);
    this.createConcessionUsecase = new CreateConcessionUsecase(concessionRepository);
    this.deleteConcessionUsecase = new DeleteConcessionUsecase(concessionRepository);
    this.removeMotorcycleFromConcessionUsecase = new RemoveMotorcycleFromConcessionUsecase(concessionRepository);
    this.updateConcessionUsecase = new UpdateConcessionUsecase(concessionRepository);
    this.updateConcessionNameUsecase = new UpdateConcessionNameUsecase(concessionRepository);
  }

  public async addMotorcycleToConcession(concessionId: string, motorcycle: MotorcycleEntity): Promise<ConcessionEntity | Error> {
    return this.addMotorcycleToConcessionUsecase.execute(concessionId, motorcycle);
  }

  public async assignConcessionToCompany(concessionId: string, companyId: string): Promise<void | Error> {
    return this.assignConcessionToCompanyUseCase.execute(concessionId, companyId);
  }

  public async createConcession(id: string, name: string, user: UserEntity, company: CompanyEntity, createdAt: Date, updatedAt: Date): Promise<ConcessionEntity | Error> {
    return this.createConcessionUsecase.execute(id, name, user, company, createdAt, updatedAt);
  }

  public async deleteConcession(id: string): Promise<void | Error> {
    return this.deleteConcessionUsecase.execute(id);
  }

  public getConcessionDetails(id: string) {
    return this.getConcessionDetailsUseCase.execute(id);
  }

  public async removeMotorcycleFromConcession(concessionId: string, motorcycleId: string): Promise<ConcessionEntity | Error> {
    return this.removeMotorcycleFromConcessionUsecase.execute(concessionId, motorcycleId);
  }

  public async updateConcession(id: string, newName: string): Promise<ConcessionEntity | Error> {
    return this.updateConcessionUsecase.execute(id, newName);
  }

  public async updateConcessionName(concessionId: string, newNameValue: string): Promise<ConcessionEntity | Error> {
    return this.updateConcessionNameUsecase.execute(concessionId, newNameValue);
  }
}
