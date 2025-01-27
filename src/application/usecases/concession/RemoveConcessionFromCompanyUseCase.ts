import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";

export class RemoveConcessionFromCompanyUseCase {
  constructor(private readonly concession: ConcessionEntity) {}

  execute(): void {
    this.concession.removeFromCompany();
  }
}
