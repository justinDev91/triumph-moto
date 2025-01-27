import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";

export class GetConcessionDetailsUseCase {
  constructor(private readonly concession: ConcessionEntity) {}

  execute() {
    return this.concession.getDetails();
  }
}