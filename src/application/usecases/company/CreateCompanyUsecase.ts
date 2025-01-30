import { CompanyRepositoryInterface } from "@application/repositories/CompanyRepositoryInterface";
import { UserRepositoryInterface } from "@application/repositories/UserRepositoryInterface"; 
import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class CreateCompanyUsecase {
  public constructor(
    private readonly companyRepository: CompanyRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface 
  ) {}

  public async execute(
    name: string,
    userId: string 
  ): Promise<void | Error> {
    try {

      const user = await this.userRepository.findOne(userId); 
      if (user instanceof Error) return user; 
      

      const company = CompanyEntity.create(null, name, user, new Date(), new Date());
      if (company instanceof Error) return company; 
      

      await this.companyRepository.save(company);
      
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
