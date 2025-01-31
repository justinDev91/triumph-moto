import { ConcessionRepositoryInterface } from "@application/repositories/ConcessionRepositoryInterface";
import { CompanyRepositoryInterface } from "@application/repositories/CompanyRepositoryInterface";
import { UserRepositoryInterface } from "@application/repositories/UserRepositoryInterface";
import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class CreateConcessionUsecase {
  public constructor(
    private readonly concessionRepository: ConcessionRepositoryInterface,
    private readonly companyRepository: CompanyRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface
  ) {}

  public async execute(
    name: string,
    userId: string,
    companyId: string,
  ): Promise<void | Error> {
    try {
      const user = await this.userRepository.findOne(userId);
      if (user instanceof Error) return user 

      const company = await this.companyRepository.findById(companyId);
      if (company instanceof Error) return company
       
      const newConcession = ConcessionEntity.create(null, name, user, company, null, null);
      if (newConcession instanceof Error) return newConcession;
    
      await this.concessionRepository.save(newConcession);

    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
