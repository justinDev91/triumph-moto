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
import { ConcessionRepositoryImplem } from '@infrastructure/adapters/concession.repository.implem';
import { CompanyRepositoryImplem } from '@infrastructure/adapters/company.repository.implem';
import { GetAllConcessionsUsecase } from '@application/usecases/concession/getAllConcessionsUsecase';
import { CreateConcessionDto } from './dto/create-concession.dto';
import { UserRepositoryImplem } from '@infrastructure/adapters/user.repository.implem';

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
  private readonly getAllConcessionsUsecase: GetAllConcessionsUsecase;


  constructor(
    private readonly concessionRepository: ConcessionRepositoryImplem,
    private readonly companyRepository: CompanyRepositoryImplem,
        private readonly userRepository: UserRepositoryImplem
  ) {
    this.addMotorcycleToConcessionUsecase = new AddMotorcycleToConcessionUsecase(concessionRepository);
    this.assignConcessionToCompanyUseCase = new AssignConcessionToCompanyUseCase(concessionRepository, companyRepository);
    this.createConcessionUsecase = new CreateConcessionUsecase(concessionRepository, companyRepository,userRepository );
    this.deleteConcessionUsecase = new DeleteConcessionUsecase(concessionRepository);
    this.removeMotorcycleFromConcessionUsecase = new RemoveMotorcycleFromConcessionUsecase(concessionRepository);
    this.updateConcessionUsecase = new UpdateConcessionUsecase(concessionRepository);
    this.updateConcessionNameUsecase = new UpdateConcessionNameUsecase(concessionRepository);
    this.getAllConcessionsUsecase = new GetAllConcessionsUsecase(concessionRepository)
    this.getConcessionDetailsUseCase = new GetConcessionDetailsUseCase(concessionRepository)
  }

  public async getAllConcessions(): Promise<ConcessionEntity[] | Error> {
    return await this.getAllConcessionsUsecase.execute();
  }

  public async addMotorcycleToConcession(concessionId: string, motorcycle: MotorcycleEntity): Promise<ConcessionEntity | Error> {
    return this.addMotorcycleToConcessionUsecase.execute(concessionId, motorcycle);
  }

  public async assignConcessionToCompany(concessionId: string, companyId: string): Promise<void | Error> {
    return this.assignConcessionToCompanyUseCase.execute(concessionId, companyId);
  }

  public async createConcession(createConcessionDto : CreateConcessionDto): Promise<void | Error> {
    const {name, userId, companyId} = createConcessionDto
    await this.createConcessionUsecase.execute(name, userId, companyId);
  }

  public async deleteConcession(id: string): Promise<void | Error> {
    return this.deleteConcessionUsecase.execute(id);
  }

  public getConcessionDetails(id: string): Promise<ConcessionEntity | Error> {
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
